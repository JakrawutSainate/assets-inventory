use api_http::config::listen_addr;
use api_http::{create_router, AppState};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "info".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    let repo = db::init_from_env().await?;
    let state = AppState::new(repo);
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
