//! One process: REST + Swagger, asset gRPC, health gRPC — shared DB-backed [`AssetRepository`].

use std::io;
use std::net::SocketAddr;

use api_http::{create_router, AppState};
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

fn http_listen_addr() -> String {
    let host = std::env::var("HOST").unwrap_or_else(|_| "127.0.0.1".to_string());
    let port = std::env::var("HTTP_PORT")
        .or_else(|_| std::env::var("PORT"))
        .unwrap_or_else(|_| "3001".to_string());
    format!("{host}:{port}")
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

    let repo = db::init_from_env().await?;
    let assets = repo.clone();

    let http_addr = http_listen_addr();
    let http_listener = tokio::net::TcpListener::bind(&http_addr).await.map_err(|e| {
        io::Error::new(
            e.kind(),
            format!(
                "HTTP: cannot bind {http_addr} — {e}\n  Port may be in use. Close the other terminal, or run: taskkill /IM runner.exe /F\n  Or use another port: set HTTP_PORT=3002"
            ),
        )
    })?;

    let asset_port = std::env::var("ASSET_GRPC_PORT").unwrap_or_else(|_| "50051".to_string());
    let asset_addr: SocketAddr = format!("127.0.0.1:{asset_port}").parse()?;

    let health_port = std::env::var("HEALTH_GRPC_PORT").unwrap_or_else(|_| "50052".to_string());
    let health_addr: SocketAddr = format!("127.0.0.1:{health_port}").parse()?;

    ensure_tcp_available(
        asset_addr,
        "asset gRPC",
        "Stop the process using this port or: set ASSET_GRPC_PORT=50061",
    )?;
    ensure_tcp_available(
        health_addr,
        "health gRPC",
        "Stop the process using this port or: set HEALTH_GRPC_PORT=50062",
    )?;

    let http_port = std::env::var("HTTP_PORT")
        .or_else(|_| std::env::var("PORT"))
        .unwrap_or_else(|_| "3001".to_string());

    let app = create_router(AppState::new(assets.clone()));

    tracing::info!("http + swagger: http://127.0.0.1:{http_port}/  (swagger: http://localhost:{http_port}/swagger-ui/)");
    tracing::info!("asset gRPC: grpc://127.0.0.1:{asset_port}");
    tracing::info!("health gRPC: grpc://127.0.0.1:{health_port}");
    tracing::info!("press Ctrl+C to stop");

    let http_task = tokio::spawn(async move {
        if let Err(e) = axum::serve(http_listener, app).await {
            tracing::error!(error = %e, "http server exited");
        }
    });

    let assets_grpc = assets.clone();
    let grpc_task = tokio::spawn(async move {
        if let Err(e) = asset_grpc::serve(asset_addr, assets_grpc).await {
            tracing::error!(error = %e, "asset gRPC exited");
        }
    });

    let health_task = tokio::spawn(async move {
        if let Err(e) = health_grpc::serve(health_addr).await {
            tracing::error!(error = %e, "health gRPC exited");
        }
    });

    tokio::signal::ctrl_c().await?;

    http_task.abort();
    grpc_task.abort();
    health_task.abort();

    Ok(())
}
