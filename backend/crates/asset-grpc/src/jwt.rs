use chrono::{Duration, Utc};
use common::models::UserRole;
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use uuid::Uuid;

use crate::state::GrpcState;

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
    #[allow(dead_code)]
    pub email: String,
    pub role: UserRole,
}

pub fn encode_token(
    state: &GrpcState,
    user_id: Uuid,
    email: &str,
    role: UserRole,
) -> Result<String, jsonwebtoken::errors::Error> {
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

pub fn decode_token(state: &GrpcState, token: &str) -> Result<AuthUser, ()> {
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
