import type { UserAsset } from "@/services/AssetService";

import { UserAssetCard } from "@/components/user/dashboard/UserAssetCard";

type UserDashboardContentProps = {
  assets: UserAsset[];
};

export function UserDashboardContent({ assets }: UserDashboardContentProps) {
  return (
    <>
      <header className="mb-12">
        <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-slate-900">Explore Assets</h1>
        <p className="max-w-2xl text-lg text-slate-600">
          Manage and request professional-grade equipment from our global custodial inventory with high-end precision.
        </p>
      </header>

      <div className="mb-12 flex flex-wrap gap-3">
        <button className="rounded-full bg-gradient-to-br from-indigo-700 to-indigo-500 px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20">
          All Assets
        </button>
        <button className="rounded-full bg-slate-100 px-6 py-2 text-sm font-medium text-slate-700">Production</button>
        <button className="rounded-full bg-slate-100 px-6 py-2 text-sm font-medium text-slate-700">Computing</button>
        <button className="rounded-full bg-slate-100 px-6 py-2 text-sm font-medium text-slate-700">Logistics</button>
      </div>

      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {assets.map((asset) => (
          <UserAssetCard key={asset.id} asset={asset} />
        ))}
      </section>
    </>
  );
}
