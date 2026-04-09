export function AdminSettingsContent() {
  return (
    <>
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-black tracking-tighter">Platform Configuration</h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-400">
          Manage system-wide parameters, compliance documentation, and interface preferences for all
          custodial tiers.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-12">
        <div className="col-span-8 space-y-8">
          <section className="rounded-xl border border-slate-300/60 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 text-lg font-bold">Terms &amp; Conditions</h3>
            <textarea
              rows={8}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
              defaultValue="Users must treat all assets with care and report damage within 24 hours."
            />
          </section>
          <section className="grid grid-cols-2 gap-8">
            <div className="flex items-center justify-between rounded-xl border border-slate-300/60 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <div>
                <p className="font-bold">Dark Mode</p>
                <p className="text-xs text-slate-500">Currently active across admin dashboard</p>
              </div>
              <div className="h-8 w-14 rounded-full bg-indigo-600 p-1">
                <div className="ml-auto h-6 w-6 rounded-full bg-white" />
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-slate-300/60 bg-white p-6 opacity-60 dark:border-slate-800 dark:bg-slate-900">
              <div>
                <p className="font-bold">Maintenance Mode</p>
                <p className="text-xs text-slate-500">Restricts user checkout access</p>
              </div>
              <div className="h-8 w-14 rounded-full bg-slate-700 p-1">
                <div className="h-6 w-6 rounded-full bg-slate-400" />
              </div>
            </div>
          </section>
        </div>
        <aside className="col-span-4 rounded-xl border border-indigo-500/10 bg-indigo-100/30 p-8 dark:bg-indigo-900/10">
          <h4 className="mb-4 font-bold text-indigo-700 dark:text-indigo-300">System Health</h4>
          <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
            <li className="flex justify-between">
              <span>Core Version</span>
              <span className="font-mono text-slate-900 dark:text-white">v4.8.2-stable</span>
            </li>
            <li className="flex justify-between">
              <span>Database Latency</span>
              <span className="font-mono text-green-500">14ms</span>
            </li>
            <li className="flex justify-between">
              <span>Last Backup</span>
              <span className="text-slate-900 dark:text-white">2h 14m ago</span>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
}
