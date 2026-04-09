import { Asset } from "@/models/Asset";

type UserAssetCardProps = {
  asset: Asset;
};

export function UserAssetCard({ asset }: UserAssetCardProps) {
  return (
    <article className="flex flex-col rounded-xl bg-surface-container-lowest p-4">
      <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-surface-container">
        <img src={asset.imageUrl} alt={asset.name} className="h-full w-full object-cover" />
      </div>
      <h3 className="text-lg font-bold text-on-surface">{asset.name}</h3>
      <p className="mb-3 text-xs uppercase tracking-widest text-on-surface-variant">{asset.category}</p>
      <button className="mt-auto rounded-lg bg-gradient-to-br from-primary to-primary-container py-3 text-sm font-bold text-white">
        Request Asset
      </button>
    </article>
  );
}
