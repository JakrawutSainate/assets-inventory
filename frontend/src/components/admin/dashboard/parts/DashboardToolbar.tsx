import { CalendarDays, Download } from "lucide-react";

export function DashboardToolbar() {
  return (
    <div className="flex gap-4">
      <button className="flex items-center gap-2 rounded-lg bg-indigo-100 px-6 py-2.5 text-sm font-bold text-indigo-700 transition-colors hover:bg-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300 dark:hover:bg-indigo-900/60">
        <CalendarDays size={16} />
        Last 30 Days
      </button>
      <button className="flex items-center gap-2 rounded-lg bg-gradient-to-br from-indigo-700 to-indigo-500 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20">
        <Download size={16} />
        Download Report
      </button>
    </div>
  );
}
