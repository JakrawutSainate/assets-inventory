import {
  ClipboardList,
  Eye,
  TrendingUp,
} from "lucide-react";

import { DashboardToolbar } from "@/components/admin/dashboard/parts/DashboardToolbar";
import { DashboardStatCard } from "@/components/admin/dashboard/parts/DashboardStatCard";
import { RecentHandlersCard } from "@/components/admin/dashboard/parts/RecentHandlersCard";
import { TopPerformingAssetsTable } from "@/components/admin/dashboard/parts/TopPerformingAssetsTable";
import { UtilizationChartCard } from "@/components/admin/dashboard/parts/UtilizationChartCard";
import type { RecentHandler } from "@/components/admin/dashboard/parts/types";
import { formatRelativeTime } from "@/lib/format-relative-time";
import type { AdminDashboardResponse } from "@/models/AdminApi";
import type { Asset } from "@/models/Asset";

type AdminDashboardContentProps = {
  dashboard: AdminDashboardResponse;
  assets: Asset[];
};

export function AdminDashboardContent({ dashboard, assets }: AdminDashboardContentProps) {
  const { stats, recent_activity, monthly_flow } = dashboard;

  const recentHandlers: RecentHandler[] = recent_activity.map((ev) => ({
    id: ev.id,
    name: ev.actor_name,
    action: ev.action_summary,
    time: formatRelativeTime(ev.created_at),
    online: false,
    avatar: ev.actor_avatar_url ?? "",
  }));

  const trendPct = stats.assets_trend_pct;
  const trendLabel =
    trendPct > 0
      ? `+${trendPct.toFixed(1)}% checkout momentum (MoM)`
      : trendPct < 0
        ? `${trendPct.toFixed(1)}% checkout momentum (MoM)`
        : "Stable vs prior month";

  return (
    <>
      <header className="mb-12 flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-slate-100">
            Systems Overview
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Real-time custody metrics and asset flow (from database).
          </p>
        </div>
        <DashboardToolbar />
      </header>

      <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <DashboardStatCard
          label="Total Assets"
          value={stats.total_assets.toLocaleString()}
          trend={
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-500">
              <TrendingUp size={14} />
              <span>{trendLabel}</span>
            </div>
          }
        />
        <DashboardStatCard
          label="Pending Requests"
          value={stats.pending_requests.toString()}
          trend={
            <div className="flex items-center gap-2 text-sm font-bold text-amber-500">
              <ClipboardList size={14} />
              <span>Avg. wait time: {stats.avg_wait_minutes}m</span>
            </div>
          }
        />
        <DashboardStatCard
          label="Active Borrows"
          value={stats.active_borrows.toLocaleString()}
          trend={
            <div className="flex items-center gap-2 text-sm font-bold text-indigo-500">
              <Eye size={14} />
              <span>User assets in circulation</span>
            </div>
          }
        />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <UtilizationChartCard monthly={monthly_flow} />
        <RecentHandlersCard handlers={recentHandlers} />
      </section>

      <TopPerformingAssetsTable assets={assets} />
    </>
  );
}
