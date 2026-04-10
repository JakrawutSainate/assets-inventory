//! Standalone gRPC server (same logic as [`asset_grpc::serve`]).

use std::net::SocketAddr;
use std::sync::Arc;

use common::services::AssetService;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "info".into()),
        )
        .init();

    let port = std::env::var("ASSET_GRPC_PORT").unwrap_or_else(|_| "50051".into());
    let addr: SocketAddr = format!("127.0.0.1:{port}").parse()?;
    let assets = Arc::new(AssetService::new());

    tracing::info!("asset-grpc listening on grpc://127.0.0.1:{}", port);

    asset_grpc::serve(addr, assets).await?;
    Ok(())
}
