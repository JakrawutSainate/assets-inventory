//! Assets inventory API — layered MVC-style layout for HTTP JSON services.
pub mod config;
pub mod handlers;
pub mod models;
pub mod openapi;
pub mod routes;
pub mod services;
pub mod state;

pub use routes::create_router;
pub use state::AppState;
