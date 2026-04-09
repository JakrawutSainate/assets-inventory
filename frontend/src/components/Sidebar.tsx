"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, Boxes, ClipboardCheck, LayoutDashboard, LogOut, Plus, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

const adminMenus = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/assets", label: "Assets", icon: Boxes },
  { href: "/admin/requests", label: "Requests", icon: ClipboardCheck },
  { href: "/admin/reports", label: "Reports", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  return (
    <aside className="flex w-64 flex-col border-r border-white/10 bg-[#111] p-4">
      <div className="mb-6 mt-2 border-b border-white/10 px-2 pb-4">
        <p className="text-lg font-black tracking-tight text-white">Admin Portal</p>
        <p className="text-xs text-muted-foreground">System Control</p>
      </div>
      <button className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-sm font-bold text-black transition hover:scale-[1.02]">
        <Plus className="size-4" />
        New Project
      </button>
      <nav className="flex-1 space-y-1">
        {adminMenus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 hover:bg-white/10",
              pathname === menu.href && "bg-white text-black hover:bg-white",
            )}
          >
            <menu.icon className="size-4" />
            {menu.label}
          </Link>
        ))}
      </nav>

      <div className="mt-4 border-t border-white/10 pt-4">
        <button
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          <LogOut className="size-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
