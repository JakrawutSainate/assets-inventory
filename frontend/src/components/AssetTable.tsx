import { ChevronLeft, ChevronRight } from "lucide-react";

import type { Asset } from "@/models/Asset";

import { AssetRow } from "@/components/AssetRow";

type AssetTableProps = {
  assets: Asset[];
  /** When set, footer shows "Showing start to end of total". */
  totalCount?: number;
};

export function AssetTable({ assets, totalCount }: AssetTableProps) {
  const total = totalCount ?? assets.length;
  const start = total === 0 ? 0 : 1;
  const end = assets.length;
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800/50 dark:bg-slate-950">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-slate-100 dark:bg-slate-900/50">
            <th className="px-6 py-5 text-xs font-bold tracking-widest text-slate-500 uppercase dark:text-slate-500">
              Asset Identity
            </th>
            <th className="px-6 py-5 text-xs font-bold tracking-widest text-slate-500 uppercase">
              Status
            </th>
            <th className="px-6 py-5 text-xs font-bold tracking-widest text-slate-500 uppercase">
              Category
            </th>
            <th className="px-6 py-5 text-xs font-bold tracking-widest text-slate-500 uppercase">
              Custodian
            </th>
            <th className="px-6 py-5 text-xs font-bold tracking-widest text-slate-500 uppercase">
              Value
            </th>
            <th className="px-6 py-5 text-right text-xs font-bold tracking-widest text-slate-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {assets.map((asset) => (
            <AssetRow key={asset.id} asset={asset} />
          ))}
        </tbody>
      </table>

      <footer className="flex items-center justify-between bg-slate-100/60 px-6 py-4 dark:bg-slate-900/30">
        <p className="text-xs font-medium text-slate-500 dark:text-slate-500">
          Showing {start} to {end} of {total} assets
        </p>
        <div className="flex gap-2">
          <button
            disabled
            className="rounded-lg bg-slate-200 p-2 text-slate-500 transition-colors hover:bg-slate-300 disabled:opacity-50 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700"
          >
            <ChevronLeft size={16} />
          </button>
          <button className="rounded-lg bg-slate-200 p-2 text-slate-700 transition-colors hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700">
            <ChevronRight size={16} />
          </button>
        </div>
      </footer>
    </div>
  );
}
