//! Standalone health gRPC server.

use std::net::SocketAddr;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "info".into()),
        )
        .init();

    let port = std::env::var("HEALTH_GRPC_PORT").unwrap_or_else(|_| "50052".into());
    let addr: SocketAddr = format!("127.0.0.1:{port}").parse()?;

    tracing::info!("health-grpc listening on grpc://127.0.0.1:{}", port);

    health_grpc::serve(addr).await?;
    Ok(())
}
