use axum::{
    extract::{Extension, State},
    http::StatusCode,
    Json,
};
use common::models::{AuthResponse, LoginRequest, PublicUser, RegisterRequest, UserRole};
use common::validation;
use uuid::Uuid;

use crate::auth::{encode_token, AuthUser};
use crate::state::AppState;
use db::users;

#[utoipa::path(
    post,
    path = "/api/v1/auth/register",
    request_body = RegisterRequest,
    responses(
        (status = 201, description = "Registered", body = AuthResponse),
        (status = 400, description = "Invalid input"),
        (status = 409, description = "Email already registered"),
        (status = 500, description = "Server error"),
    ),
    tag = "auth"
)]
pub async fn register(
    State(state): State<AppState>,
    Json(body): Json<RegisterRequest>,
) -> Result<(axum::http::StatusCode, Json<AuthResponse>), StatusCode> {
    validation::validate_email(&body.email).map_err(|_| StatusCode::BAD_REQUEST)?;
    validation::validate_password(&body.password).map_err(|_| StatusCode::BAD_REQUEST)?;

    if users::find_user_by_email(&state.pool, &body.email)
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "register lookup");
            StatusCode::INTERNAL_SERVER_ERROR
        })?
        .is_some()
    {
        return Err(StatusCode::CONFLICT);
    }

    let name = body.name.as_deref();
    let id = users::create_user(
        &state.pool,
        &body.email,
        &body.password,
        UserRole::User,
        name,
    )
    .await
    .map_err(|e| {
        tracing::error!(error = %e, "register insert");
        StatusCode::INTERNAL_SERVER_ERROR
    })?;

    let user = users::get_public_user_by_id(&state.pool, id)
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "register load user");
            StatusCode::INTERNAL_SERVER_ERROR
        })?
        .ok_or(StatusCode::INTERNAL_SERVER_ERROR)?;

    let token = encode_token(&state, id, &user.email, user.role).map_err(|e| {
        tracing::error!(error = %e, "jwt encode");
        StatusCode::INTERNAL_SERVER_ERROR
    })?;

    Ok((
        axum::http::StatusCode::CREATED,
        Json(AuthResponse { token, user }),
    ))
}

#[utoipa::path(
    post,
    path = "/api/v1/auth/login",
    request_body = LoginRequest,
    responses(
        (status = 200, description = "OK", body = AuthResponse),
        (status = 400, description = "Invalid input"),
        (status = 401, description = "Bad credentials"),
        (status = 500, description = "Server error"),
    ),
    tag = "auth"
)]
pub async fn login(
    State(state): State<AppState>,
    Json(body): Json<LoginRequest>,
) -> Result<Json<AuthResponse>, StatusCode> {
    validation::validate_email(&body.email).map_err(|_| StatusCode::BAD_REQUEST)?;
    validation::validate_password(&body.password).map_err(|_| StatusCode::BAD_REQUEST)?;

    let user = users::verify_credentials(&state.pool, &body.email, &body.password)
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "login verify");
            StatusCode::INTERNAL_SERVER_ERROR
        })?
        .ok_or(StatusCode::UNAUTHORIZED)?;

    let id = Uuid::parse_str(&user.id).map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    let token = encode_token(&state, id, &user.email, user.role).map_err(|e| {
        tracing::error!(error = %e, "jwt encode");
        StatusCode::INTERNAL_SERVER_ERROR
    })?;

    Ok(Json(AuthResponse { token, user }))
}

#[utoipa::path(
    get,
    path = "/api/v1/auth/me",
    responses(
        (status = 200, description = "Current user", body = PublicUser),
        (status = 401, description = "Unauthorized"),
        (status = 500, description = "Server error"),
    ),
    security(("bearer_auth" = [])),
    tag = "auth"
)]
pub async fn me(
    State(state): State<AppState>,
    Extension(auth): Extension<AuthUser>,
) -> Result<Json<PublicUser>, StatusCode> {
    let user = users::get_public_user_by_id(&state.pool, auth.id)
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "me");
            StatusCode::INTERNAL_SERVER_ERROR
        })?
        .ok_or(StatusCode::UNAUTHORIZED)?;
    Ok(Json(user))
}
