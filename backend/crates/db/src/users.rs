//! User accounts: parameterized queries, Argon2 password hashing.

use anyhow::Context;
use argon2::password_hash::{PasswordHash, PasswordHasher, PasswordVerifier, SaltString};
use argon2::Argon2;
use common::models::{PublicUser, UserRole};
use sqlx::PgPool;
use uuid::Uuid;

fn hash_password(plain: &str) -> anyhow::Result<String> {
    let salt = SaltString::generate(&mut rand::thread_rng());
    let argon2 = Argon2::default();
    Ok(argon2
        .hash_password(plain.as_bytes(), &salt)
        .map_err(|e| anyhow::anyhow!("hash_password: {e}"))?
        .to_string())
}

fn verify_password(plain: &str, hash: &str) -> anyhow::Result<bool> {
    let parsed = PasswordHash::new(hash).map_err(|e| anyhow::anyhow!("invalid password hash: {e}"))?;
    Ok(Argon2::default()
        .verify_password(plain.as_bytes(), &parsed)
        .is_ok())
}

fn parse_role(s: &str) -> anyhow::Result<UserRole> {
    match s {
        "admin" => Ok(UserRole::Admin),
        "user" => Ok(UserRole::User),
        _ => anyhow::bail!("unknown role"),
    }
}

pub async fn create_user(
    pool: &PgPool,
    email: &str,
    password: &str,
    role: UserRole,
    display_name: Option<&str>,
) -> anyhow::Result<Uuid> {
    let email_lc = email.trim().to_lowercase();
    let hash = hash_password(password)?;
    let role_s = match role {
        UserRole::Admin => "admin",
        UserRole::User => "user",
    };
    let name = display_name.unwrap_or("").trim();
    let avatar = "";
    let row: (Uuid,) = sqlx::query_as(
        r#"INSERT INTO users (email, password_hash, role, display_name, avatar_url)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id"#,
    )
    .bind(&email_lc)
    .bind(&hash)
    .bind(role_s)
    .bind(name)
    .bind(avatar)
    .fetch_one(pool)
    .await
    .context("insert user")?;
    Ok(row.0)
}

pub async fn find_user_by_email(
    pool: &PgPool,
    email: &str,
) -> anyhow::Result<Option<(Uuid, String, String, UserRole, String, String)>> {
    let email_lc = email.trim().to_lowercase();
    let row = sqlx::query_as::<_, (Uuid, String, String, String, String, String)>(
        r#"SELECT id, email, password_hash, role, display_name, avatar_url FROM users WHERE lower(email) = lower($1)"#,
    )
    .bind(&email_lc)
    .fetch_optional(pool)
    .await
    .context("find user by email")?;

    let Some((id, email_db, ph, role_s, dn, av)) = row else {
        return Ok(None);
    };
    let role = parse_role(&role_s).context("invalid role in database")?;
    Ok(Some((id, email_db, ph, role, dn, av)))
}

pub async fn get_public_user_by_id(pool: &PgPool, id: Uuid) -> anyhow::Result<Option<PublicUser>> {
    let row = sqlx::query_as::<_, (String, String, String, String, String)>(
        r#"SELECT id::text, email, role, display_name, avatar_url FROM users WHERE id = $1"#,
    )
    .bind(id)
    .fetch_optional(pool)
    .await
    .context("get user by id")?;

    Ok(row.map(|(id_s, email, role_s, dn, av)| PublicUser {
        id: id_s,
        email,
        role: parse_role(&role_s).expect("role"),
        display_name: dn,
        avatar_url: av,
    }))
}

pub async fn verify_credentials(
    pool: &PgPool,
    email: &str,
    password: &str,
) -> anyhow::Result<Option<PublicUser>> {
    let Some((id, email_db, hash, role, dn, av)) = find_user_by_email(pool, email).await? else {
        return Ok(None);
    };
    if !verify_password(password, &hash)? {
        return Ok(None);
    }
    Ok(Some(PublicUser {
        id: id.to_string(),
        email: email_db,
        role,
        display_name: dn,
        avatar_url: av,
    }))
}

/// When `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD` are set and no admin exists yet, create one.
pub async fn seed_admin_from_env(pool: &PgPool) -> anyhow::Result<()> {
    let email = match std::env::var("SEED_ADMIN_EMAIL") {
        Ok(e) if !e.trim().is_empty() => e.trim().to_lowercase(),
        _ => return Ok(()),
    };
    let password = std::env::var("SEED_ADMIN_PASSWORD").with_context(|| {
        "SEED_ADMIN_PASSWORD is required when SEED_ADMIN_EMAIL is set (not logged)"
    })?;
    let count: i64 =
        sqlx::query_scalar(r#"SELECT COUNT(*)::bigint FROM users WHERE role = 'admin'"#)
            .fetch_one(pool)
            .await
            .context("count admins")?;
    if count > 0 {
        return Ok(());
    }
    create_user(pool, &email, &password, UserRole::Admin, Some("Administrator"))
        .await
        .context("seed admin user")?;
    tracing::info!(email = %email, "seeded admin user from SEED_ADMIN_EMAIL");
    Ok(())
}
