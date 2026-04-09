import { AdminLayout } from "@/components/layout/AdminLayout";
import { AdminReportsContent } from "@/components/admin/reports/AdminReportsContent";

export default async function AdminReportsPage() {
  return (
    <AdminLayout activePath="/admin/reports">
      <AdminReportsContent />
    </AdminLayout>
  );
}
