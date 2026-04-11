use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize, ToSchema)]
#[serde(rename_all = "lowercase")]
pub enum UserRole {
    Admin,
    User,
}

/// Safe user payload for API / JWT-backed sessions (no secrets).
#[derive(Debug, Clone, Serialize, Deserialize, ToSchema)]
pub struct PublicUser {
    pub id: String,
    pub email: String,
    pub role: UserRole,
    #[serde(rename = "name")]
    pub display_name: String,
    pub avatar_url: String,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct RegisterRequest {
    pub email: String,
    pub password: String,
    #[serde(default)]
    pub name: Option<String>,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct AuthResponse {
    pub token: String,
    pub user: PublicUser,
}
