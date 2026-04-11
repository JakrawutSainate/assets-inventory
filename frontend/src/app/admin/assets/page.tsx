import { TrendingUp, TriangleAlert } from "lucide-react";

import { AssetTable } from "@/components/AssetTable";
import { PageHeader } from "@/components/PageHeader";
import { SearchBar } from "@/components/SearchBar";
import { StatsCard } from "@/components/StatsCard";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { requireAdmin } from "@/lib/auth-server";
import { createAdminApiRepository } from "@/services/AdminApiRepository";
import { createAssetService } from "@/services/AssetService";

function usd(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

export default async function AdminAssetsPage() {
  const { token, user } = await requireAdmin();
  const adminApi = createAdminApiRepository(token);
  const [assets, summary] = await Promise.all([
    createAssetService(token).getAllAssets(),
    adminApi.getRegistrySummary(),
  ]);

  return (
    <AdminLayout active="assets" user={user}>
      <PageHeader
        title="Asset Registry"
        description="Centralized oversight of all high-value custodial items and organizational resources."
        actionLabel="Add New Asset"
      />

      <SearchBar />
      <AssetTable assets={assets} totalCount={summary.total_assets} />

      <section className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-4">
        <StatsCard
          label="Total Inventory Value"
          value={usd(summary.total_inventory_value_usd)}
          detail={
            <div className="flex items-center gap-1 text-xs text-emerald-500 dark:text-emerald-400">
              <TrendingUp size={14} />
              <span>Live total from registry</span>
            </div>
          }
        />

        <StatsCard
          label="Active Deployments"
          value={`${summary.assigned_count} Items`}
          detail={
            <div className="flex gap-2 text-xs text-slate-600 dark:text-slate-400">
              <span>{summary.pending_requests} pending requests</span>
            </div>
          }
        />

        <StatsCard
          label="Compliance Rate"
          value={`${summary.compliance_rate_pct.toFixed(1)}%`}
          detail={
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full bg-indigo-500"
                style={{ width: `${Math.min(100, summary.compliance_rate_pct)}%` }}
              />
            </div>
          }
        />

        <StatsCard
          label="Maintenance Alerts"
          value={`${summary.maintenance_count} Priority`}
          detail={
            <div className="flex items-center gap-1 text-xs text-red-500">
              <TriangleAlert size={14} />
              <span>Assets in maintenance status</span>
            </div>
          }
        />
      </section>
    </AdminLayout>
  );
}
