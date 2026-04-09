import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, ChevronDown, Info, Repeat2 } from "lucide-react";

import { AssetSpecCard } from "@/components/user/shared/AssetSpecCard";
import { SimilarAssetCard } from "@/components/user/shared/SimilarAssetCard";
import type { UserAsset } from "@/services/AssetService";

type AssetDetailsContentProps = {
  asset: UserAsset;
  similarAssets: UserAsset[];
};

export function AssetDetailsContent({ asset, similarAssets }: AssetDetailsContentProps) {
  return (
    <>
      <div className="mb-8 flex items-center gap-2">
        <Link href="/dashboard" className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-indigo-600">
          <ArrowLeft size={14} />
          Back to Inventory
        </Link>
      </div>

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <section className="space-y-8 lg:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
            <Image src={asset.imageUrl} alt={asset.name} fill sizes="900px" className="object-cover" />
            <div className="absolute bottom-6 left-8 max-w-md rounded-xl bg-white p-6 shadow-[0_20px_40px_rgba(13,28,46,0.06)]">
              <span className="mb-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase">Available Now</span>
              <h1 className="text-[2.25rem] leading-none font-extrabold tracking-tight text-slate-900">{asset.name}</h1>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <AssetSpecCard label="Category" value={asset.category} />
            <AssetSpecCard label="Condition" value="Mint / Grade A" />
            <AssetSpecCard label="Location" value="North Wing" />
            <AssetSpecCard label="Owner" value="IT Operations" />
          </div>
        </section>

        <aside className="sticky top-24 rounded-xl border border-slate-200 bg-white p-8 shadow-[0_20px_40px_rgba(13,28,46,0.06)] lg:col-span-5">
          <h2 className="mb-6 text-xl font-bold text-slate-900">Request Borrowing</h2>
          <form className="space-y-5">
            <div className="relative">
              <input className="w-full rounded-lg border bg-slate-50 p-4 text-sm" defaultValue="Friday, Nov 24, 2023" />
              <CalendarDays size={16} className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-500" />
            </div>
            <div className="relative">
              <select className="w-full appearance-none rounded-lg border bg-slate-50 p-4 text-sm">
                <option>Main Office Hub</option>
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-slate-500" />
            </div>
            <input className="w-full rounded-lg border bg-slate-50 p-4 text-sm" placeholder="e.g. Q4 Marketing Video" />
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-indigo-700 to-indigo-500 py-4 font-bold text-white">
              <Repeat2 size={16} />
              Borrow Asset
            </button>
          </form>
          <div className="mt-6 flex gap-4 rounded-xl border border-indigo-100 bg-indigo-50 p-6">
            <Info size={16} className="mt-0.5 text-indigo-600" />
            <div>
              <p className="text-sm font-bold text-slate-900">Asset Policy</p>
              <p className="text-xs text-slate-600">Maximum borrowing period for this category is 14 business days.</p>
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-24">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-[1.375rem] font-bold tracking-tight text-slate-900">Similar Assets</h2>
            <p className="text-sm text-slate-500">Recommended computing alternatives</p>
          </div>
          <button className="text-sm font-bold text-indigo-700 hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {similarAssets.map((item) => (
            <SimilarAssetCard key={item.id} asset={item} />
          ))}
        </div>
      </section>
    </>
  );
}
