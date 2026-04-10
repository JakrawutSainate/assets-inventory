use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

#[derive(Debug, Clone, Serialize, Deserialize, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct UserAsset {
    pub id: String,
    pub name: String,
    pub image_url: String,
    pub status: UserAssetStatus,
    pub category: String,
    pub location_label: String,
    pub daily_rate_usd: f64,
    pub action_label: String,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize, ToSchema, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum UserAssetStatus {
    Available,
    Borrowed,
    Reserved,
    InTransit,
}
