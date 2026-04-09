import { AdminLayout } from "@/components/layout/AdminLayout";
import { BorrowService } from "@/services/BorrowService";

export default async function AdminRequestsPage() {
  const requests = await BorrowService.getPendingRequests();

  return (
    <AdminLayout active="requests">
      <header className="mb-16">
        <span className="mb-2 block text-xs font-semibold tracking-widest text-indigo-400 uppercase">
          System Queue
        </span>
        <h1 className="mb-3 text-5xl font-bold tracking-tighter text-white">Pending Requests</h1>
        <p className="max-w-xl text-slate-400">
          Review and manage asset lifecycle transitions. Currently {requests.length} items require custodial oversight.
        </p>
      </header>

      <div className="space-y-8">
        {requests.map((request) => (
          <article key={request.id} className="grid grid-cols-12">
            <div className="col-span-3 rounded-l-2xl border border-slate-700/30 bg-slate-900/40 p-8">
              <p className="font-bold text-white">{request.borrowerName}</p>
              <p className="text-xs text-slate-500">Requestor</p>
            </div>
            <div className="col-span-6 border-y border-slate-700/30 bg-slate-800/20 p-8">
              <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-[10px] font-bold text-indigo-400 uppercase">
                Borrow Request
              </span>
              <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">{request.assetName}</h3>
              <p className="mt-3 text-sm text-slate-400">Asset ID: {request.assetId}</p>
            </div>
            <div className="col-span-3 flex flex-col justify-center gap-4 rounded-r-2xl border border-slate-700/30 bg-slate-900/60 p-8">
              <button className="rounded-xl bg-gradient-to-br from-indigo-700 to-indigo-500 px-6 py-4 font-bold text-white">
                Approve
              </button>
              <button className="rounded-xl bg-slate-800 px-6 py-4 font-bold text-slate-300">Decline</button>
            </div>
          </article>
        ))}
      </div>
    </AdminLayout>
  );
}
