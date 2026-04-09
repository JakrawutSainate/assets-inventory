import { Asset } from "@/models/Asset";

type AssetDetailsContentProps = {
  asset: Asset;
};

export function AssetDetailsContent({ asset }: AssetDetailsContentProps) {
  return (
    <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
      <section className="space-y-8 lg:col-span-7">
        <div className="aspect-[4/3] overflow-hidden rounded-xl bg-surface-container-low">
          <img src={asset.imageUrl} alt={asset.name} className="h-full w-full object-cover" />
        </div>
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">{asset.name}</h1>
          <p className="text-on-surface-variant">Serial: {asset.serial}</p>
        </div>
      </section>
      <aside className="rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-8 lg:col-span-5">
        <h2 className="mb-6 text-xl font-bold tracking-tight">Request Borrowing</h2>
        <form className="space-y-4">
          <input className="w-full rounded-lg bg-surface-container-low p-4" placeholder="Select return date..." />
          <select className="w-full rounded-lg bg-surface-container-low p-4">
            <option>Main Office Hub</option>
          </select>
          <button className="w-full rounded-lg bg-gradient-to-br from-primary to-primary-container py-4 font-bold text-white">Borrow Asset</button>
        </form>
      </aside>
    </div>
  );
}
