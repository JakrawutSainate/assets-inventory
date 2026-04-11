//! OWASP-style input checks for route parameters (reduce injection / probing surface).

/// Asset id from URL path: safe charset + length cap.
pub fn validate_asset_id(id: &str) -> Result<(), &'static str> {
    if id.is_empty() {
        return Err("empty id");
    }
    if id.len() > 128 {
        return Err("id too long");
    }
    let ok = id
        .chars()
        .all(|c| c.is_ascii_alphanumeric() || c == '-' || c == '_');
    if !ok {
        return Err("invalid id characters");
    }
    Ok(())
}
