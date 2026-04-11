use utoipa::openapi::security::{HttpAuthScheme, HttpBuilder, SecurityScheme};
use utoipa::{Modify, OpenApi};

use crate::handlers::{asset, auth};
use common::models::{Asset, AuthResponse, LoginRequest, PublicUser, RegisterRequest, UserAsset};

struct SecurityAddon;

impl Modify for SecurityAddon {
    fn modify(&self, openapi: &mut utoipa::openapi::OpenApi) {
        if let Some(components) = openapi.components.as_mut() {
            components.add_security_scheme(
                "bearer_auth",
                SecurityScheme::Http(
                    HttpBuilder::new()
                        .scheme(HttpAuthScheme::Bearer)
                        .bearer_format("JWT")
                        .build(),
                ),
            );
        }
    }
}

#[derive(OpenApi)]
#[openapi(
    modifiers(&SecurityAddon),
    info(
        title = "Assets Inventory API",
        description = "REST + JWT auth; same asset data as gRPC (`asset-grpc`).",
        version = "0.2.0"
    ),
    paths(
        auth::register,
        auth::login,
        auth::me,
        asset::list_admin_assets,
        asset::list_dashboard_assets,
        asset::get_user_asset,
        asset::list_similar_assets,
    ),
    components(schemas(
        Asset,
        UserAsset,
        RegisterRequest,
        LoginRequest,
        AuthResponse,
        PublicUser,
        common::models::UserRole,
    )),
    tags(
        (name = "auth", description = "Register / login / session"),
        (name = "admin", description = "Admin registry (admin role)"),
        (name = "user", description = "User dashboard (signed-in users)")
    )
)]
pub struct ApiDoc;
