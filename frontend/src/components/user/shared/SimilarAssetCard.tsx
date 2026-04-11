import Link from "next/link";

import { RemoteAssetImage } from "@/components/ui/RemoteAssetImage";
import type { UserAsset } from "@/models/UserAsset";

type SimilarAssetCardProps = {
  asset: UserAsset;
};

export function SimilarAssetCard({ asset }: SimilarAssetCardProps) {
  return (
    <article>
      <Link href={`/asset/${asset.id}`} className="block">
        <div className="relative mb-4 aspect-video overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
          <RemoteAssetImage
            src={asset.imageUrl}
            alt={asset.name}
            fill
            sizes="360px"
            className="object-cover"
          />
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white">{asset.name}</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">{asset.category}</p>
      </Link>
    </article>
  );
}
