import type { ReactNode } from "react";

import { Sidebar } from "@/components/Sidebar";

type AdminLayoutProps = {
  children: ReactNode;
  active: "dashboard" | "assets" | "requests" | "reports" | "settings";
};

export function AdminLayout({ children, active }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Sidebar active={active} />
      <main className="ml-64 min-h-screen bg-slate-900 p-12">{children}</main>
    </div>
  );
}
