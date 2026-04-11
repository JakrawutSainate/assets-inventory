import { TrendingUp, TriangleAlert } from "lucide-react";

import { AssetTable } from "@/components/AssetTable";
import { PageHeader } from "@/components/PageHeader";
import { SearchBar } from "@/components/SearchBar";
import { StatsCard } from "@/components/StatsCard";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { assetService } from "@/services/AssetService";

export default async function AdminAssetsPage() {
  const assets = await assetService.getAllAssets();

  return (
    <AdminLayout active="assets">
      <PageHeader
        title="Asset Registry"
        description="Centralized oversight of all high-value custodial items and organizational resources."
        actionLabel="Add New Asset"
      />

      <SearchBar />
      <AssetTable assets={assets} />

      <section className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-4">
        <StatsCard
          label="Total Inventory Value"
          value="$1,240,400"
          detail={
            <div className="flex items-center gap-1 text-xs text-emerald-500 dark:text-emerald-400">
              <TrendingUp size={14} />
              <span>+12.4% this quarter</span>
            </div>
          }
        />

        <StatsCard
          label="Active Deployments"
          value="182 Items"
          detail={
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <div className="h-6 w-6 rounded-full border-2 border-slate-950 bg-slate-800" />
                <div className="h-6 w-6 rounded-full border-2 border-slate-950 bg-slate-700" />
                <div className="h-6 w-6 rounded-full border-2 border-slate-950 bg-slate-600" />
              </div>
              <span className="text-xs text-slate-600 dark:text-slate-400">+14 pending</span>
            </div>
          }
        />

        <StatsCard
          label="Compliance Rate"
          value="99.2%"
          detail={
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-[99%] bg-indigo-500" />
            </div>
          }
        />

        <StatsCard
          label="Maintenance Alerts"
          value="3 Priority"
          detail={
            <div className="flex items-center gap-1 text-xs text-red-500">
              <TriangleAlert size={14} />
              <span>Immediate action required</span>
            </div>
          }
        />
      </section>
    </AdminLayout>
  );
}
