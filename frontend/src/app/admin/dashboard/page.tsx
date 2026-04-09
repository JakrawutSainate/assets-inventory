import { AdminLayout } from "@/components/layout/AdminLayout";
import { AssetService } from "@/services/AssetService";
import { BorrowService } from "@/services/BorrowService";

export default async function AdminDashboardPage() {
  const assets = await AssetService.getAllAssets();
  const pending = await BorrowService.getPendingRequests();

  return (
    <AdminLayout active="dashboard">
      <header className="mb-12 flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter">Systems Overview</h1>
          <p className="text-sm text-slate-400">Real-time custody metrics and asset flow.</p>
        </div>
      </header>

      <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-slate-900 p-8">
          <p className="mb-2 text-xs tracking-widest text-slate-400 uppercase">Total Assets</p>
          <h3 className="text-4xl font-black">{assets.length}</h3>
        </div>
        <div className="rounded-xl bg-slate-900 p-8">
          <p className="mb-2 text-xs tracking-widest text-slate-400 uppercase">Pending Requests</p>
          <h3 className="text-4xl font-black">{pending.length}</h3>
        </div>
        <div className="rounded-xl bg-slate-900 p-8">
          <p className="mb-2 text-xs tracking-widest text-slate-400 uppercase">Active Borrows</p>
          <h3 className="text-4xl font-black">3912</h3>
        </div>
      </section>

      <section className="rounded-xl bg-slate-900 p-8">
        <h4 className="mb-6 text-xl font-bold">Top Performing Assets</h4>
        <div className="space-y-3">
          {assets.map((asset) => (
            <div
              key={asset.id}
              className="flex items-center justify-between rounded-lg bg-slate-800/50 px-4 py-3"
            >
              <span className="font-semibold">{asset.name}</span>
              <span className="text-xs uppercase text-slate-400">{asset.status}</span>
            </div>
          ))}
        </div>
      </section>
    </AdminLayout>
  );
}
