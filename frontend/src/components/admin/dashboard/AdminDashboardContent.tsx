import type { Asset } from "@/models/Asset";
import type { Borrow } from "@/models/Borrow";

type AdminDashboardContentProps = {
  assets: Asset[];
  pending: Borrow[];
};

export function AdminDashboardContent({ assets, pending }: AdminDashboardContentProps) {
  return (
    <>
      <header className="mb-12 flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter">Systems Overview</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Real-time custody metrics and asset flow.
          </p>
        </div>
      </header>

      <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-white p-8 dark:bg-slate-900">
          <p className="mb-2 text-xs tracking-widest text-slate-500 uppercase">Total Assets</p>
          <h3 className="text-4xl font-black">{assets.length}</h3>
        </div>
        <div className="rounded-xl bg-white p-8 dark:bg-slate-900">
          <p className="mb-2 text-xs tracking-widest text-slate-500 uppercase">Pending Requests</p>
          <h3 className="text-4xl font-black">{pending.length}</h3>
        </div>
        <div className="rounded-xl bg-white p-8 dark:bg-slate-900">
          <p className="mb-2 text-xs tracking-widest text-slate-500 uppercase">Active Borrows</p>
          <h3 className="text-4xl font-black">3912</h3>
        </div>
      </section>

      <section className="rounded-xl bg-white p-8 dark:bg-slate-900">
        <h4 className="mb-6 text-xl font-bold">Top Performing Assets</h4>
        <div className="space-y-3">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="flex items-center justify-between rounded-lg bg-slate-100 px-4 py-3 dark:bg-slate-800/50"
            >
              <span className="font-semibold">{asset.name}</span>
              <span className="text-xs text-slate-500 uppercase">{asset.status}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
