use utoipa::OpenApi;

use crate::handlers::asset;
use common::models::{Asset, UserAsset};

#[derive(OpenApi)]
#[openapi(
    info(
        title = "Assets Inventory API",
        description = "REST facade + OpenAPI; same domain logic as gRPC (`asset-grpc`).",
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
        (name = "admin", description = "Admin registry"),
        (name = "user", description = "User dashboard")
    )
)]
pub struct ApiDoc;
