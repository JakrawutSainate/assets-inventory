"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, User } from "lucide-react";

import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { RemoteAssetImage } from "@/components/ui/RemoteAssetImage";

type NavbarProps = {
  active: "browse" | "my-items" | "activity";
  avatarUrl: string;
};

export function Navbar({ active, avatarUrl }: NavbarProps) {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;

      if (notificationRef.current && !notificationRef.current.contains(target)) {
        setIsNotificationOpen(false);
      }

      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setIsUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navClass = (key: NavbarProps["active"]) =>
    key === active
      ? "border-b-2 border-indigo-600 font-semibold text-indigo-700 dark:text-indigo-300"
      : "font-medium text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-300";

  const hasAvatar = avatarUrl.trim().length > 0;

  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-white/80 px-8 shadow-[0_20px_40px_rgba(13,28,46,0.06)] backdrop-blur-md transition-colors duration-200 dark:bg-slate-950/80 dark:shadow-none">
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold tracking-tighter text-indigo-700 dark:text-indigo-400">
          Fluid Custodian
        </span>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/dashboard" className={navClass("browse")}>
            Browse
          </Link>
          <Link href="/my-borrowings" className={navClass("my-items")}>
            My Items
          </Link>
          <Link href="/history" className={navClass("activity")}>
            Activity
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle className="w-auto px-2.5 py-1.5" showLabel={false} />
        <div className="relative" ref={notificationRef}>
          <button
            type="button"
            onClick={() => {
              setIsNotificationOpen((prev) => !prev);
              setIsUserMenuOpen(false);
            }}
            aria-label="Toggle notifications"
            aria-expanded={isNotificationOpen}
            className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
          >
            <Bell size={18} />
          </button>

          {isNotificationOpen ? (
            <div className="absolute top-11 right-0 z-50 w-72 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <div className="border-b border-slate-100 px-3 py-2 dark:border-slate-800">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Notifications</p>
              </div>
              <button className="w-full rounded-lg px-3 py-2 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Borrow request approved</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">ARRI Alexa Mini LF is ready for pickup.</p>
              </button>
              <button className="w-full rounded-lg px-3 py-2 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Return reminder</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">MacBook Pro M3 Max due in 2 days.</p>
              </button>
              <button className="w-full rounded-lg px-3 py-2 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">System update</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">New policy changes were published today.</p>
              </button>
            </div>
          ) : null}
        </div>
        <div className="relative" ref={userMenuRef}>
          <button
            type="button"
            onClick={() => {
              setIsUserMenuOpen((prev) => !prev);
              setIsNotificationOpen(false);
            }}
            aria-label="Toggle user menu"
            aria-expanded={isUserMenuOpen}
            className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-indigo-100 dark:ring-indigo-900"
          >
            {hasAvatar ? (
              <RemoteAssetImage
                src={avatarUrl}
                alt=""
                fill
                sizes="32px"
                className="object-cover"
              />
            ) : (
              <span className="flex h-full w-full items-center justify-center bg-indigo-100 dark:bg-indigo-900/50">
                <User size={16} className="text-indigo-700 dark:text-indigo-300" aria-hidden />
              </span>
            )}
          </button>

          {isUserMenuOpen ? (
            <div className="absolute top-11 right-0 z-50 w-44 rounded-xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900">
              <Link
                href="/profile"
                className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Profile
              </Link>
              <button
                type="button"
                className="block w-full rounded-lg px-3 py-2 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/50"
                onClick={() => {
                  void (async () => {
                    await fetch("/api/auth/logout", { method: "POST" });
                    window.location.href = "/login";
                  })();
                }}
              >
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
