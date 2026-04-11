import { AdminReportsContent } from "@/components/admin/reports/AdminReportsContent";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { requireAdmin } from "@/lib/auth-server";
import { createAdminApiRepository } from "@/services/AdminApiRepository";

export default async function AdminReportsPage() {
  const { token, user } = await requireAdmin();
  const reports = await createAdminApiRepository(token).getReports();

  return (
    <AdminLayout active="reports" user={user}>
      <AdminReportsContent reports={reports} />
    </AdminLayout>
  );
}
