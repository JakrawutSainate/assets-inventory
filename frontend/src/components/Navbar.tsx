"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

export function Navbar() {
  const router = useRouter();
  const { role, logout } = useAuthStore();

  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <h1 className="font-semibold">Asset Borrowing System</h1>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">Role: {role ?? "Guest"}</span>
          <Button
            variant="outline"
            onClick={() => {
              logout();
              router.push("/login");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
