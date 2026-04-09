import { Borrow } from "@/models/Borrow";
import { Asset } from "@/models/Asset";

type AdminRequestCardProps = {
  request: Borrow;
  asset: Asset;
};

export function AdminRequestCard({ request, asset }: AdminRequestCardProps) {
  return (
    <div className="grid grid-cols-12 gap-0">
      <div className="col-span-9 border-y border-l border-slate-700/30 bg-slate-800/20 p-8">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-widest text-slate-600">{request.type}</p>
        <h3 className="text-3xl font-bold tracking-tight text-white">{asset.name}</h3>
        <p className="mt-2 text-sm text-slate-400">{request.requestedAtLabel}</p>
      </div>
      <div className="col-span-3 flex flex-col justify-center gap-4 rounded-r-2xl border-y border-r border-slate-700/30 bg-slate-900/60 p-8">
        <button className="rounded-xl bg-gradient-to-br from-primary to-primary-container py-4 font-bold text-white">Approve</button>
        <button className="rounded-xl bg-slate-800 py-4 font-bold text-slate-300">Decline</button>
      </div>
    </div>
  );
}
