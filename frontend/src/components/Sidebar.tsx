"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const adminMenus = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/assets", label: "Assets" },
  { href: "/admin/requests", label: "Requests" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/settings", label: "Settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 border-r bg-muted/20 p-4">
      <p className="mb-4 text-sm font-semibold text-muted-foreground">Admin Menu</p>
      <nav className="space-y-1">
        {adminMenus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className={cn(
              "block rounded-md px-3 py-2 text-sm hover:bg-muted",
              pathname === menu.href && "bg-primary text-primary-foreground hover:bg-primary",
            )}
          >
            {menu.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
