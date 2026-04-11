import type { MonthlyFlowPoint } from "@/models/AdminApi";

type UtilizationChartCardProps = {
  monthly: MonthlyFlowPoint[];
};

export function UtilizationChartCard({ monthly }: UtilizationChartCardProps) {
  const max = Math.max(1, ...monthly.map((m) => m.checkouts));
  const peakIdx = monthly.reduce(
    (best, m, i, arr) => (m.checkouts > arr[best].checkouts ? i : best),
    0,
  );

  return (
    <div className="rounded-xl bg-white p-8 shadow-[0_20px_40px_rgba(13,28,46,0.06)] lg:col-span-2 dark:bg-slate-900 dark:shadow-none">
      <div className="mb-8 flex items-center justify-between">
        <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">Asset Utilization Flow</h4>
        <div className="flex gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-400">
          <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">Checkouts (monthly)</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">Returns: see table</span>
        </div>
      </div>
      <div className="flex h-64 items-end gap-2 px-2">
        {monthly.map((m, i) => {
          const pct = (m.checkouts / max) * 100;
          const isPeak = i === peakIdx;
          return (
            <div key={`${m.year}-${m.month}`} className="flex min-w-0 flex-1 flex-col items-center gap-2">
              <div
                className={[
                  "w-full rounded-t-sm transition-colors",
                  isPeak ? "bg-indigo-500" : "bg-slate-200 dark:bg-slate-800",
                ].join(" ")}
                style={{ height: `${Math.max(pct, 6)}%` }}
                title={`${m.label}: ${m.checkouts} checkouts, ${m.returns_count} returns`}
              />
              <span className="truncate text-[10px] text-slate-500 dark:text-slate-400">{m.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
