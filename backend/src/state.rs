use std::sync::Arc;

use crate::services::AssetService;

/// Shared application state injected into handlers (thin controllers).
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
}
