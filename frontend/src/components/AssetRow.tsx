import { Pencil, Trash2 } from "lucide-react";

import type { Asset } from "@/models/Asset";
import { RemoteAssetImage } from "@/components/ui/RemoteAssetImage";

type AssetRowProps = {
  asset: Asset;
};

const statusClassMap: Record<Asset["status"], string> = {
  assigned: "border-indigo-500/30 bg-indigo-900/40 text-indigo-300",
  available: "border-emerald-500/30 bg-green-950/40 text-emerald-400",
  maintenance: "border-orange-500/30 bg-orange-950/40 text-orange-400",
};

function formatCurrency(valueUsd: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(valueUsd);
}

export function AssetRow({ asset }: AssetRowProps) {
  const hasImage = asset.imageUrl.trim().length > 0;

  return (
    <tr className="group transition-colors hover:bg-slate-100 dark:hover:bg-slate-900/30">
      <td className="px-6 py-5">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-800">
            {hasImage ? (
              <RemoteAssetImage
                src={asset.imageUrl}
                alt=""
                fill
                sizes="48px"
                className="object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center text-[10px] font-bold text-slate-500">
                —
              </span>
            )}
          </div>
          <div>
            <p className="font-bold tracking-tight text-slate-900 dark:text-slate-100">{asset.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-500">SN: {asset.serialNumber}</p>
          </div>
        </div>
      </td>

      <td className="px-6 py-5">
        <span
          className={[
            "rounded-full border px-3 py-1 text-[10px] font-bold tracking-wider uppercase",
            statusClassMap[asset.status],
          ].join(" ")}
        >
          {asset.status}
        </span>
      </td>

      <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-400">{asset.category}</td>

      <td className="px-6 py-5">
        {asset.custodianName ? (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-slate-300 dark:bg-slate-800" />
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">{asset.custodianName}</p>
          </div>
        ) : (
          <p className="text-sm text-slate-600">-</p>
        )}
      </td>

      <td className="px-6 py-5 font-mono text-sm text-slate-900 dark:text-slate-100">
        {formatCurrency(asset.valueUsd)}
      </td>

      <td className="px-6 py-5 text-right">
        <div className="flex items-center justify-end gap-3 opacity-0 transition-opacity group-hover:opacity-100">
          <button className="p-2 text-slate-500 transition-colors hover:text-indigo-500 dark:hover:text-indigo-300">
            <Pencil size={16} />
          </button>
          <button className="p-2 text-slate-500 transition-colors hover:text-red-500">
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
