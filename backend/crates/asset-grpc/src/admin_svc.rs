use common::models::UserRole;
use db::admin;
use tonic::{Request, Response, Status};
use uuid::Uuid;

use crate::jwt::decode_token;
use crate::metadata::bearer_token;
use crate::pb_admin::admin_service_server::AdminService;
use crate::pb_admin::{
    ActivityEvent as PbActivity, BorrowRequestRow as PbBorrowRow, BorrowRequestsReply, DashboardReply,
    DashboardStats as PbDashStats, Empty, IdRequest, IntegrityHealth as PbIntegrity, MonthlyFlowPoint as PbMonth,
    OkReply, PatchSettingsRequest, RegistrySummaryReply, ReportsReply, SettingsReply,
};
use crate::state::GrpcState;

pub struct AdminGrpc {
    pub state: GrpcState,
}

fn require_admin(state: &GrpcState, req: &Request<Empty>) -> Result<(), Status> {
    let token = bearer_token(req)?;
    let u = decode_token(state, token).map_err(|_| Status::unauthenticated("invalid token"))?;
    if u.role != UserRole::Admin {
        return Err(Status::permission_denied("admin role required"));
    }
    Ok(())
}

fn require_admin_id(state: &GrpcState, req: &Request<IdRequest>) -> Result<(), Status> {
    let token = bearer_token(req)?;
    let u = decode_token(state, token).map_err(|_| Status::unauthenticated("invalid token"))?;
    if u.role != UserRole::Admin {
        return Err(Status::permission_denied("admin role required"));
    }
    Ok(())
}

#[tonic::async_trait]
impl AdminService for AdminGrpc {
    async fn get_dashboard(
        &self,
        req: Request<Empty>,
    ) -> Result<Response<DashboardReply>, Status> {
        require_admin(&self.state, &req)?;
        let d = admin::load_dashboard(&self.state.pool)
            .await
            .map_err(|e| {
                tracing::error!(error = %e, "dashboard");
                Status::internal("database error")
            })?;

        let stats = PbDashStats {
            total_assets: d.stats.total_assets,
            pending_requests: d.stats.pending_requests,
            active_borrows: d.stats.active_borrows,
            avg_wait_minutes: d.stats.avg_wait_minutes,
            assets_trend_pct: d.stats.assets_trend_pct,
        };

        let recent_activity: Vec<PbActivity> = d
            .recent_activity
            .into_iter()
            .map(|a| PbActivity {
                id: a.id,
                actor_name: a.actor_name,
                actor_avatar_url: a.actor_avatar_url,
                action_summary: a.action_summary,
                created_at: a.created_at,
            })
            .collect();

        let monthly_flow: Vec<PbMonth> = d
            .monthly_flow
            .into_iter()
            .map(|m| PbMonth {
                year: m.year,
                month: m.month,
                label: m.label,
                checkouts: m.checkouts,
                returns_count: m.returns_count,
            })
            .collect();

        Ok(Response::new(DashboardReply {
            stats: Some(stats),
            recent_activity,
            monthly_flow,
        }))
    }

    async fn get_registry_summary(
        &self,
        req: Request<Empty>,
    ) -> Result<Response<RegistrySummaryReply>, Status> {
        require_admin(&self.state, &req)?;
        let s = admin::load_registry_summary(&self.state.pool)
            .await
            .map_err(|e| {
                tracing::error!(error = %e, "registry summary");
                Status::internal("database error")
            })?;
        Ok(Response::new(RegistrySummaryReply {
            total_inventory_value_usd: s.total_inventory_value_usd,
            total_assets: s.total_assets,
            assigned_count: s.assigned_count,
            available_count: s.available_count,
            maintenance_count: s.maintenance_count,
            pending_requests: s.pending_requests,
            compliance_rate_pct: s.compliance_rate_pct,
        }))
    }

    async fn list_borrow_requests(
        &self,
        req: Request<Empty>,
    ) -> Result<Response<BorrowRequestsReply>, Status> {
        require_admin(&self.state, &req)?;
        let rows = admin::list_pending_borrow_requests(&self.state.pool)
            .await
            .map_err(|e| {
                tracing::error!(error = %e, "borrow list");
                Status::internal("database error")
            })?;
        let items: Vec<PbBorrowRow> = rows
            .into_iter()
            .map(|r| PbBorrowRow {
                id: r.id,
                asset_id: r.asset_id,
                asset_name: r.asset_name,
                requester_name: r.requester_name,
                requester_email: r.requester_email,
                status: r.status,
                request_type: r.request_type,
                created_at: r.created_at,
            })
            .collect();
        Ok(Response::new(BorrowRequestsReply { items }))
    }

    async fn approve_borrow_request(
        &self,
        req: Request<IdRequest>,
    ) -> Result<Response<OkReply>, Status> {
        require_admin_id(&self.state, &req)?;
        let id = Uuid::parse_str(&req.get_ref().id).map_err(|_| Status::invalid_argument("bad id"))?;
        let ok = admin::set_borrow_request_status(&self.state.pool, &id, "approved")
            .await
            .map_err(|e| {
                tracing::error!(error = %e, "approve");
                Status::internal("database error")
            })?;
        if !ok {
            return Err(Status::not_found("request not found or not pending"));
        }
        Ok(Response::new(OkReply { ok: true }))
    }

    async fn decline_borrow_request(
        &self,
        req: Request<IdRequest>,
    ) -> Result<Response<OkReply>, Status> {
        require_admin_id(&self.state, &req)?;
        let id = Uuid::parse_str(&req.get_ref().id).map_err(|_| Status::invalid_argument("bad id"))?;
        let ok = admin::set_borrow_request_status(&self.state.pool, &id, "declined")
            .await
            .map_err(|e| {
                tracing::error!(error = %e, "decline");
                Status::internal("database error")
            })?;
        if !ok {
            return Err(Status::not_found("request not found or not pending"));
        }
        Ok(Response::new(OkReply { ok: true }))
    }

    async fn get_reports(&self, req: Request<Empty>) -> Result<Response<ReportsReply>, Status> {
        require_admin(&self.state, &req)?;
        let r = admin::load_reports(&self.state.pool)
            .await
            .map_err(|e| {
                tracing::error!(error = %e, "reports");
                Status::internal("database error")
            })?;
        let monthly: Vec<PbMonth> = r
            .monthly
            .into_iter()
            .map(|m| PbMonth {
                year: m.year,
                month: m.month,
                label: m.label,
                checkouts: m.checkouts,
                returns_count: m.returns_count,
            })
            .collect();
        let integrity = PbIntegrity {
            critical_malfunction_count: r.integrity.critical_malfunction_count,
            operational_wear_count: r.integrity.operational_wear_count,
        };
        Ok(Response::new(ReportsReply {
            monthly,
            integrity: Some(integrity),
        }))
    }

    async fn get_settings(&self, req: Request<Empty>) -> Result<Response<SettingsReply>, Status> {
        require_admin(&self.state, &req)?;
        let s = admin::load_platform_settings(&self.state.pool)
            .await
            .map_err(|e| {
                tracing::error!(error = %e, "settings");
                Status::internal("database error")
            })?;
        Ok(Response::new(SettingsReply {
            terms_text: s.terms_text,
            maintenance_mode: s.maintenance_mode,
            core_version: s.core_version,
            last_backup_at: s.last_backup_at,
            database_latency_ms: s.database_latency_ms,
        }))
    }

    async fn patch_settings(
        &self,
        req: Request<PatchSettingsRequest>,
    ) -> Result<Response<SettingsReply>, Status> {
        let token = bearer_token(&req)?;
        let u = decode_token(&self.state, token).map_err(|_| Status::unauthenticated("invalid token"))?;
        if u.role != UserRole::Admin {
            return Err(Status::permission_denied("admin role required"));
        }
        let body = req.into_inner();
        admin::patch_platform_settings(
            &self.state.pool,
            body.terms_text.as_deref(),
            body.maintenance_mode,
        )
        .await
        .map_err(|e| {
            tracing::error!(error = %e, "patch settings");
            Status::internal("database error")
        })?;
        let s = admin::load_platform_settings(&self.state.pool)
            .await
            .map_err(|_| Status::internal("database error"))?;
        Ok(Response::new(SettingsReply {
            terms_text: s.terms_text,
            maintenance_mode: s.maintenance_mode,
            core_version: s.core_version,
            last_backup_at: s.last_backup_at,
            database_latency_ms: s.database_latency_ms,
        }))
    }
}
