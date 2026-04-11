//! PostgreSQL access: parameterized queries only (OWASP: injection-safe patterns).

pub mod users;

use std::sync::Arc;
use std::time::Duration;

use anyhow::Context;
use async_trait::async_trait;
use common::models::{Asset, AssetStatus, UserAsset, UserAssetStatus};
use common::repository::AssetRepository;
use sqlx::postgres::PgPoolOptions;
use sqlx::postgres::PgRow;
use sqlx::Row;
pub use sqlx::PgPool;

fn env_u64(name: &str, default: u64) -> u64 {
    std::env::var(name)
        .ok()
        .and_then(|s| s.parse().ok())
        .unwrap_or(default)
}

/// Build pool (TLS from `DATABASE_URL`, e.g. Neon `sslmode=require`).
///
/// Neon / serverless Postgres often closes idle TCP sessions; sqlx may log
/// `ping on idle connection` when it drops a stale socket. Tuning
/// `DB_IDLE_TIMEOUT_SECS` / `DB_MAX_LIFETIME_SECS` recycles connections before
/// the remote side disappears (defaults are conservative for Neon).
pub async fn connect_pool(database_url: &str) -> anyhow::Result<PgPool> {
    let max = env_u64("DB_MAX_CONNECTIONS", 5) as u32;
    let idle_secs = env_u64("DB_IDLE_TIMEOUT_SECS", 300);
    let life_secs = env_u64("DB_MAX_LIFETIME_SECS", 1800);
    let acquire_secs = env_u64("DB_ACQUIRE_TIMEOUT_SECS", 30);

    PgPoolOptions::new()
        .max_connections(max)
        .acquire_timeout(Duration::from_secs(acquire_secs))
        .idle_timeout(Some(Duration::from_secs(idle_secs)))
        .max_lifetime(Some(Duration::from_secs(life_secs)))
        .test_before_acquire(true)
        .connect(database_url)
        .await
        .context("database connection failed (check DATABASE_URL and network; secrets are not logged)")
}

pub async fn run_migrations(pool: &PgPool) -> anyhow::Result<()> {
    sqlx::migrate!("../../migrations")
        .run(pool)
        .await
        .context("database migrations failed")?;
    Ok(())
}

/// Shared DB handles for HTTP + gRPC (same pool).
pub struct DbHandles {
    pub assets: Arc<dyn AssetRepository>,
    pub pool: PgPool,
}

/// Load `.env` (if present), connect, migrate, optional admin seed. **Never** logs secrets.
pub async fn init_from_env() -> anyhow::Result<DbHandles> {
    let _ = dotenvy::dotenv();
    let url = std::env::var("DATABASE_URL").context("DATABASE_URL is not set — copy .env.example to .env")?;
    let pool = connect_pool(&url).await?;
    run_migrations(&pool).await?;
    users::seed_admin_from_env(&pool).await?;
    let assets = Arc::new(PgAssets::new(pool.clone()));
    Ok(DbHandles { assets, pool })
}

pub struct PgAssets {
    pool: PgPool,
}

impl PgAssets {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }
}

#[async_trait]
impl AssetRepository for PgAssets {
    async fn list_admin_assets(&self) -> anyhow::Result<Vec<Asset>> {
        let rows = sqlx::query(
            r#"SELECT id, name, serial_number, image_url, status, category, custodian_name, value_usd
               FROM admin_assets ORDER BY id"#,
        )
        .fetch_all(&self.pool)
        .await
        .context("list admin_assets")?;

        rows.iter().map(admin_from_row).collect::<Result<Vec<_>, _>>()
    }

    async fn list_user_dashboard_assets(&self) -> anyhow::Result<Vec<UserAsset>> {
        let rows = sqlx::query(
            r#"SELECT id, name, image_url, status, category, location_label, daily_rate_usd, action_label
               FROM user_assets ORDER BY id"#,
        )
        .fetch_all(&self.pool)
        .await
        .context("list user_assets")?;

        rows.iter().map(user_from_row).collect::<Result<Vec<_>, _>>()
    }

    async fn get_user_asset(&self, id: &str) -> anyhow::Result<Option<UserAsset>> {
        let row = sqlx::query(
            r#"SELECT id, name, image_url, status, category, location_label, daily_rate_usd, action_label
               FROM user_assets WHERE id = $1"#,
        )
        .bind(id)
        .fetch_optional(&self.pool)
        .await
        .context("get user_assets by id")?;

        row.map(|r| user_from_row(&r)).transpose()
    }

    async fn list_similar_user_assets(&self, limit: usize) -> anyhow::Result<Vec<UserAsset>> {
        let lim = (limit as i64).clamp(1, 100);
        let rows = sqlx::query(
            r#"SELECT id, name, image_url, status, category, location_label, daily_rate_usd, action_label
               FROM user_assets ORDER BY id LIMIT $1"#,
        )
        .bind(lim)
        .fetch_all(&self.pool)
        .await
        .context("list similar user_assets")?;

        rows.iter().map(user_from_row).collect::<Result<Vec<_>, _>>()
    }
}

fn admin_from_row(row: &PgRow) -> anyhow::Result<Asset> {
    let status_s: String = row.try_get("status")?;
    let status = parse_admin_status(&status_s).with_context(|| format!("bad admin status: {status_s}"))?;
    Ok(Asset {
        id: row.try_get("id")?,
        name: row.try_get("name")?,
        serial_number: row.try_get("serial_number")?,
        image_url: row.try_get("image_url")?,
        status,
        category: row.try_get("category")?,
        custodian_name: row.try_get("custodian_name")?,
        value_usd: row.try_get("value_usd")?,
    })
}

fn user_from_row(row: &PgRow) -> anyhow::Result<UserAsset> {
    let status_s: String = row.try_get("status")?;
    let status = parse_user_status(&status_s).with_context(|| format!("bad user status: {status_s}"))?;
    Ok(UserAsset {
        id: row.try_get("id")?,
        name: row.try_get("name")?,
        image_url: row.try_get("image_url")?,
        status,
        category: row.try_get("category")?,
        location_label: row.try_get("location_label")?,
        daily_rate_usd: row.try_get("daily_rate_usd")?,
        action_label: row.try_get("action_label")?,
    })
}

fn parse_admin_status(s: &str) -> anyhow::Result<AssetStatus> {
    match s {
        "assigned" => Ok(AssetStatus::Assigned),
        "available" => Ok(AssetStatus::Available),
        "maintenance" => Ok(AssetStatus::Maintenance),
        _ => anyhow::bail!("unknown"),
    }
}

fn parse_user_status(s: &str) -> anyhow::Result<UserAssetStatus> {
    match s {
        "available" => Ok(UserAssetStatus::Available),
        "borrowed" => Ok(UserAssetStatus::Borrowed),
        "reserved" => Ok(UserAssetStatus::Reserved),
        "in_transit" => Ok(UserAssetStatus::InTransit),
        _ => anyhow::bail!("unknown"),
    }
}
