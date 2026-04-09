import type { ReactNode } from "react";

type StatsCardProps = {
  label: string;
  value: string;
  detail: ReactNode;
};

export function StatsCard({ label, value, detail }: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800/50 dark:bg-slate-900/40">
      <p className="mb-4 text-xs font-bold tracking-widest text-slate-500 uppercase">
        {label}
      </p>
      <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        {value}
      </h3>
      <div className="mt-2">{detail}</div>
    </div>
  );
}
