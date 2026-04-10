"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { applyTheme, getPreferredTheme, type ThemeMode } from "@/components/theme/theme-utils";

type ThemeToggleProps = {
  className?: string;
  showLabel?: boolean;
};

export function ThemeToggle({ className, showLabel = true }: ThemeToggleProps) {
  const [mode, setMode] = useState<ThemeMode>("light");

  useEffect(() => {
    const preferredMode = getPreferredTheme();
    setMode(preferredMode);
    applyTheme(preferredMode);
  }, []);

  useEffect(() => {
    applyTheme(mode);
  }, [mode]);

  function handleToggle() {
    const nextMode: ThemeMode = mode === "dark" ? "light" : "dark";
    setMode(nextMode);
    applyTheme(nextMode);
    console.log("TOGGLE CLICKED", nextMode);
    console.log("HTML CLASS:", document.documentElement.className);
    console.log(document.documentElement.outerHTML);
    document.documentElement.style.background = "red";
    window.setTimeout(() => {
      document.documentElement.style.background = "";
    }, 300);
  }

  const isDark = mode === "dark";

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`flex w-full items-center rounded-lg border border-slate-300/70 bg-white px-3 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 ${showLabel ? "justify-between" : "justify-center"} ${className ?? ""}`}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {showLabel ? <span>{isDark ? "Dark" : "Light"}</span> : null}
      {isDark ? <Moon size={14} /> : <Sun size={14} />}
    </button>
  );
}
