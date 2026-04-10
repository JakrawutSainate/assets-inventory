export function AdminReportsContent() {
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
            Monthly asset checkout frequency vs. returns
          </p>
          <div className="flex h-64 items-end gap-4 px-4">
            <div className="h-24 w-full rounded-t-sm bg-slate-200 dark:bg-slate-800" />
            <div className="h-32 w-full rounded-t-sm bg-slate-200 dark:bg-slate-800" />
            <div className="h-48 w-full rounded-t-sm bg-indigo-500" />
            <div className="h-40 w-full rounded-t-sm bg-slate-200 dark:bg-slate-800" />
            <div className="h-56 w-full rounded-t-sm bg-slate-200 dark:bg-slate-800" />
            <div className="h-36 w-full rounded-t-sm bg-slate-200 dark:bg-slate-800" />
            <div className="h-28 w-full rounded-t-sm bg-slate-200 dark:bg-slate-800" />
          </div>
        </div>
        <div className="col-span-4 rounded-xl bg-white p-8 shadow-[0_20px_40px_rgba(13,28,46,0.06)] dark:bg-slate-900 dark:shadow-none">
          <h3 className="mb-6 text-xl font-bold text-slate-900 dark:text-slate-100">Integrity Health</h3>
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                <span>Critical Malfunction</span>
                <span className="text-red-500">04</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-full w-[15%] bg-red-500" />
              </div>
            </div>
            <div>
              <div className="mb-2 flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                <span>Operational Wear</span>
                <span className="text-indigo-400">28</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-800">
                <div className="h-full w-[70%] bg-indigo-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
