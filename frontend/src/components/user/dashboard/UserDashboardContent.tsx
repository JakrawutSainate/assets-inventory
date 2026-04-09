import { Asset } from "@/models/Asset";
import { UserAssetCard } from "@/components/user/dashboard/UserAssetCard";

type UserDashboardContentProps = {
  assets: Asset[];
};

export function UserDashboardContent({ assets }: UserDashboardContentProps) {
  return (
    <>
      <header className="mb-12">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-on-surface">Explore Assets</h1>
        <p className="max-w-2xl text-on-surface-variant">Manage and request professional-grade equipment from our global custodial inventory.</p>
      </header>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {assets.map((asset) => (
          <UserAssetCard key={asset.id} asset={asset} />
        ))}
      </div>
    </>
  );
}
