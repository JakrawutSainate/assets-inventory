import { RecentHandlerItem } from "@/components/admin/dashboard/parts/RecentHandlerItem";
import type { RecentHandler } from "@/components/admin/dashboard/parts/types";

type RecentHandlersCardProps = {
  handlers: RecentHandler[];
};

export function RecentHandlersCard({ handlers }: RecentHandlersCardProps) {
  return (
    <div className="rounded-xl bg-white p-8 shadow-[0_20px_40px_rgba(13,28,46,0.06)] dark:bg-slate-900 dark:shadow-none">
      <h4 className="mb-8 text-xl font-bold text-slate-900 dark:text-slate-100">Recent Handlers</h4>
      <div className="flex flex-1 flex-col gap-6">
        {handlers.map((handler) => (
          <RecentHandlerItem key={handler.id} handler={handler} />
        ))}
      </div>
      <button className="mt-8 w-full rounded-lg bg-slate-100 py-3 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700">
        View Audit Trail
      </button>
    </div>
  );
}
