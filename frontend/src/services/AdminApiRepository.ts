import * as grpc from "@grpc/grpc-js";
import { redirect } from "next/navigation";

import type {
  AdminDashboardResponse,
  BorrowRequestRow,
  PlatformSettings,
  RegistrySummary,
  ReportsResponse,
} from "@/models/AdminApi";
import { getAdminGrpcClient } from "@/services/grpc/grpcClients";
import { bearerMetadata, unaryPromise } from "@/services/grpc/grpc-unary";

function guardAdminGrpc(err: unknown): never {
  if (typeof err === "object" && err !== null && "code" in err) {
    const code = (err as grpc.ServiceError).code;
    if (code === grpc.status.UNAUTHENTICATED) {
      redirect("/login");
    }
    if (code === grpc.status.PERMISSION_DENIED) {
      redirect("/dashboard");
    }
  }
  throw err;
}

function num(v: string | number | undefined | null): number {
  if (v === undefined || v === null) {
    return 0;
  }
  return typeof v === "string" ? Number(v) : v;
}

/**
 * Admin data via gRPC (`admin_v1.AdminService`). Used from Server Components only.
 */
export class AdminApiRepository {
  constructor(private readonly token: string) {}

  private md() {
    return bearerMetadata(this.token);
  }

  private client() {
    return getAdminGrpcClient();
  }

  async getDashboard(): Promise<AdminDashboardResponse> {
    try {
      const reply = await unaryPromise<{
        stats?: {
          total_assets?: string | number;
          pending_requests?: string | number;
          active_borrows?: string | number;
          avg_wait_minutes?: string | number;
          assets_trend_pct?: number;
        };
        recent_activity?: Array<{
          id: string;
          actor_name: string;
          actor_avatar_url: string;
          action_summary: string;
          created_at: string;
        }>;
        monthly_flow?: Array<{
          year: number;
          month: number;
          label: string;
          checkouts: number;
          returns_count: number;
        }>;
      }>((cb) => (this.client() as any).getDashboard({}, this.md(), cb));

      const s = reply.stats;
      return {
        stats: {
          total_assets: num(s?.total_assets),
          pending_requests: num(s?.pending_requests),
          active_borrows: num(s?.active_borrows),
          avg_wait_minutes: num(s?.avg_wait_minutes),
          assets_trend_pct: s?.assets_trend_pct ?? 0,
        },
        recent_activity: (reply.recent_activity ?? []).map((a) => ({
          id: a.id,
          actor_name: a.actor_name,
          actor_avatar_url: a.actor_avatar_url,
          action_summary: a.action_summary,
          created_at: a.created_at,
        })),
        monthly_flow: (reply.monthly_flow ?? []).map((m) => ({
          year: m.year,
          month: m.month,
          label: m.label,
          checkouts: m.checkouts,
          returns_count: m.returns_count,
        })),
      };
    } catch (e) {
      guardAdminGrpc(e);
    }
  }

  async getRegistrySummary(): Promise<RegistrySummary> {
    try {
      const reply = await unaryPromise<{
        total_inventory_value_usd?: number;
        total_assets?: string | number;
        assigned_count?: string | number;
        available_count?: string | number;
        maintenance_count?: string | number;
        pending_requests?: string | number;
        compliance_rate_pct?: number;
      }>((cb) => (this.client() as any).getRegistrySummary({}, this.md(), cb));

      return {
        total_inventory_value_usd: reply.total_inventory_value_usd ?? 0,
        total_assets: num(reply.total_assets),
        assigned_count: num(reply.assigned_count),
        available_count: num(reply.available_count),
        maintenance_count: num(reply.maintenance_count),
        pending_requests: num(reply.pending_requests),
        compliance_rate_pct: reply.compliance_rate_pct ?? 0,
      };
    } catch (e) {
      guardAdminGrpc(e);
    }
  }

  async listBorrowRequests(): Promise<BorrowRequestRow[]> {
    try {
      const reply = await unaryPromise<{ items?: BorrowRequestRow[] }>((cb) =>
        (this.client() as any).listBorrowRequests({}, this.md(), cb),
      );
      return reply.items ?? [];
    } catch (e) {
      guardAdminGrpc(e);
    }
  }

  async getReports(): Promise<ReportsResponse> {
    try {
      const reply = await unaryPromise<{
        monthly?: Array<{
          year: number;
          month: number;
          label: string;
          checkouts: number;
          returns_count: number;
        }>;
        integrity?: {
          critical_malfunction_count?: string | number;
          operational_wear_count?: string | number;
        };
      }>((cb) => (this.client() as any).getReports({}, this.md(), cb));

      return {
        monthly: (reply.monthly ?? []).map((m) => ({
          year: m.year,
          month: m.month,
          label: m.label,
          checkouts: m.checkouts,
          returns_count: m.returns_count,
        })),
        integrity: {
          critical_malfunction_count: num(reply.integrity?.critical_malfunction_count),
          operational_wear_count: num(reply.integrity?.operational_wear_count),
        },
      };
    } catch (e) {
      guardAdminGrpc(e);
    }
  }

  async getSettings(): Promise<PlatformSettings> {
    try {
      const reply = await unaryPromise<{
        terms_text: string;
        maintenance_mode: boolean;
        core_version: string;
        last_backup_at?: string;
        database_latency_ms?: string | number;
      }>((cb) => (this.client() as any).getSettings({}, this.md(), cb));

      return {
        terms_text: reply.terms_text,
        maintenance_mode: reply.maintenance_mode,
        core_version: reply.core_version,
        last_backup_at: reply.last_backup_at ?? null,
        database_latency_ms: num(reply.database_latency_ms),
      };
    } catch (e) {
      guardAdminGrpc(e);
    }
  }
}

export function createAdminApiRepository(token: string): AdminApiRepository {
  return new AdminApiRepository(token);
}
