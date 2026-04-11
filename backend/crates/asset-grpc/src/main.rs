//! Standalone gRPC server (assets + auth + admin).

use std::net::SocketAddr;
use std::sync::Arc;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "info".into()),
        )
        .init();

    let handles = db::init_from_env().await?;
    let jwt_secret: Arc<str> = Arc::from(
        std::env::var("JWT_SECRET").unwrap_or_else(|_| {
            tracing::warn!("JWT_SECRET unset — using insecure dev default; set in production");
            "dev-only-change-me-use-at-least-32-characters-secret".into()
        })
        .into_boxed_str(),
    );

    let port = std::env::var("ASSET_GRPC_PORT").unwrap_or_else(|_| "50051".to_string());
    let addr: SocketAddr = format!("127.0.0.1:{port}").parse()?;

    let state = asset_grpc::GrpcState::new(handles.assets, handles.pool, jwt_secret);

    tracing::info!("gRPC (asset + auth + admin): grpc://127.0.0.1:{}", port);

    asset_grpc::serve(addr, state).await?;
    Ok(())
}
