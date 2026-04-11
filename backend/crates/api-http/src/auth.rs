//! JWT bearer auth: middleware populates [`AuthUser`] for protected handlers.

use axum::{
    extract::{Request, State},
    http::StatusCode,
    middleware::Next,
    response::Response,
};
use chrono::{Duration, Utc};
use common::models::UserRole;
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::state::AppState;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct JwtClaims {
    pub sub: String,
    pub email: String,
    pub role: UserRole,
    pub exp: i64,
}

#[derive(Debug, Clone)]
pub struct AuthUser {
    pub id: Uuid,
    pub email: String,
    pub role: UserRole,
}

pub fn encode_token(state: &AppState, user_id: Uuid, email: &str, role: UserRole) -> Result<String, jsonwebtoken::errors::Error> {
    let exp = Utc::now() + Duration::hours(24);
    let claims = JwtClaims {
        sub: user_id.to_string(),
        email: email.to_string(),
        role,
        exp: exp.timestamp(),
    };
    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(state.jwt_secret.as_bytes()),
    )
}

pub fn decode_token(state: &AppState, token: &str) -> Result<AuthUser, ()> {
    let data = decode::<JwtClaims>(
        token,
        &DecodingKey::from_secret(state.jwt_secret.as_bytes()),
        &Validation::default(),
    )
    .map_err(|_| ())?;
    let id = Uuid::parse_str(&data.claims.sub).map_err(|_| ())?;
    Ok(AuthUser {
        id,
        email: data.claims.email,
        role: data.claims.role,
    })
}

pub fn extract_bearer(headers: &axum::http::HeaderMap) -> Option<&str> {
    let auth = headers.get(axum::http::header::AUTHORIZATION)?.to_str().ok()?;
    auth.strip_prefix("Bearer ").map(str::trim)
}

pub async fn require_auth(
    State(state): State<AppState>,
    mut req: Request,
    next: Next,
) -> Result<Response, StatusCode> {
    let token = extract_bearer(req.headers()).ok_or(StatusCode::UNAUTHORIZED)?;
    let user = decode_token(&state, token).map_err(|()| StatusCode::UNAUTHORIZED)?;
    req.extensions_mut().insert(user);
    Ok(next.run(req).await)
}
