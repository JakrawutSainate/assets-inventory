import Image from "next/image";
import { notFound } from "next/navigation";

import { UserLayout } from "@/components/layout/UserLayout";
import { GradientButton } from "@/components/ui/GradientButton";
import { AssetService } from "@/services/AssetService";
import { AuthService } from "@/services/AuthService";

type AssetDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AssetDetailPage({ params }: AssetDetailPageProps) {
  const { id } = await params;
  const user = await AuthService.getCurrentUser();
  const assets = await AssetService.getAllAssets();
  const asset = assets.find((item) => item.id === id) ?? assets[0];

  if (!asset) {
    notFound();
  }

  return (
    <UserLayout active="browse" avatarUrl={user.avatarUrl}>
      <div className="mb-8 flex items-center gap-2">
        <button className="flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-indigo-600">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Inventory
        </button>
      </div>

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <section className="space-y-8 lg:col-span-7">
          <div className="aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
            <Image src={asset.imageUrl} alt={asset.name} width={900} height={700} className="h-full w-full object-cover" />
          </div>
          <div>
            <span className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase">
              Available Now
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight">{asset.name}</h1>
            <p className="mt-2 text-sm text-slate-500">Serial: {asset.serialNumber}</p>
          </div>
        </section>

        <aside className="sticky top-24 rounded-xl border border-slate-200 bg-white p-8 shadow-[0_20px_40px_rgba(13,28,46,0.06)] lg:col-span-5">
          <h2 className="mb-6 text-xl font-bold">Request Borrowing</h2>
          <form className="space-y-5">
            <input className="w-full rounded-lg border bg-slate-50 p-4 text-sm" defaultValue="Friday, Nov 24, 2023" />
            <select className="w-full rounded-lg border bg-slate-50 p-4 text-sm">
              <option>Main Office Hub</option>
            </select>
            <input className="w-full rounded-lg border bg-slate-50 p-4 text-sm" placeholder="Project reference" />
            <GradientButton className="flex w-full items-center justify-center gap-2 rounded-lg py-4">
              <span className="material-symbols-outlined">sync_alt</span>
              Borrow Asset
            </GradientButton>
          </form>
        </aside>
      </div>
    </UserLayout>
  );
}
