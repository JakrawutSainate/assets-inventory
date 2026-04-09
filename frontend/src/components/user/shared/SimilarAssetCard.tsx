import Image from "next/image";
import Link from "next/link";

import type { UserAsset } from "@/services/AssetService";

type SimilarAssetCardProps = {
  asset: UserAsset;
};

export function SimilarAssetCard({ asset }: SimilarAssetCardProps) {
  return (
    <article>
      <Link href={`/asset/${asset.id}`} className="block">
        <div className="relative mb-4 aspect-video overflow-hidden rounded-xl bg-slate-100">
          <Image src={asset.imageUrl} alt={asset.name} fill sizes="360px" className="object-cover" />
        </div>
        <h3 className="font-bold text-slate-900">{asset.name}</h3>
        <p className="text-xs text-slate-500">{asset.category}</p>
      </Link>
    </article>
  );
}
