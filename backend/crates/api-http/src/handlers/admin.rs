use axum::{
    extract::{Extension, Path, State},
    http::StatusCode,
    Json,
};
use common::models::{
    AdminDashboardResponse, BorrowRequestRow, PlatformSettings, PlatformSettingsPatch, RegistrySummary,
    ReportsResponse, UserRole,
};
use uuid::Uuid;

use crate::auth::AuthUser;
use crate::state::AppState;
use db::admin;
use serde::Serialize;

fn ensure_admin(auth: &AuthUser) -> Result<(), StatusCode> {
    if auth.role != UserRole::Admin {
        return Err(StatusCode::FORBIDDEN);
    }
    Ok(())
}

#[derive(Serialize)]
pub struct OkMessage {
    pub ok: bool,
}

#[utoipa::path(
    get,
    path = "/api/v1/admin/dashboard",
    responses((status = 200, body = AdminDashboardResponse), (status = 403)),
    security(("bearer_auth" = [])),
    tag = "admin"
)]
pub async fn get_dashboard(
    State(state): State<AppState>,
    Extension(auth): Extension<AuthUser>,
) -> Result<Json<AdminDashboardResponse>, StatusCode> {
    ensure_admin(&auth)?;
    let data = admin::load_dashboard(&state.pool)
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "admin dashboard");
            StatusCode::INTERNAL_SERVER_ERROR
        })?;
    Ok(Json(data))
}

#[utoipa::path(
    get,
    path = "/api/v1/admin/registry/summary",
    responses((status = 200, body = RegistrySummary), (status = 403)),
    security(("bearer_auth" = [])),
    tag = "admin"
)]
pub async fn get_registry_summary(
    State(state): State<AppState>,
    Extension(auth): Extension<AuthUser>,
) -> Result<Json<RegistrySummary>, StatusCode> {
    ensure_admin(&auth)?;
    let data = admin::load_registry_summary(&state.pool)
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "registry summary");
            StatusCode::INTERNAL_SERVER_ERROR
        })?;
    Ok(Json(data))
}

#[utoipa::path(
    get,
    path = "/api/v1/admin/borrow-requests",
    responses((status = 200), (status = 403)),
    security(("bearer_auth" = [])),
    tag = "admin"
)]
pub async fn list_borrow_requests(
    State(state): State<AppState>,
    Extension(auth): Extension<AuthUser>,
) -> Result<Json<Vec<BorrowRequestRow>>, StatusCode> {
    ensure_admin(&auth)?;
    let rows = admin::list_pending_borrow_requests(&state.pool)
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "borrow requests");
            StatusCode::INTERNAL_SERVER_ERROR
        })?;
    Ok(Json(rows))
}

#[utoipa::path(
    post,
    path = "/api/v1/admin/borrow-requests/{id}/approve",
    responses((status = 200), (status = 404), (status = 403)),
    security(("bearer_auth" = [])),
    tag = "admin"
)]
pub async fn approve_borrow_request(
    State(state): State<AppState>,
    Extension(auth): Extension<AuthUser>,
    Path(id): Path<Uuid>,
) -> Result<Json<OkMessage>, StatusCode> {
    ensure_admin(&auth)?;
    let ok = admin::set_borrow_request_status(&state.pool, &id, "approved")
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "approve borrow");
            StatusCode::INTERNAL_SERVER_ERROR
        })?;
    if !ok {
        return Err(StatusCode::NOT_FOUND);
    }
    Ok(Json(OkMessage { ok: true }))
}

#[utoipa::path(
    post,
    path = "/api/v1/admin/borrow-requests/{id}/decline",
    responses((status = 200), (status = 404), (status = 403)),
    security(("bearer_auth" = [])),
    tag = "admin"
)]
pub async fn decline_borrow_request(
    State(state): State<AppState>,
    Extension(auth): Extension<AuthUser>,
    Path(id): Path<Uuid>,
) -> Result<Json<OkMessage>, StatusCode> {
    ensure_admin(&auth)?;
    let ok = admin::set_borrow_request_status(&state.pool, &id, "declined")
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "decline borrow");
            StatusCode::INTERNAL_SERVER_ERROR
        })?;
    if !ok {
        return Err(StatusCode::NOT_FOUND);
    }
    Ok(Json(OkMessage { ok: true }))
}

#[utoipa::path(
    get,
    path = "/api/v1/admin/reports",
    responses((status = 200, body = ReportsResponse), (status = 403)),
    security(("bearer_auth" = [])),
    tag = "admin"
)]
pub async fn get_reports(
    State(state): State<AppState>,
    Extension(auth): Extension<AuthUser>,
) -> Result<Json<ReportsResponse>, StatusCode> {
    ensure_admin(&auth)?;
    let data = admin::load_reports(&state.pool)
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "reports");
            StatusCode::INTERNAL_SERVER_ERROR
        })?;
    Ok(Json(data))
}

#[utoipa::path(
    get,
    path = "/api/v1/admin/settings",
    responses((status = 200, body = PlatformSettings), (status = 403)),
    security(("bearer_auth" = [])),
    tag = "admin"
)]
pub async fn get_settings(
    State(state): State<AppState>,
    Extension(auth): Extension<AuthUser>,
) -> Result<Json<PlatformSettings>, StatusCode> {
    ensure_admin(&auth)?;
    let data = admin::load_platform_settings(&state.pool)
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "settings get");
            StatusCode::INTERNAL_SERVER_ERROR
        })?;
    Ok(Json(data))
}

#[utoipa::path(
    patch,
    path = "/api/v1/admin/settings",
    request_body = PlatformSettingsPatch,
    responses((status = 200, body = PlatformSettings), (status = 403)),
    security(("bearer_auth" = [])),
    tag = "admin"
)]
pub async fn patch_settings(
    State(state): State<AppState>,
    Extension(auth): Extension<AuthUser>,
    Json(body): Json<PlatformSettingsPatch>,
) -> Result<Json<PlatformSettings>, StatusCode> {
    ensure_admin(&auth)?;
    admin::patch_platform_settings(
        &state.pool,
        body.terms_text.as_deref(),
        body.maintenance_mode,
    )
    .await
    .map_err(|e| {
        tracing::error!(error = %e, "settings patch");
        StatusCode::INTERNAL_SERVER_ERROR
    })?;
    let data = admin::load_platform_settings(&state.pool)
        .await
        .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;
    Ok(Json(data))
}
