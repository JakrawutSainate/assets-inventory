import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { AssetStatusBadge } from "@/components/user/shared/AssetStatusBadge";
import type { UserAsset } from "@/services/AssetService";

type UserAssetCardProps = {
  asset: UserAsset;
};

export function UserAssetCard({ asset }: UserAssetCardProps) {
  return (
    <article className="flex flex-col rounded-xl bg-white p-4 shadow-[0_20px_40px_rgba(13,28,46,0.06)] transition-colors duration-200 dark:bg-slate-900 dark:shadow-none">
      <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
        <Image src={asset.imageUrl} alt={asset.name} fill sizes="320px" className="object-cover" />
        <div className="absolute top-3 right-3">
          <AssetStatusBadge status={asset.status} />
        </div>
      </div>
      <div className="mb-4 flex items-start justify-between gap-3">
        <h3 className="text-[1.75rem] leading-tight font-bold text-slate-900 dark:text-white">
          {asset.name}
        </h3>
        <span className="text-sm font-semibold text-indigo-700">${asset.dailyRateUsd}/day</span>
      </div>
      <p className="mb-4 text-xs tracking-[0.2em] text-slate-500 uppercase">{asset.category}</p>
      <div className="mb-6 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
        <MapPin size={14} />
        <span>{asset.locationLabel}</span>
      </div>
      <Link
        href={`/asset/${asset.id}`}
        className="w-full rounded-lg bg-linear-to-br from-indigo-700 to-indigo-500 py-3 text-center text-sm font-bold text-white"
      >
        {asset.actionLabel}
      </Link>
    </article>
  );
}
