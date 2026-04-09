import Image from "next/image";

import { UserLayout } from "@/components/layout/UserLayout";
import { GradientButton } from "@/components/ui/GradientButton";
import { PageIntro } from "@/components/ui/PageIntro";
import { AssetService } from "@/services/AssetService";
import { AuthService } from "@/services/AuthService";

export default async function UserDashboardPage() {
  const user = await AuthService.getCurrentUser();
  const assets = await AssetService.getAllAssets();

  return (
    <UserLayout active="browse" avatarUrl={user.avatarUrl}>
      <PageIntro
        className="mb-12"
        title="Explore Assets"
        description="Manage and request professional-grade equipment from our global custodial inventory."
      />

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {assets.map((asset) => (
          <article key={asset.id} className="rounded-xl bg-white p-4 shadow-[0_20px_40px_rgba(13,28,46,0.06)]">
            <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-slate-100">
              <Image src={asset.imageUrl} alt={asset.name} fill sizes="320px" className="object-cover" />
            </div>
            <div className="mb-4 flex items-start justify-between">
              <h3 className="font-bold">{asset.name}</h3>
              <span className="text-sm font-semibold text-indigo-700">$120/day</span>
            </div>
            <p className="mb-5 text-xs tracking-widest text-slate-500 uppercase">{asset.category}</p>
            <GradientButton className="w-full rounded-lg py-3 text-sm">
              Request Asset
            </GradientButton>
          </article>
        ))}
      </div>
    </UserLayout>
  );
}
