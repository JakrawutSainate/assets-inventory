import type { ReactNode } from "react";

import { Navbar } from "@/components/Navbar";

type UserLayoutProps = {
  children: ReactNode;
  active: "browse" | "my-items" | "activity";
  avatarUrl: string;
};

export function UserLayout({ children, active, avatarUrl }: UserLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      <Navbar active={active} avatarUrl={avatarUrl} />
      <main className="mx-auto max-w-7xl bg-slate-50 px-8 pt-24 pb-12 transition-colors duration-200 dark:bg-slate-900">
        {children}
      </main>
    </div>
  );
}
