use async_trait::async_trait;
use anyhow::Result;

use crate::models::{Asset, UserAsset};

/// Storage abstraction — implemented by `db::PgAssets` (PostgreSQL / Neon).
#[async_trait]
pub trait AssetRepository: Send + Sync {
    async fn list_admin_assets(&self) -> Result<Vec<Asset>>;
    async fn list_user_dashboard_assets(&self) -> Result<Vec<UserAsset>>;
    async fn get_user_asset(&self, id: &str) -> Result<Option<UserAsset>>;
    async fn list_similar_user_assets(&self, limit: usize) -> Result<Vec<UserAsset>>;
}
