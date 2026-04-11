use serde::{Deserialize, Serialize};
use utoipa::ToSchema;

#[derive(Debug, Clone, Serialize, Deserialize, ToSchema)]
pub struct AdminDashboardStats {
    pub total_assets: i64,
    pub pending_requests: i64,
    pub active_borrows: i64,
    pub avg_wait_minutes: i32,
    /// MoM change hint for total assets (0 if unknown).
    pub assets_trend_pct: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize, ToSchema)]
pub struct ActivityEventRow {
    pub id: String,
    pub actor_name: String,
    pub actor_avatar_url: String,
    pub action_summary: String,
    pub created_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, ToSchema)]
pub struct MonthlyFlowPoint {
    pub year: i32,
    pub month: i32,
    pub label: String,
    pub checkouts: i32,
    pub returns_count: i32,
}

#[derive(Debug, Clone, Serialize, Deserialize, ToSchema)]
pub struct AdminDashboardResponse {
    pub stats: AdminDashboardStats,
    pub recent_activity: Vec<ActivityEventRow>,
    pub monthly_flow: Vec<MonthlyFlowPoint>,
}

#[derive(Debug, Clone, Serialize, Deserialize, ToSchema)]
pub struct RegistrySummary {
    pub total_inventory_value_usd: f64,
    pub total_assets: i64,
    pub assigned_count: i64,
    pub available_count: i64,
    pub maintenance_count: i64,
    pub pending_requests: i64,
    pub compliance_rate_pct: f64,
}

#[derive(Debug, Clone, Serialize, Deserialize, ToSchema)]
pub struct BorrowRequestRow {
    pub id: String,
    pub asset_id: String,
    pub asset_name: String,
    pub requester_name: String,
    pub requester_email: String,
    pub status: String,
    pub request_type: String,
    pub created_at: String,
}

#[derive(Debug, Clone, Serialize, Deserialize, ToSchema)]
pub struct IntegrityHealth {
    pub critical_malfunction_count: i64,
    pub operational_wear_count: i64,
}

#[derive(Debug, Clone, Serialize, Deserialize, ToSchema)]
pub struct ReportsResponse {
    pub monthly: Vec<MonthlyFlowPoint>,
    pub integrity: IntegrityHealth,
}

#[derive(Debug, Clone, Serialize, Deserialize, ToSchema)]
pub struct PlatformSettings {
    pub terms_text: String,
    pub maintenance_mode: bool,
    pub core_version: String,
    pub last_backup_at: Option<String>,
    pub database_latency_ms: u64,
}

#[derive(Debug, Serialize, Deserialize, ToSchema)]
pub struct PlatformSettingsPatch {
    pub terms_text: Option<String>,
    pub maintenance_mode: Option<bool>,
}
