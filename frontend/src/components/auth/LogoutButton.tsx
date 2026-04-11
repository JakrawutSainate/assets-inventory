"use client";

import { LogOut } from "lucide-react";

export function LogoutButton() {
  return (
    <button
      type="button"
      className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
      onClick={() => {
        void (async () => {
          await fetch("/api/auth/logout", { method: "POST" });
          window.location.href = "/login";
        })();
      }}
    >
      <LogOut size={16} />
      <span>Logout</span>
    </button>
  );
}
