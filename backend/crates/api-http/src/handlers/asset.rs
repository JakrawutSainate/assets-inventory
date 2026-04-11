use axum::{
    extract::{Extension, Path, State},
    http::StatusCode,
    Json,
};

use common::models::{Asset, UserAsset, UserRole};
use common::validation;
use crate::auth::AuthUser;
use crate::state::AppState;

#[utoipa::path(
    get,
    path = "/api/v1/admin/assets",
    responses((status = 200, description = "Admin assets", body = [Asset]),
        (status = 401, description = "Unauthorized"),
        (status = 403, description = "Forbidden"),
        (status = 500, description = "Server error")),
    security(("bearer_auth" = [])),
    tag = "admin"
)]
pub async fn list_admin_assets(
    State(state): State<AppState>,
    Extension(auth): Extension<AuthUser>,
) -> Result<Json<Vec<Asset>>, StatusCode> {
    if auth.role != UserRole::Admin {
        return Err(StatusCode::FORBIDDEN);
    }
    state
        .assets
        .list_admin_assets()
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "list_admin_assets");
            StatusCode::INTERNAL_SERVER_ERROR
        })
        .map(Json)
}

#[utoipa::path(
    get,
    path = "/api/v1/user/dashboard-assets",
    responses((status = 200, description = "User dashboard cards", body = [UserAsset]),
        (status = 401, description = "Unauthorized"),
        (status = 500, description = "Server error")),
    security(("bearer_auth" = [])),
    tag = "user"
)]
pub async fn list_dashboard_assets(
    State(state): State<AppState>,
    Extension(_auth): Extension<AuthUser>,
) -> Result<Json<Vec<UserAsset>>, StatusCode> {
    state
        .assets
        .list_user_dashboard_assets()
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "list_dashboard_assets");
            StatusCode::INTERNAL_SERVER_ERROR
        })
        .map(Json)
}

#[utoipa::path(
    get,
    path = "/api/v1/user/assets/{id}",
    params(("id" = String, Path, description = "Asset id")),
    responses(
        (status = 200, description = "Found", body = UserAsset),
        (status = 400, description = "Bad id"),
        (status = 401, description = "Unauthorized"),
        (status = 404, description = "Not found"),
        (status = 500, description = "Server error")
    ),
    security(("bearer_auth" = [])),
    tag = "user"
)]
pub async fn get_user_asset(
    State(state): State<AppState>,
    Extension(_auth): Extension<AuthUser>,
    Path(id): Path<String>,
) -> Result<Json<UserAsset>, StatusCode> {
    validation::validate_asset_id(&id).map_err(|_| StatusCode::BAD_REQUEST)?;
    let asset = state
        .assets
        .get_user_asset(&id)
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "get_user_asset");
            StatusCode::INTERNAL_SERVER_ERROR
        })?;
    asset.map(Json).ok_or(StatusCode::NOT_FOUND)
}

#[utoipa::path(
    get,
    path = "/api/v1/user/similar-assets",
    responses((status = 200, description = "Similar assets", body = [UserAsset]),
        (status = 401, description = "Unauthorized"),
        (status = 500, description = "Server error")),
    security(("bearer_auth" = [])),
    tag = "user"
)]
pub async fn list_similar_assets(
    State(state): State<AppState>,
    Extension(_auth): Extension<AuthUser>,
) -> Result<Json<Vec<UserAsset>>, StatusCode> {
    state
        .assets
        .list_similar_user_assets(3)
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "list_similar");
            StatusCode::INTERNAL_SERVER_ERROR
        })
        .map(Json)
}
