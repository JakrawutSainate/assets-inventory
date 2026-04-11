"use client";

import { useEffect, useRef, useState } from "react";

import { applyTheme, getPreferredTheme, type ThemeMode } from "@/components/theme/theme-utils";
import type { PlatformSettings } from "@/models/AdminApi";

type AdminSettingsContentProps = {
  settings: PlatformSettings;
};

function formatBackup(iso: string | null): string {
  if (!iso) {
    return "—";
  }
  return formatRelativeTimeShort(iso);
}

function formatRelativeTimeShort(iso: string): string {
  const d = new Date(iso);
  const diffMs = Date.now() - d.getTime();
  const min = Math.floor(diffMs / 60000);
  if (min < 60) {
    return `${min}m ago`;
  }
  const hr = Math.floor(min / 60);
  if (hr < 48) {
    return `${hr}h ago`;
  }
  return d.toLocaleDateString();
}

export function AdminSettingsContent({ settings: initial }: AdminSettingsContentProps) {
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");
  const [terms, setTerms] = useState(initial.terms_text);
  const [maintenanceMode, setMaintenanceMode] = useState(initial.maintenance_mode);
  const [saving, setSaving] = useState(false);
  const lastSyncedTerms = useRef(initial.terms_text);

  useEffect(() => {
    const mode = getPreferredTheme();
    setThemeMode(mode);
    applyTheme(mode);
  }, []);

  useEffect(() => {
    setTerms(initial.terms_text);
    setMaintenanceMode(initial.maintenance_mode);
    lastSyncedTerms.current = initial.terms_text;
  }, [initial.terms_text, initial.maintenance_mode]);

  async function patchSettings(body: { terms_text?: string; maintenance_mode?: boolean }) {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        return;
      }
      const next = (await res.json()) as PlatformSettings;
      setTerms(next.terms_text);
      lastSyncedTerms.current = next.terms_text;
      setMaintenanceMode(next.maintenance_mode);
    } finally {
      setSaving(false);
    }
  }

  function handleThemeToggle() {
    const nextMode: ThemeMode = themeMode === "dark" ? "light" : "dark";
    setThemeMode(nextMode);
    applyTheme(nextMode);
  }

  async function handleMaintenanceToggle() {
    const nextValue = !maintenanceMode;
    setMaintenanceMode(nextValue);
    await patchSettings({ maintenance_mode: nextValue });
  }

  async function handleTermsBlur() {
    if (terms === lastSyncedTerms.current) {
      return;
    }
    await patchSettings({ terms_text: terms });
  }

  return (
    <>
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-black tracking-tighter text-slate-900 dark:text-slate-100">
          Platform Configuration
        </h1>
        <p className="max-w-2xl text-slate-600 dark:text-slate-400">
          Manage system-wide parameters, compliance documentation, and interface preferences for all custodial
          tiers. Terms and maintenance mode are stored in the database.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-12 transition-colors duration-200">
        <div className="col-span-8 space-y-8">
          <section className="rounded-xl border border-slate-300/60 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-slate-100">
              Terms &amp; Conditions
            </h3>
            <textarea
              rows={8}
              value={terms}
              disabled={saving}
              onChange={(e) => setTerms(e.target.value)}
              onBlur={() => void handleTermsBlur()}
              className="w-full rounded-lg border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
            />
            <p className="mt-2 text-xs text-slate-500">Blur the field to save to the server.</p>
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
                  Switch admin interface theme instantly (local)
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
              onClick={() => void handleMaintenanceToggle()}
              disabled={saving}
              className="flex items-center justify-between rounded-xl border border-slate-300/60 bg-white p-6 text-left transition-colors hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800"
            >
              <div>
                <p className="font-bold text-slate-900 dark:text-slate-100">Maintenance Mode</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {maintenanceMode ? "Enabled (database)" : "Disabled (database)"}
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
              <span className="font-mono text-slate-900 dark:text-white">{initial.core_version}</span>
            </li>
            <li className="flex justify-between">
              <span>Database Latency</span>
              <span className="font-mono text-green-500">{initial.database_latency_ms}ms</span>
            </li>
            <li className="flex justify-between">
              <span>Last Backup</span>
              <span className="text-slate-900 dark:text-white">{formatBackup(initial.last_backup_at)}</span>
            </li>
          </ul>
        </aside>
      </div>
    </>
  );
}
