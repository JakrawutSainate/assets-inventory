use std::sync::Arc;

use common::services::AssetService;

#[derive(Clone)]
pub struct AppState {
    pub assets: Arc<AssetService>,
}

impl AppState {
    pub fn new(assets: AssetService) -> Self {
        Self {
            assets: Arc::new(assets),
        }
    }

    pub fn from_arc(assets: Arc<AssetService>) -> Self {
        Self { assets }
    }
}
