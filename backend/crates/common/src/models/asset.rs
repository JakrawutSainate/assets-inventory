use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

#[derive(Debug, Clone, Serialize, Deserialize, ToSchema)]
#[serde(rename_all = "camelCase")]
pub struct Asset {
    pub id: String,
    pub name: String,
    pub serial_number: String,
    pub image_url: String,
    pub status: AssetStatus,
    pub category: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub custodian_name: Option<String>,
    pub value_usd: f64,
}

#[derive(Debug, Clone, Copy, Serialize, Deserialize, ToSchema, PartialEq, Eq)]
#[serde(rename_all = "lowercase")]
pub enum AssetStatus {
    Assigned,
    Available,
    Maintenance,
}
