import { AdminRequestsList } from "@/components/admin/requests/AdminRequestsList";
import type { BorrowRequestRow } from "@/models/AdminApi";

type AdminRequestsContentProps = {
  requests: BorrowRequestRow[];
};

export function AdminRequestsContent({ requests }: AdminRequestsContentProps) {
  return (
    <>
      <header className="mb-16">
        <span className="mb-2 block text-xs font-semibold tracking-widest text-indigo-400 uppercase">
          System Queue
        </span>
        <h1 className="mb-3 text-5xl font-bold tracking-tighter text-slate-900 dark:text-slate-100">
          Pending Requests
        </h1>
        <p className="max-w-xl text-slate-600 dark:text-slate-400">
          Review and manage asset lifecycle transitions. Currently {requests.length} items require
          custodial oversight.
        </p>
      </header>

      <AdminRequestsList requests={requests} />
    </>
  );
}
