//! REST + OpenAPI (Swagger UI); uses the same [`common::services::AssetService`] as gRPC.
pub mod auth;
pub mod config;
pub mod handlers;
pub mod openapi;
pub mod routes;
pub mod state;

pub use routes::create_router;
pub use state::AppState;
