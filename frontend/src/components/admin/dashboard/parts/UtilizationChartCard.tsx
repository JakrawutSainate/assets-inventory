export function UtilizationChartCard() {
  return (
    <div className="rounded-xl bg-white p-8 shadow-[0_20px_40px_rgba(13,28,46,0.06)] lg:col-span-2 dark:bg-slate-900 dark:shadow-none">
      <div className="mb-8 flex items-center justify-between">
        <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">Asset Utilization Flow</h4>
        <div className="flex gap-2 text-[10px] font-bold text-slate-500 dark:text-slate-400">
          <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
            Utilization
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">
            Availability
          </span>
        </div>
      </div>
      <div className="h-72 w-full rounded-xl bg-slate-50 p-4 dark:bg-slate-950">
        <svg className="h-full w-full overflow-visible" viewBox="0 0 800 300">
          <line stroke="#334155" strokeDasharray="4" x1="0" x2="800" y1="50" y2="50" />
          <line stroke="#334155" strokeDasharray="4" x1="0" x2="800" y1="150" y2="150" />
          <line stroke="#334155" strokeDasharray="4" x1="0" x2="800" y1="250" y2="250" />
          <defs>
            <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity="0.3" />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,250 C100,220 200,280 300,180 C400,80 500,120 600,100 C700,80 800,150 800,150 V300 H0 Z" fill="url(#areaGradient)" />
          <path d="M0,250 C100,220 200,280 300,180 C400,80 500,120 600,100 C700,80 800,150" fill="none" stroke="#6366f1" strokeLinecap="round" strokeWidth="4" />
          <circle cx="300" cy="180" fill="#6366f1" r="6" stroke="#0f172a" strokeWidth="2" />
          <circle cx="600" cy="100" fill="#6366f1" r="6" stroke="#0f172a" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}
