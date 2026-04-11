use tonic::{Request, Status};

/// Extract `Bearer` token from gRPC metadata (`authorization` or `Authorization`).
pub fn bearer_token<T>(req: &Request<T>) -> Result<&str, Status> {
    let m = req.metadata();
    let v = m
        .get("authorization")
        .or_else(|| m.get("Authorization"))
        .ok_or_else(|| Status::unauthenticated("missing authorization metadata"))?;
    let s = v
        .to_str()
        .map_err(|_| Status::invalid_argument("non-ascii authorization"))?;
    s.strip_prefix("Bearer ")
        .map(str::trim)
        .ok_or_else(|| Status::unauthenticated("expected Bearer token"))
}
