import type { Asset } from "@/models/Asset";

import { AssetRow } from "@/components/AssetRow";

type AssetTableProps = {
  assets: Asset[];
};

export function AssetTable({ assets }: AssetTableProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800/50 bg-slate-950 shadow-2xl">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="bg-slate-900/50">
            <th className="px-6 py-5 text-xs font-bold tracking-widest text-slate-500 uppercase">
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
        <tbody className="divide-y divide-slate-800">
          {assets.map((asset) => (
            <AssetRow key={asset.id} asset={asset} />
          ))}
        </tbody>
      </table>

      <footer className="flex items-center justify-between bg-slate-900/30 px-6 py-4">
        <p className="text-xs font-medium text-slate-500">
          Showing 1 to 10 of 248 assets
        </p>
        <div className="flex gap-2">
          <button
            disabled
            className="rounded-lg bg-slate-800 p-2 text-slate-400 transition-colors hover:bg-slate-700 disabled:opacity-50"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="rounded-lg bg-slate-800 p-2 text-slate-200 transition-colors hover:bg-slate-700">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
