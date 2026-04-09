"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";

export function Navbar() {
  const router = useRouter();
  const { role, logout } = useAuthStore();

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-white/5 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-extrabold tracking-tight text-white">Luminescent</h1>
          <span className="rounded bg-white px-2 py-0.5 text-[10px] font-black tracking-widest text-black">
            {role ?? "GUEST"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-full"
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
