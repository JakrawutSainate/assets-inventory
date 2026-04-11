use std::sync::Arc;

use common::repository::AssetRepository;

#[derive(Clone)]
pub struct AppState {
    pub assets: Arc<dyn AssetRepository>,
}

impl AppState {
    pub fn new(assets: Arc<dyn AssetRepository>) -> Self {
        Self { assets }
    }
}
