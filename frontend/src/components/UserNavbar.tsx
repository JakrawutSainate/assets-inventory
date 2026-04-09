"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

const userMenus = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/my-borrowings", label: "My Borrowings" },
  { href: "/history", label: "History" },
];

export function UserNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { role, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-linear-to-b from-black/40 to-black/10 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        <div className="flex items-center gap-4">
          <span className="text-xl font-extrabold tracking-tight text-white">Luminescent</span>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold text-zinc-200">
            {role ?? "USER"}
          </span>
        </div>

        <nav className="hidden items-center gap-2 md:flex">
          {userMenus.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-xl px-3 py-2 text-sm text-zinc-400 transition hover:bg-white/10 hover:text-white",
                pathname === item.href && "bg-white text-black hover:bg-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button
          variant="outline"
          className="rounded-full"
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          <LogOut className="size-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}

