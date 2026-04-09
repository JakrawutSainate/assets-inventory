import Link from "next/link";

type NavbarProps = {
  activePath: string;
};

export function Navbar({ activePath }: NavbarProps) {
  const items = [
    { href: "/dashboard", label: "Browse" },
    { href: "/my-borrowings", label: "My Items" },
    { href: "/history", label: "Activity" },
  ];

  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-white/80 px-8 shadow-[0_20px_40px_rgba(13,28,46,0.06)] backdrop-blur-md">
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold tracking-tighter text-indigo-700">Fluid Custodian</span>
        <nav className="hidden items-center gap-6 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-medium transition-colors ${
                activePath === item.href
                  ? "border-b-2 border-indigo-600 font-semibold text-indigo-700"
                  : "text-slate-500 hover:text-indigo-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
