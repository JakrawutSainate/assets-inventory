"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { GradientButton } from "@/components/ui/GradientButton";
import type { BorrowRequestRow } from "@/models/AdminApi";

type AdminRequestsListProps = {
  requests: BorrowRequestRow[];
};

export function AdminRequestsList({ requests: initial }: AdminRequestsListProps) {
  const router = useRouter();
  const [pending, setPending] = useState<string | null>(null);
  const [requests, setRequests] = useState(initial);

  useEffect(() => {
    setRequests(initial);
  }, [initial]);

  async function approve(id: string) {
    setPending(id);
    try {
      const res = await fetch(`/api/admin/borrow-requests/${id}/approve`, { method: "POST" });
      if (res.ok) {
        setRequests((r) => r.filter((x) => x.id !== id));
        router.refresh();
      }
    } finally {
      setPending(null);
    }
  }

  async function decline(id: string) {
    setPending(id);
    try {
      const res = await fetch(`/api/admin/borrow-requests/${id}/decline`, { method: "POST" });
      if (res.ok) {
        setRequests((r) => r.filter((x) => x.id !== id));
        router.refresh();
      }
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="space-y-8">
      {requests.map((request) => (
        <article key={request.id} className="grid grid-cols-12 overflow-hidden rounded-2xl">
          <div className="col-span-3 rounded-l-2xl border border-slate-300/40 bg-slate-100/80 p-8 dark:border-slate-700/30 dark:bg-slate-900/40">
            <p className="font-bold text-slate-900 dark:text-slate-100">{request.requester_name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Requestor</p>
          </div>
          <div className="col-span-6 border-y border-slate-300/40 bg-slate-200/40 p-8 dark:border-slate-700/30 dark:bg-slate-800/20">
            <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-[10px] font-bold text-indigo-500 uppercase">
              {request.request_type === "borrow" ? "Borrow" : request.request_type} Request
            </span>
            <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              {request.asset_name}
            </h3>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Asset ID: {request.asset_id}
            </p>
          </div>
          <div className="col-span-3 flex flex-col justify-center gap-4 rounded-r-2xl border border-slate-300/40 bg-slate-100 p-8 dark:border-slate-700/30 dark:bg-slate-900/60">
            <GradientButton
              type="button"
              className="rounded-xl px-6 py-4"
              disabled={pending === request.id}
              onClick={() => void approve(request.id)}
            >
              Approve
            </GradientButton>
            <button
              type="button"
              className="rounded-xl bg-slate-200 px-6 py-4 font-bold text-slate-700 disabled:opacity-60 dark:bg-slate-800 dark:text-slate-300"
              disabled={pending === request.id}
              onClick={() => void decline(request.id)}
            >
              Decline
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
