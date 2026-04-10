"use client";

export type ThemeMode = "dark" | "light";

export function getPreferredTheme(): ThemeMode {
  const stored = window.localStorage.getItem("theme-mode");
  if (stored === "dark" || stored === "light") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;

  if (mode === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  window.localStorage.setItem("theme-mode", mode);
}
