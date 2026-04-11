use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};

use common::models::{Asset, UserAsset};
use common::validation;
use crate::state::AppState;

#[utoipa::path(
    get,
    path = "/api/v1/admin/assets",
    responses((status = 200, description = "Admin assets", body = [Asset])),
    tag = "admin"
)]
pub async fn list_admin_assets(
    State(state): State<AppState>,
) -> Result<Json<Vec<Asset>>, StatusCode> {
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
    responses((status = 200, description = "User dashboard cards", body = [UserAsset])),
    tag = "user"
)]
pub async fn list_dashboard_assets(
    State(state): State<AppState>,
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
        (status = 404, description = "Not found")
    ),
    tag = "user"
)]
pub async fn get_user_asset(
    State(state): State<AppState>,
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
    responses((status = 200, description = "Similar assets", body = [UserAsset])),
    tag = "user"
)]
pub async fn list_similar_assets(
    State(state): State<AppState>,
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
