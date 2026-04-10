use axum::{
    extract::{Path, State},
    http::StatusCode,
    Json,
};

use crate::models::{Asset, UserAsset};
use crate::state::AppState;

/// `GET /api/v1/admin/assets` — list assets for admin views.
#[utoipa::path(
    get,
    path = "/api/v1/admin/assets",
    responses(
        (status = 200, description = "All admin assets", body = [Asset])
    ),
    tag = "admin"
)]
pub async fn list_admin_assets(State(state): State<AppState>) -> Json<Vec<Asset>> {
    Json(state.assets.list_admin_assets())
}

/// `GET /api/v1/user/dashboard-assets` — cards for the user dashboard.
#[utoipa::path(
    get,
    path = "/api/v1/user/dashboard-assets",
    responses(
        (status = 200, description = "Dashboard asset cards", body = [UserAsset])
    ),
    tag = "user"
)]
pub async fn list_dashboard_assets(State(state): State<AppState>) -> Json<Vec<UserAsset>> {
    Json(state.assets.list_user_dashboard_assets())
}

/// `GET /api/v1/user/assets/{id}` — single user-facing asset.
#[utoipa::path(
    get,
    path = "/api/v1/user/assets/{id}",
    params(
        ("id" = String, Path, description = "Asset identifier")
    ),
    responses(
        (status = 200, description = "Found", body = UserAsset),
        (status = 404, description = "Not found")
    ),
    tag = "user"
)]
pub async fn get_user_asset(
    State(state): State<AppState>,
    Path(id): Path<String>,
) -> Result<Json<UserAsset>, StatusCode> {
    state
        .assets
        .get_user_asset(&id)
        .map(Json)
        .ok_or(StatusCode::NOT_FOUND)
}

/// `GET /api/v1/user/similar-assets` — placeholder recommendations.
#[utoipa::path(
    get,
    path = "/api/v1/user/similar-assets",
    responses(
        (status = 200, description = "Similar assets", body = [UserAsset])
    ),
    tag = "user"
)]
pub async fn list_similar_assets(State(state): State<AppState>) -> Json<Vec<UserAsset>> {
    Json(state.assets.list_similar_user_assets(3))
}
