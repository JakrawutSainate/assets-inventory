import type { ReportsResponse } from "@/models/AdminApi";

type AdminReportsContentProps = {
  reports: ReportsResponse;
};

export function AdminReportsContent({ reports }: AdminReportsContentProps) {
  const { monthly, integrity } = reports;
  const max = Math.max(1, ...monthly.map((m) => Math.max(m.checkouts, m.returns_count)));
  const peakIdx = monthly.reduce(
    (best, m, i, arr) => (m.checkouts > arr[best].checkouts ? i : best),
    0,
  );

  const crit = integrity.critical_malfunction_count;
  const wear = integrity.operational_wear_count;
  const total = Math.max(1, crit + wear);
  const critPct = (crit / total) * 100;
  const wearPct = (wear / total) * 100;

  return (
    <>
      <header className="mb-16 flex items-end justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-indigo-400 uppercase">
            Executive Intelligence
          </p>
          <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-slate-100">
            System Reports
          </h1>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 rounded-xl bg-white p-8 shadow-[0_20px_40px_rgba(13,28,46,0.06)] dark:bg-slate-900 dark:shadow-none">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Utilization Velocity</h3>
          <p className="mb-8 text-sm text-slate-500 dark:text-slate-400">
            Monthly asset checkout frequency vs. returns (from database)
          </p>
          <div className="flex h-64 items-end gap-3 px-4">
            {monthly.map((m, i) => {
              const ch = (m.checkouts / max) * 100;
              const rt = (m.returns_count / max) * 100;
              const isPeak = i === peakIdx;
              return (
                <div key={`${m.year}-${m.month}`} className="flex min-w-0 flex-1 flex-col items-center gap-2">
                  <div className="flex h-56 w-full items-end justify-center gap-1">
                    <div
                      className="w-1/2 rounded-t-sm bg-slate-200 dark:bg-slate-800"
                      style={{ height: `${Math.max(rt, 4)}%` }}
                      title={`Returns: ${m.returns_count}`}
                    />
                    <div
                      className={[
                        "w-1/2 rounded-t-sm",
                        isPeak ? "bg-indigo-500" : "bg-indigo-400/70",
                      ].join(" ")}
                      style={{ height: `${Math.max(ch, 4)}%` }}
                      title={`Checkouts: ${m.checkouts}`}
                    />
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">{m.label}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="col-span-4 rounded-xl bg-white p-8 shadow-[0_20px_40px_rgba(13,28,46,0.06)] dark:bg-slate-900 dark:shadow-none">
          <h3 className="mb-6 text-xl font-bold text-slate-900 dark:text-slate-100">Integrity Health</h3>
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                <span>Critical Malfunction</span>
                <span className="text-red-500">{String(crit).padStart(2, "0")}</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-full bg-red-500" style={{ width: `${critPct}%` }} />
              </div>
              <p className="mt-1 text-[10px] text-slate-500">Assets in maintenance</p>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                <span>Operational Wear</span>
                <span className="text-indigo-400">{String(wear).padStart(2, "0")}</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-full bg-indigo-400" style={{ width: `${wearPct}%` }} />
              </div>
              <p className="mt-1 text-[10px] text-slate-500">Assigned or available</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
