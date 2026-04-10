/// TCP port (default `3001`). Override with `PORT`.
pub fn port() -> String {
    std::env::var("PORT").unwrap_or_else(|_| "3001".to_string())
}

/// Bind address for the listener. Override with `HOST`.
/// Default `127.0.0.1` so local browser uses `http://localhost:…` — use `HOST=0.0.0.0` for LAN/Docker.
pub fn listen_addr() -> String {
    let host = std::env::var("HOST").unwrap_or_else(|_| "127.0.0.1".to_string());
    format!("{}:{}", host, port())
}
