use backend::{create_router, AppState};
use backend::config::{listen_addr, port};
use backend::services::AssetService;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync>> {
    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::try_from_default_env().unwrap_or_else(|_| "info".into()))
        .with(tracing_subscriber::fmt::layer())
        .init();

    let state = AppState::new(AssetService::new());
    let app = create_router(state);

    let addr = listen_addr();
    let listener = tokio::net::TcpListener::bind(&addr).await?;
    let p = port();
    tracing::info!("listening on http://{}", addr);
    tracing::info!("in browser use http://localhost:{}/  (swagger: http://localhost:{}/swagger-ui/)", p, p);

    axum::serve(listener, app).await?;
    Ok(())
}
