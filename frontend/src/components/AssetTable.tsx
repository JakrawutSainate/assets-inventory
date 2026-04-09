import { Asset } from "@/models/Asset";
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
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Asset Identity</th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Status</th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Category</th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Custodian</th>
            <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Value</th>
            <th className="px-6 py-5 text-right text-xs font-bold uppercase tracking-widest text-slate-500">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {assets.map((asset) => (
            <AssetRow key={asset.id} asset={asset} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
