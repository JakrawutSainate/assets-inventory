import Image from "next/image";
import Link from "next/link";

type NavbarProps = {
  active: "browse" | "my-items" | "activity";
  avatarUrl: string;
};

export function Navbar({ active, avatarUrl }: NavbarProps) {
  const navClass = (key: NavbarProps["active"]) =>
    key === active
      ? "border-b-2 border-indigo-600 font-semibold text-indigo-700"
      : "font-medium text-slate-500 transition-colors hover:text-indigo-600";

  return (
    <header className="fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-white/80 px-8 shadow-[0_20px_40px_rgba(13,28,46,0.06)] backdrop-blur-md">
      <div className="flex items-center gap-8">
        <span className="text-xl font-bold tracking-tighter text-indigo-700">
          Fluid Custodian
        </span>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/dashboard" className={navClass("browse")}>
            Browse
          </Link>
          <Link href="/my-borrowings" className={navClass("my-items")}>
            My Items
          </Link>
          <Link href="/history" className={navClass("activity")}>
            Activity
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 text-slate-500 transition-colors hover:text-indigo-600">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div className="h-8 w-8 overflow-hidden rounded-full ring-2 ring-indigo-100">
          <Image src={avatarUrl} alt="User profile" width={32} height={32} />
        </div>
      </div>
    </header>
  );
}
