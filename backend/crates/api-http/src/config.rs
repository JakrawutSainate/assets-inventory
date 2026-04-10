pub fn listen_addr() -> String {
    let host = std::env::var("HOST").unwrap_or_else(|_| "127.0.0.1".to_string());
    let port = std::env::var("PORT").unwrap_or_else(|_| "3001".to_string());
    format!("{host}:{port}")
}
