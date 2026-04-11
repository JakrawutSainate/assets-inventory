//! Admin analytics & configuration (parameterized SQL only).

use std::time::Instant;

use anyhow::Context;
use chrono::{DateTime, Utc};
use common::models::{
    ActivityEventRow, AdminDashboardResponse, AdminDashboardStats, BorrowRequestRow, IntegrityHealth,
    MonthlyFlowPoint, PlatformSettings, RegistrySummary, ReportsResponse,
};
use sqlx::PgPool;
use uuid::Uuid;

fn month_label(year: i32, month: i32) -> String {
    let months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    let idx = (month as usize).saturating_sub(1).min(11);
    format!("{} {}", months[idx], year)
}

pub async fn measure_db_latency_ms(pool: &PgPool) -> u64 {
    let start = Instant::now();
    if sqlx::query_scalar::<_, i32>("SELECT 1")
        .fetch_one(pool)
        .await
        .is_err()
    {
        return 0;
    }
    start.elapsed().as_millis() as u64
}

pub async fn load_dashboard(pool: &PgPool) -> anyhow::Result<AdminDashboardResponse> {
    let total_assets: i64 = sqlx::query_scalar("SELECT COUNT(*)::bigint FROM admin_assets")
        .fetch_one(pool)
        .await
        .context("count admin_assets")?;

    let pending_requests: i64 =
        sqlx::query_scalar("SELECT COUNT(*)::bigint FROM borrow_requests WHERE status = 'pending'")
            .fetch_one(pool)
            .await
            .context("count pending borrow_requests")?;

    let active_borrows: i64 = sqlx::query_scalar(
        r#"SELECT COUNT(*)::bigint FROM user_assets
           WHERE status IN ('borrowed', 'in_transit', 'reserved')"#,
    )
    .fetch_one(pool)
    .await
    .context("count active borrows")?;

    let avg_wait: Option<f64> = sqlx::query_scalar(
        r#"SELECT AVG(EXTRACT(EPOCH FROM (now() - created_at)) / 60.0)
           FROM borrow_requests WHERE status = 'pending'"#,
    )
    .fetch_one(pool)
    .await
    .context("avg wait")?;
    let avg_wait_minutes = avg_wait.map(|v| v.round() as i32).unwrap_or(14);

    let last_two: Vec<(i32,)> = sqlx::query_as(
        r#"SELECT checkouts FROM monthly_asset_flow ORDER BY year DESC, month DESC LIMIT 2"#,
    )
    .fetch_all(pool)
    .await
    .unwrap_or_default();
    let assets_trend_pct = if last_two.len() >= 2 {
        let a = last_two[0].0 as f64;
        let b = last_two[1].0 as f64;
        if b > 0.0 {
            ((a - b) / b) * 100.0
        } else {
            0.0
        }
    } else {
        0.0
    };

    let rows = sqlx::query_as::<_, (Uuid, String, String, String, DateTime<Utc>)>(
        r#"SELECT id, actor_name, actor_avatar_url, action_summary, created_at
           FROM activity_events ORDER BY created_at DESC LIMIT 12"#,
    )
    .fetch_all(pool)
    .await
    .context("activity_events")?;

    let recent_activity: Vec<ActivityEventRow> = rows
        .into_iter()
        .map(|(id, actor_name, actor_avatar_url, action_summary, created_at)| ActivityEventRow {
            id: id.to_string(),
            actor_name,
            actor_avatar_url,
            action_summary,
            created_at: created_at.to_rfc3339(),
        })
        .collect();

    let flow_rows = sqlx::query_as::<_, (i32, i32, i32, i32)>(
        r#"SELECT year, month, checkouts, returns_count FROM monthly_asset_flow
           ORDER BY year ASC, month ASC"#,
    )
    .fetch_all(pool)
    .await
    .context("monthly_asset_flow")?;

    let monthly_flow: Vec<MonthlyFlowPoint> = flow_rows
        .into_iter()
        .map(|(y, m, c, r)| MonthlyFlowPoint {
            year: y,
            month: m,
            label: month_label(y, m),
            checkouts: c,
            returns_count: r,
        })
        .collect();

    Ok(AdminDashboardResponse {
        stats: AdminDashboardStats {
            total_assets,
            pending_requests,
            active_borrows,
            avg_wait_minutes,
            assets_trend_pct,
        },
        recent_activity,
        monthly_flow,
    })
}

pub async fn load_registry_summary(pool: &PgPool) -> anyhow::Result<RegistrySummary> {
    let row = sqlx::query_as::<_, (f64, i64, i64, i64, i64)>(
        r#"SELECT
             COALESCE(SUM(value_usd), 0),
             COUNT(*)::bigint,
             COUNT(*) FILTER (WHERE status = 'assigned')::bigint,
             COUNT(*) FILTER (WHERE status = 'available')::bigint,
             COUNT(*) FILTER (WHERE status = 'maintenance')::bigint
           FROM admin_assets"#,
    )
    .fetch_one(pool)
    .await
    .context("registry aggregates")?;

    let pending_requests: i64 =
        sqlx::query_scalar("SELECT COUNT(*)::bigint FROM borrow_requests WHERE status = 'pending'")
            .fetch_one(pool)
            .await
            .unwrap_or(0);

    let total = row.1.max(1);
    let ok = row.3 + row.2;
    let compliance_rate_pct = (ok as f64 / total as f64) * 100.0;

    Ok(RegistrySummary {
        total_inventory_value_usd: row.0,
        total_assets: row.1,
        assigned_count: row.2,
        available_count: row.3,
        maintenance_count: row.4,
        pending_requests,
        compliance_rate_pct,
    })
}

pub async fn list_pending_borrow_requests(pool: &PgPool) -> anyhow::Result<Vec<BorrowRequestRow>> {
    let rows = sqlx::query_as::<_, (Uuid, String, String, String, String, String, String, DateTime<Utc>)>(
        r#"SELECT br.id, br.asset_id, a.name, br.requester_name, br.requester_email,
                  br.status, br.request_type, br.created_at
           FROM borrow_requests br
           JOIN admin_assets a ON a.id = br.asset_id
           WHERE br.status = 'pending'
           ORDER BY br.created_at ASC"#,
    )
    .fetch_all(pool)
    .await
    .context("list borrow_requests")?;

    Ok(rows
        .into_iter()
        .map(
            |(id, asset_id, asset_name, requester_name, requester_email, status, request_type, created_at)| {
                BorrowRequestRow {
                    id: id.to_string(),
                    asset_id,
                    asset_name,
                    requester_name,
                    requester_email,
                    status,
                    request_type,
                    created_at: created_at.to_rfc3339(),
                }
            },
        )
        .collect())
}

pub async fn set_borrow_request_status(
    pool: &PgPool,
    id: &Uuid,
    status: &str,
) -> anyhow::Result<bool> {
    let res = sqlx::query(
        r#"UPDATE borrow_requests SET status = $1, updated_at = now()
           WHERE id = $2 AND status = 'pending'"#,
    )
    .bind(status)
    .bind(id)
    .execute(pool)
    .await
    .context("update borrow_request")?;
    Ok(res.rows_affected() > 0)
}

pub async fn load_reports(pool: &PgPool) -> anyhow::Result<ReportsResponse> {
    let flow_rows = sqlx::query_as::<_, (i32, i32, i32, i32)>(
        r#"SELECT year, month, checkouts, returns_count FROM monthly_asset_flow
           ORDER BY year ASC, month ASC"#,
    )
    .fetch_all(pool)
    .await?;

    let monthly: Vec<MonthlyFlowPoint> = flow_rows
        .into_iter()
        .map(|(y, m, c, r)| MonthlyFlowPoint {
            year: y,
            month: m,
            label: month_label(y, m),
            checkouts: c,
            returns_count: r,
        })
        .collect();

    let critical: i64 = sqlx::query_scalar("SELECT COUNT(*)::bigint FROM admin_assets WHERE status = 'maintenance'")
        .fetch_one(pool)
        .await
        .unwrap_or(0);
    let wear: i64 = sqlx::query_scalar(
        "SELECT COUNT(*)::bigint FROM admin_assets WHERE status IN ('assigned', 'available')",
    )
    .fetch_one(pool)
    .await
    .unwrap_or(0);

    Ok(ReportsResponse {
        monthly,
        integrity: IntegrityHealth {
            critical_malfunction_count: critical,
            operational_wear_count: wear,
        },
    })
}

pub async fn load_platform_settings(pool: &PgPool) -> anyhow::Result<PlatformSettings> {
    let row = sqlx::query_as::<_, (String, bool, String, Option<DateTime<Utc>>)>(
        r#"SELECT terms_text, maintenance_mode, core_version, last_backup_at
           FROM platform_settings WHERE id = 1"#,
    )
    .fetch_one(pool)
    .await
    .context("platform_settings")?;

    let latency_ms = measure_db_latency_ms(pool).await;

    Ok(PlatformSettings {
        terms_text: row.0,
        maintenance_mode: row.1,
        core_version: row.2,
        last_backup_at: row.3.map(|t| t.to_rfc3339()),
        database_latency_ms: latency_ms,
    })
}

pub async fn patch_platform_settings(
    pool: &PgPool,
    terms_text: Option<&str>,
    maintenance_mode: Option<bool>,
) -> anyhow::Result<()> {
    sqlx::query(
        r#"UPDATE platform_settings SET
             terms_text = COALESCE($1, terms_text),
             maintenance_mode = COALESCE($2, maintenance_mode)
           WHERE id = 1"#,
    )
    .bind(terms_text)
    .bind(maintenance_mode)
    .execute(pool)
    .await
    .context("patch platform_settings")?;
    Ok(())
}
