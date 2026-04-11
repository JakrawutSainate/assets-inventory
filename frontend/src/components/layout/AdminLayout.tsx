import type { ReactNode } from "react";

import { Sidebar } from "@/components/Sidebar";
import type { User } from "@/models/User";

type AdminLayoutProps = {
  children: ReactNode;
  active: "dashboard" | "assets" | "requests" | "reports" | "settings";
  user: User;
};

export function AdminLayout({ children, active, user }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-white text-slate-900 transition-colors duration-200 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar active={active} user={user} />
      <main className="ml-64 min-h-screen bg-slate-50 p-12 transition-colors duration-200 dark:bg-slate-900">
        {children}
      </main>
    </div>
  );
}
