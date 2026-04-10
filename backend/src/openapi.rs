use utoipa::OpenApi;

use crate::handlers::asset;
use crate::models::{Asset, UserAsset};

#[derive(OpenApi)]
#[openapi(
    info(
        title = "Assets Inventory API",
        description = "Rust backend for the assets-inventory frontend",
        version = "0.1.0"
    ),
    paths(
        asset::list_admin_assets,
        asset::list_dashboard_assets,
        asset::get_user_asset,
        asset::list_similar_assets,
    ),
    components(schemas(Asset, UserAsset)),
    tags(
        (name = "admin", description = "Admin asset registry"),
        (name = "user", description = "User dashboard and discovery")
    )
)]
pub struct ApiDoc;
