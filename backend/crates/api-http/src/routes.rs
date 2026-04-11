use axum::http::HeaderValue;
use axum::routing::get;
use axum::Router;
use tower_http::cors::{AllowOrigin, Any, CorsLayer};
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

use crate::handlers::asset;
use crate::openapi::ApiDoc;
use crate::state::AppState;

fn cors_layer() -> CorsLayer {
    match std::env::var("CORS_ORIGIN") {
        Ok(origin) => match HeaderValue::from_str(&origin) {
            Ok(hv) => CorsLayer::new()
                .allow_origin(AllowOrigin::exact(hv))
                .allow_methods(Any)
                .allow_headers(Any),
            Err(_) => CorsLayer::new()
                .allow_origin(Any)
                .allow_methods(Any)
                .allow_headers(Any),
        },
        Err(_) => CorsLayer::new()
            .allow_origin(Any)
            .allow_methods(Any)
            .allow_headers(Any),
    }
}

pub fn create_router(state: AppState) -> Router {
    let openapi = ApiDoc::openapi();

    Router::new()
        .route("/health", get(|| async { "ok" }))
        .route("/api/v1/admin/assets", get(asset::list_admin_assets))
        .route(
            "/api/v1/user/dashboard-assets",
            get(asset::list_dashboard_assets),
        )
        .route("/api/v1/user/assets/{id}", get(asset::get_user_asset))
        .route(
            "/api/v1/user/similar-assets",
            get(asset::list_similar_assets),
        )
        .merge(SwaggerUi::new("/swagger-ui").url("/api-docs/openapi.json", openapi))
        .layer(cors_layer())
        .with_state(state)
}
