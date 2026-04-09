import { Sidebar } from "@/components/Sidebar";

const adminItems = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/assets", label: "Assets" },
  { href: "/admin/requests", label: "Requests" },
  { href: "/admin/reports", label: "Reports" },
  { href: "/admin/settings", label: "Settings" },
];

type AdminLayoutProps = {
  activePath: string;
  children: React.ReactNode;
};

export function AdminLayout({ activePath, children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-inverse-surface text-inverse-on-surface">
      <Sidebar title="Admin Portal" subtitle="System Custodian" items={adminItems} activePath={activePath} />
      <main className="ml-64 min-h-screen p-12">{children}</main>
    </div>
  );
}
