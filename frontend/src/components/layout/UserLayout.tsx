import type { ReactNode } from "react";

import { Navbar } from "@/components/Navbar";

type UserLayoutProps = {
  children: ReactNode;
  active: "browse" | "my-items" | "activity";
  avatarUrl: string;
};

export function UserLayout({ children, active, avatarUrl }: UserLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar active={active} avatarUrl={avatarUrl} />
      <main className="mx-auto max-w-7xl px-8 pt-24 pb-12">{children}</main>
    </div>
  );
}
