//! OWASP-style input checks for route parameters (reduce injection / probing surface).

/// Basic email sanity check (not a full RFC parser).
pub fn validate_email(email: &str) -> Result<(), &'static str> {
    let e = email.trim();
    if e.is_empty() {
        return Err("empty email");
    }
    if e.len() > 254 {
        return Err("email too long");
    }
    let Some((local, domain)) = e.split_once('@') else {
        return Err("invalid email");
    };
    if local.is_empty() || local.len() > 64 {
        return Err("invalid email");
    }
    if domain.is_empty() || !domain.contains('.') {
        return Err("invalid email");
    }
    Ok(())
}

pub fn validate_password(password: &str) -> Result<(), &'static str> {
    if password.len() < 8 {
        return Err("password must be at least 8 characters");
    }
    if password.len() > 256 {
        return Err("password too long");
    }
    Ok(())
}

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
