use utoipa::openapi::security::{HttpAuthScheme, HttpBuilder, SecurityScheme};
use utoipa::{Modify, OpenApi};

use crate::handlers::{admin, asset, auth};
use common::models::{
    ActivityEventRow, AdminDashboardResponse, AdminDashboardStats, Asset, AuthResponse, BorrowRequestRow,
    IntegrityHealth, LoginRequest, MonthlyFlowPoint, PlatformSettings, PlatformSettingsPatch, PublicUser,
    RegisterRequest, RegistrySummary, ReportsResponse, UserAsset,
};

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
        version = "0.3.0"
    ),
    paths(
        auth::register,
        auth::login,
        auth::me,
        asset::list_admin_assets,
        asset::list_dashboard_assets,
        asset::get_user_asset,
        asset::list_similar_assets,
        admin::get_dashboard,
        admin::get_registry_summary,
        admin::list_borrow_requests,
        admin::approve_borrow_request,
        admin::decline_borrow_request,
        admin::get_reports,
        admin::get_settings,
        admin::patch_settings,
    ),
    components(schemas(
        Asset,
        UserAsset,
        RegisterRequest,
        LoginRequest,
        AuthResponse,
        PublicUser,
        common::models::UserRole,
        AdminDashboardResponse,
        AdminDashboardStats,
        ActivityEventRow,
        MonthlyFlowPoint,
        RegistrySummary,
        BorrowRequestRow,
        ReportsResponse,
        IntegrityHealth,
        PlatformSettings,
        PlatformSettingsPatch,
    )),
    tags(
        (name = "auth", description = "Register / login / session"),
        (name = "admin", description = "Admin registry (admin role)"),
        (name = "user", description = "User dashboard (signed-in users)")
    )
)]
pub struct ApiDoc;
