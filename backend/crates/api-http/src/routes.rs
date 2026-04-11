use axum::http::HeaderValue;
use axum::middleware;
use axum::routing::{get, post};
use axum::Router;
use tower_http::cors::{AllowOrigin, Any, CorsLayer};
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

use crate::auth;
use crate::handlers::{asset, auth as auth_handlers};
use crate::openapi::ApiDoc;
use crate::state::AppState;

/// CORS is driven only by env — no hardcoded browser origins in code.
/// - `CORS_ALLOW_ANY=1`: permissive (dev only).
/// - Else `CORS_ORIGIN` is required (e.g. where Next.js runs — often port 3000, not the API port).
fn cors_layer() -> CorsLayer {
    let allow_any = std::env::var("CORS_ALLOW_ANY")
        .map(|v| matches!(v.to_lowercase().as_str(), "1" | "true" | "yes"))
        .unwrap_or(false);

    if allow_any {
        return CorsLayer::new()
            .allow_origin(Any)
            .allow_methods(Any)
            .allow_headers(Any);
    }

    let origin = std::env::var("CORS_ORIGIN").unwrap_or_else(|_| {
        panic!(
            "Set CORS_ORIGIN in .env to your frontend origin (scheme+host+port), e.g. the Next.js URL. \
             It is not the API port. Or set CORS_ALLOW_ANY=1 for local dev."
        )
    });

    let hv = HeaderValue::from_str(origin.trim()).unwrap_or_else(|_| {
        panic!("CORS_ORIGIN must be a valid Origin value (e.g. http://localhost:3000)");
    });

    CorsLayer::new()
        .allow_origin(AllowOrigin::exact(hv))
        .allow_methods(Any)
        .allow_headers(Any)
}

pub fn create_router(state: AppState) -> Router {
    let openapi = ApiDoc::openapi();

    let protected = Router::new()
        .route("/api/v1/auth/me", get(auth_handlers::me))
        .route("/api/v1/admin/assets", get(asset::list_admin_assets))
        .route(
            "/api/v1/user/dashboard-assets",
            get(asset::list_dashboard_assets),
        )
        .route("/api/v1/user/assets/{id}", get(asset::get_user_asset))
        .route("/api/v1/user/similar-assets", get(asset::list_similar_assets))
        .layer(middleware::from_fn_with_state(
            state.clone(),
            auth::require_auth,
        ));

    Router::new()
        .route("/health", get(|| async { "ok" }))
        .route("/api/v1/auth/register", post(auth_handlers::register))
        .route("/api/v1/auth/login", post(auth_handlers::login))
        .merge(protected)
        .merge(SwaggerUi::new("/swagger-ui").url("/api-docs/openapi.json", openapi))
        .layer(cors_layer())
        .with_state(state)
}
