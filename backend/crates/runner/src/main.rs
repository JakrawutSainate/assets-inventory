//! One process: unified gRPC (assets + auth + admin) and health gRPC — shared DB-backed [`AssetRepository`].

use std::io;
use std::net::SocketAddr;
use std::sync::Arc;

use asset_grpc::GrpcState;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

fn ensure_tcp_available(addr: SocketAddr, what: &str, hint: &str) -> io::Result<()> {
    std::net::TcpListener::bind(addr).map_err(|e| {
        io::Error::new(
            e.kind(),
            format!("{what}: cannot use {addr} — {e}\n  {hint}"),
        )
    })?;
    Ok(())
}

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
            tracing::warn!("JWT_SECRET unset — using insecure dev default; set in production");
            "dev-only-change-me-use-at-least-32-characters-secret".into()
        })
        .into_boxed_str(),
    );

    let asset_port = std::env::var("ASSET_GRPC_PORT").unwrap_or_else(|_| "50051".to_string());
    let asset_addr: SocketAddr = format!("127.0.0.1:{asset_port}").parse()?;

    let health_port = std::env::var("HEALTH_GRPC_PORT").unwrap_or_else(|_| "50052".to_string());
    let health_addr: SocketAddr = format!("127.0.0.1:{health_port}").parse()?;

    ensure_tcp_available(
        asset_addr,
        "main gRPC",
        "Stop the process using this port or: set ASSET_GRPC_PORT=50061",
    )?;
    ensure_tcp_available(
        health_addr,
        "health gRPC",
        "Stop the process using this port or: set HEALTH_GRPC_PORT=50062",
    )?;

    let state = GrpcState::new(handles.assets, handles.pool, jwt_secret);

    tracing::info!("gRPC (asset + auth + admin): grpc://127.0.0.1:{asset_port}");
    tracing::info!("health gRPC: grpc://127.0.0.1:{health_port}");
    tracing::info!("press Ctrl+C to stop");

    let grpc_task = tokio::spawn(async move {
        if let Err(e) = asset_grpc::serve(asset_addr, state).await {
            tracing::error!(error = %e, "gRPC server exited");
        }
    });

    let health_task = tokio::spawn(async move {
        if let Err(e) = health_grpc::serve(health_addr).await {
            tracing::error!(error = %e, "health gRPC exited");
        }
    });

    tokio::signal::ctrl_c().await?;

    grpc_task.abort();
    health_task.abort();

    Ok(())
}
