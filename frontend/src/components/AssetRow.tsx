import { Asset } from "@/models/Asset";

type AssetRowProps = {
  asset: Asset;
};

export function AssetRow({ asset }: AssetRowProps) {
  return (
    <tr className="group transition-colors hover:bg-slate-900/30">
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 overflow-hidden rounded-lg bg-slate-800">
            <img className="h-full w-full object-cover" src={asset.imageUrl} alt={asset.name} />
          </div>
          <div>
            <p className="font-bold tracking-tight text-slate-100">{asset.name}</p>
            <p className="text-xs text-slate-500">SN: {asset.serial}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-5 text-sm text-slate-300">{asset.status}</td>
      <td className="px-6 py-5 text-sm text-slate-400">{asset.category}</td>
      <td className="px-6 py-5 text-sm text-slate-300">{asset.custodian ?? "—"}</td>
      <td className="px-6 py-5 font-mono text-sm text-slate-100">{asset.valueLabel}</td>
      <td className="px-6 py-5 text-right text-slate-500">...</td>
    </tr>
  );
}
