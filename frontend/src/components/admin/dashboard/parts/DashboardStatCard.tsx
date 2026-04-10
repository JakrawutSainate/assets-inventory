import type { ReactNode } from "react";

type DashboardStatCardProps = {
  label: string;
  value: string;
  trend: ReactNode;
};

export function DashboardStatCard({ label, value, trend }: DashboardStatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white p-8 shadow-[0_20px_40px_rgba(13,28,46,0.06)] dark:bg-slate-900 dark:shadow-none">
      <p className="mb-2 text-xs tracking-widest text-slate-500 uppercase dark:text-slate-400">
        {label}
      </p>
      <h3 className="mb-4 text-4xl font-black text-slate-900 dark:text-slate-100">{value}</h3>
      {trend}
    </div>
  );
}
