"use client";

import { useEffect, useState } from "react";

import { applyTheme, getPreferredTheme, type ThemeMode } from "@/components/theme/theme-utils";

export function AdminSettingsContent() {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  useEffect(() => {
    const mode = getPreferredTheme();
    setThemeMode(mode);
    applyTheme(mode);

    const storedMaintenance = window.localStorage.getItem("maintenance-mode") === "true";
    setMaintenanceMode(storedMaintenance);
  }, []);

  function handleThemeToggle() {
    const nextMode: ThemeMode = themeMode === "dark" ? "light" : "dark";
    setThemeMode(nextMode);
    applyTheme(nextMode);
  }

  function handleMaintenanceToggle() {
    const nextValue = !maintenanceMode;
    setMaintenanceMode(nextValue);
    window.localStorage.setItem("maintenance-mode", String(nextValue));
  }

  return (
    <>
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-black tracking-tighter text-slate-900 dark:text-slate-100">
          Platform Configuration
        </h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-400">
          Manage system-wide parameters, compliance documentation, and interface preferences for all
          custodial tiers.
        </p>
      </div>

      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 transition-colors duration-200 dark:border-slate-700 dark:bg-slate-900">
        <button
          type="button"
          onClick={() => {
            document.documentElement.classList.toggle("dark");
            console.log("TEST DARK");
            console.log("HTML CLASS:", document.documentElement.className);
          }}
          className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-900 dark:bg-slate-800 dark:text-white"
        >
          TEST DARK
        </button>
        <div className="mt-4 bg-white p-10 text-sm font-bold text-slate-900 dark:bg-green-500 dark:text-white">
          TEST COLOR
        </div>
      </div>

      <div className="grid grid-cols-12 gap-12 transition-colors duration-200">
        <div className="col-span-8 space-y-8">
          <section className="rounded-xl border border-slate-300/60 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-slate-100">
              Terms &amp; Conditions
            </h3>
            <textarea
              rows={8}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
              defaultValue="Users must treat all assets with care and report damage within 24 hours."
            />
          </section>
          <section className="grid grid-cols-2 gap-8">
            <button
              type="button"
              onClick={handleThemeToggle}
              className="flex items-center justify-between rounded-xl border border-slate-300/60 bg-white p-6 text-left transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
            >
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">Dark Mode</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Switch admin interface theme instantly
                </p>
              </div>
              <div
                className={[
                  "h-8 w-14 rounded-full p-1 transition-colors",
                  themeMode === "dark" ? "bg-indigo-600" : "bg-slate-300 dark:bg-slate-700",
                ].join(" ")}
              >
                <div
                  className={[
                    "h-6 w-6 rounded-full bg-white transition-transform",
                    themeMode === "dark" ? "translate-x-6" : "translate-x-0",
                  ].join(" ")}
                />
              </div>
            </button>
            <button
              type="button"
              onClick={handleMaintenanceToggle}
              className="flex items-center justify-between rounded-xl border border-slate-300/60 bg-white p-6 text-left transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
            >
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">Maintenance Mode</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {maintenanceMode ? "Enabled" : "Disabled"}
                </p>
              </div>
              <div
                className={[
                  "h-8 w-14 rounded-full p-1 transition-colors",
                  maintenanceMode ? "bg-amber-500" : "bg-slate-300 dark:bg-slate-700",
                ].join(" ")}
              >
                <div
                  className={[
                    "h-6 w-6 rounded-full bg-white transition-transform",
                    maintenanceMode ? "translate-x-6" : "translate-x-0",
                  ].join(" ")}
                />
              </div>
            </button>
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
