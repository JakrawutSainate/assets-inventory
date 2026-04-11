import { RemoteAssetImage } from "@/components/ui/RemoteAssetImage";
import type { Asset } from "@/models/Asset";

type TopPerformingAssetRowProps = {
  asset: Asset;
  statusLabel: string;
  utilizationPercent: number;
};

export function TopPerformingAssetRow({
  asset,
  statusLabel,
  utilizationPercent,
}: TopPerformingAssetRowProps) {
  return (
    <tr className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30">
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800">
            <RemoteAssetImage
              src={asset.imageUrl}
              alt={asset.name}
              fill
              sizes="48px"
              className="object-cover"
            />
          </div>
          <div>
            <h6 className="text-sm font-bold">{asset.name}</h6>
            <p className="font-mono text-xs text-slate-500">SN: {asset.serialNumber}</p>
          </div>
        </div>
      </td>
      <td className="px-8 py-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-500 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {statusLabel}
        </span>
      </td>
      <td className="px-8 py-6">
        <div className="flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-full rounded-full bg-indigo-500"
              style={{ width: `${utilizationPercent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
            {utilizationPercent}%
          </span>
        </div>
      </td>
      <td className="px-8 py-6 text-right">
        <button className="text-slate-500 transition-colors hover:text-indigo-400">•••</button>
      </td>
    </tr>
  );
}
