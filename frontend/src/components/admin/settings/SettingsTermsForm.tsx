"use client";

import { useState } from "react";

type SettingsTermsFormProps = {
  initialTerms: string;
};

export function SettingsTermsForm({ initialTerms }: SettingsTermsFormProps) {
  const [value, setValue] = useState(initialTerms);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function save() {
    setMessage(null);
    setPending(true);
    try {
      const res = await fetch("/api/admin/settings/terms", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ terms_and_conditions: value }),
      });
      if (!res.ok) {
        setMessage("Could not save. Try again.");
        setPending(false);
        return;
      }
      setMessage("Saved.");
      setPending(false);
    } catch {
      setMessage("Network error.");
      setPending(false);
    }
  }

  return (
    <section className="rounded-xl border border-slate-300/60 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
      <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-slate-100">Terms &amp; Conditions</h3>
      <textarea
        rows={8}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-slate-50 p-4 text-sm text-slate-700 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
      />
      <div className="mt-4 flex items-center gap-4">
        <button
          type="button"
          disabled={pending}
          onClick={() => void save()}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-indigo-500 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save terms"}
        </button>
        {message ? <span className="text-sm text-slate-600 dark:text-slate-400">{message}</span> : null}
      </div>
    </section>
  );
}
