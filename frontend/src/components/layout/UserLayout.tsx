import { Navbar } from "@/components/Navbar";

type UserLayoutProps = {
  activePath: string;
  children: React.ReactNode;
};

export function UserLayout({ activePath, children }: UserLayoutProps) {
  return (
    <div className="min-h-screen bg-surface text-on-surface">
      <Navbar activePath={activePath} />
      <main className="mx-auto max-w-7xl px-8 pb-12 pt-24">{children}</main>
    </div>
  );
}
