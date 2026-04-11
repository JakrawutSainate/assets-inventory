use std::sync::Arc;

use api_http::config::listen_addr;
use api_http::{create_router, AppState};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    let _ = dotenvy::dotenv();

    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "info".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    let handles = db::init_from_env().await?;
    let jwt_secret: Arc<str> = Arc::from(
        std::env::var("JWT_SECRET").unwrap_or_else(|_| {
            tracing::warn!("JWT_SECRET unset — using insecure dev default");
            "dev-only-change-me-use-at-least-32-characters-secret".into()
        })
        .into_boxed_str(),
    );
    let state = AppState::new(handles.assets, handles.pool, jwt_secret);
    let app = create_router(state);

    let addr = listen_addr();
    let listener = tokio::net::TcpListener::bind(&addr).await?;
    let port = std::env::var("PORT").unwrap_or_else(|_| "3001".into());

    tracing::info!("api-http listening on http://{}", addr);
    tracing::info!(
        "swagger ui: http://localhost:{}/swagger-ui/  openapi json: http://localhost:{}/api-docs/openapi.json",
        port,
        port
    );

    axum::serve(listener, app).await?;
    Ok(())
}
