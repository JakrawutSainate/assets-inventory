import { AdminReportsContent } from "@/components/admin/reports/AdminReportsContent";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { requireAdmin } from "@/lib/auth-server";

export default async function AdminReportsPage() {
  const { user } = await requireAdmin();
  return (
    <AdminLayout active="reports" user={user}>
      <AdminReportsContent />
    </AdminLayout>
  );
}
