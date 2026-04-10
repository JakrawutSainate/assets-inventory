import { Search } from "lucide-react";

import { TopPerformingAssetRow } from "@/components/admin/dashboard/parts/TopPerformingAssetRow";
import type { Asset } from "@/models/Asset";

type TopPerformingAssetsTableProps = {
  assets: Asset[];
};

export function TopPerformingAssetsTable({ assets }: TopPerformingAssetsTableProps) {
  return (
    <section className="mt-10 overflow-hidden rounded-xl bg-white shadow-[0_20px_40px_rgba(13,28,46,0.06)] dark:bg-slate-900 dark:shadow-none">
      <div className="flex items-center justify-between border-b border-slate-200 p-8 dark:border-slate-800">
        <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">Top Performing Assets</h4>
        <div className="relative">
          <Search
            size={16}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-slate-500 dark:text-slate-400"
          />
          <input
            className="w-64 rounded-lg bg-slate-100 py-2 pr-4 pl-10 text-sm text-slate-800 placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-slate-800 dark:text-slate-200"
            placeholder="Filter by serial or type..."
            type="text"
          />
        </div>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-slate-200 text-[10px] font-bold tracking-widest text-slate-500 uppercase dark:border-slate-800">
            <th className="px-8 py-4">Asset Identification</th>
            <th className="px-8 py-4">Current Status</th>
            <th className="px-8 py-4">Utilization Score</th>
            <th className="px-8 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {assets.slice(0, 2).map((asset, index) => (
            <TopPerformingAssetRow
              key={asset.id}
              asset={asset}
              statusLabel={index === 0 ? "Available" : "In Use"}
              utilizationPercent={index === 0 ? 92 : 78}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}
