//! Standalone gRPC server.

use std::net::SocketAddr;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "info".into()),
        )
        .init();

    let repo = db::init_from_env().await?;
    let port = std::env::var("ASSET_GRPC_PORT").unwrap_or_else(|_| "50051".to_string());
    let addr: SocketAddr = format!("127.0.0.1:{port}").parse()?;

    tracing::info!("asset-grpc listening on grpc://127.0.0.1:{}", port);

    asset_grpc::serve(addr, repo).await?;
    Ok(())
}
