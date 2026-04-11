use std::sync::Arc;

use common::repository::AssetRepository;
use db::PgPool;

#[derive(Clone)]
pub struct GrpcState {
    pub assets: Arc<dyn AssetRepository>,
    pub pool: PgPool,
    pub jwt_secret: Arc<str>,
}

impl GrpcState {
    pub fn new(assets: Arc<dyn AssetRepository>, pool: PgPool, jwt_secret: impl Into<Arc<str>>) -> Self {
        Self {
            assets,
            pool,
            jwt_secret: jwt_secret.into(),
        }
    }
}
