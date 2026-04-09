import Link from "next/link";

type SidebarItem = {
  href: string;
  label: string;
};

type SidebarProps = {
  title: string;
  subtitle: string;
  items: SidebarItem[];
  activePath: string;
};

export function Sidebar({ title, subtitle, items, activePath }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-950 p-4">
      <div className="mb-10 px-2">
        <h1 className="text-lg font-black tracking-tighter text-slate-100">{title}</h1>
        <p className="text-xs text-slate-400">{subtitle}</p>
      </div>
      <nav className="flex-1 space-y-1">
        {items.map((item) => {
          const active = activePath === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 text-sm transition-transform hover:translate-x-1 ${
                active
                  ? "rounded-lg bg-indigo-900/30 font-bold text-indigo-300"
                  : "text-slate-400 hover:bg-slate-900"
              }`}
            >
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-slate-800 pt-4">
        <Link className="flex items-center gap-3 px-4 py-3 text-sm text-slate-400 hover:bg-slate-900" href="/login">
          Logout
        </Link>
      </div>
    </aside>
  );
}
