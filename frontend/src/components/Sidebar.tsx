import type { ComponentType } from "react";

import { LayoutDashboard, Package, ReceiptText, Settings, ShieldCheck } from "lucide-react";

import { LogoutButton } from "@/components/auth/LogoutButton";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { RemoteAssetImage } from "@/components/ui/RemoteAssetImage";
import type { User } from "@/models/User";

type SidebarItem = {
  label: string;
  key: "dashboard" | "assets" | "requests" | "reports" | "settings";
  href: string;
  icon: ComponentType<{ size?: number; className?: string }>;
};

const items: SidebarItem[] = [
  { label: "Dashboard", key: "dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Assets", key: "assets", href: "/admin/assets", icon: Package },
  { label: "Requests", key: "requests", href: "/admin/requests", icon: ShieldCheck },
  { label: "Reports", key: "reports", href: "/admin/reports", icon: ReceiptText },
  { label: "Settings", key: "settings", href: "/admin/settings", icon: Settings },
];

type SidebarProps = {
  active: SidebarItem["key"];
  user: User;
};

export function Sidebar({ active, user }: SidebarProps) {
  const subtitle = user.role === "admin" ? "Administrator" : "User";

  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-64 border-r border-slate-200 bg-white p-4 transition-colors duration-200 dark:border-slate-700 dark:bg-slate-950">
      <div className="mb-10 px-4">
        <h1 className="text-lg font-black tracking-tighter text-slate-900 dark:text-slate-100">
          Admin Portal
        </h1>
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">System Custodian</p>
      </div>

      <nav className="flex h-[calc(100%-124px)] flex-col">
        <div className="flex-1 space-y-1">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={[
                "flex items-center gap-2 px-4 py-3 text-sm transition-transform",
                item.key === active
                  ? "rounded-lg bg-indigo-100 font-bold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                  : "text-slate-600 hover:translate-x-1 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900",
              ].join(" ")}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        <div className="mt-auto border-t border-slate-200 pt-4 dark:border-slate-800">
          <div className="mb-4 px-4">
            <ThemeToggle />
          </div>

          <div className="mb-4 flex items-center gap-3 px-4 py-3">
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-slate-300 dark:border-slate-700">
              {user.avatarUrl ? (
                <RemoteAssetImage
                  src={user.avatarUrl}
                  alt=""
                  fill
                  sizes="32px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-indigo-100 text-xs font-bold text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-200">
                  {user.name.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-xs font-bold text-slate-900 dark:text-slate-100">{user.name}</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-500">{subtitle}</p>
            </div>
          </div>

          <LogoutButton />
        </div>
      </nav>
    </aside>
  );
}
