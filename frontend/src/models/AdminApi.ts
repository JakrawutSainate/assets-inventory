export type AdminDashboardStats = {
  total_assets: number;
  pending_requests: number;
  active_borrows: number;
  avg_wait_minutes: number;
  assets_trend_pct: number;
};

export type ActivityEventRow = {
  id: string;
  actor_name: string;
  actor_avatar_url: string;
  action_summary: string;
  created_at: string;
};

export type MonthlyFlowPoint = {
  year: number;
  month: number;
  label: string;
  checkouts: number;
  returns_count: number;
};

export type AdminDashboardResponse = {
  stats: AdminDashboardStats;
  recent_activity: ActivityEventRow[];
  monthly_flow: MonthlyFlowPoint[];
};

export type RegistrySummary = {
  total_inventory_value_usd: number;
  total_assets: number;
  assigned_count: number;
  available_count: number;
  maintenance_count: number;
  pending_requests: number;
  compliance_rate_pct: number;
};

export type BorrowRequestRow = {
  id: string;
  asset_id: string;
  asset_name: string;
  requester_name: string;
  requester_email: string;
  status: string;
  request_type: string;
  created_at: string;
};

export type IntegrityHealth = {
  critical_malfunction_count: number;
  operational_wear_count: number;
};

export type ReportsResponse = {
  monthly: MonthlyFlowPoint[];
  integrity: IntegrityHealth;
};

export type PlatformSettings = {
  terms_text: string;
  maintenance_mode: boolean;
  core_version: string;
  last_backup_at: string | null;
  database_latency_ms: number;
};
