import Image from "next/image";

type SidebarItem = {
  label: string;
  icon: string;
  key: "dashboard" | "assets" | "requests" | "reports" | "settings";
  href: string;
};

const items: SidebarItem[] = [
  { label: "Dashboard", icon: "dashboard", key: "dashboard", href: "/admin/dashboard" },
  { label: "Assets", icon: "inventory_2", key: "assets", href: "/admin/assets" },
  { label: "Requests", icon: "sync_alt", key: "requests", href: "/admin/requests" },
  { label: "Reports", icon: "analytics", key: "reports", href: "/admin/reports" },
  { label: "Settings", icon: "settings", key: "settings", href: "/admin/settings" },
];

type SidebarProps = {
  active: SidebarItem["key"];
};

export function Sidebar({ active }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-50 h-screen w-64 border-r border-slate-800 bg-slate-950 p-4">
      <div className="mb-10 px-4">
        <h1 className="text-lg font-black tracking-tighter text-slate-100">
          Admin Portal
        </h1>
        <p className="text-xs font-medium text-slate-400">System Custodian</p>
      </div>

      <nav className="flex h-[calc(100%-124px)] flex-col">
        <div className="flex-1 space-y-1">
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={[
                "flex items-center gap-3 px-4 py-3 text-sm transition-transform",
                item.key === active
                  ? "rounded-lg bg-indigo-900/30 font-bold text-indigo-300"
                  : "text-slate-400 hover:translate-x-1 hover:bg-slate-900",
              ].join(" ")}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        <div className="mt-auto border-t border-slate-800 pt-4">
          <div className="mb-4 flex items-center gap-3 px-4 py-3">
            <Image
              className="h-8 w-8 rounded-full border border-slate-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxB0yRSNTs_fNtbhN5xEkorOKbv24B8XMLUQjBuv6TyzU7JXpmYTsWZOwNFO-bP87IEBRo0Urj_AJ16y3Uo5bkQ5RVOFgfcbNPjpFb2eu_aOQbH_uJx51E3NCr7xe3FcKFmvPfklkYxicBSka7HwdoXgK_9V-iMEsfdkkTMtITu598Acqmb9Z3oCVkco_wvjBTwM41cT4Io0AfhoJNB4Nr1os6vMJ-BxekgekJFRaHsqlH5btbwzyYm5tGnL1GVi2kCb-p4bLX6pk"
              alt="Admin avatar"
              width={32}
              height={32}
            />
            <div className="overflow-hidden">
              <p className="truncate text-xs font-bold text-slate-100">
                Admin User
              </p>
              <p className="text-[10px] text-slate-500">Super Admin</p>
            </div>
          </div>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 text-sm text-slate-400 transition-colors hover:bg-slate-900"
          >
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </a>
        </div>
      </nav>
    </aside>
  );
}
