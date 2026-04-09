import { AdminReportsContent } from "@/components/admin/reports/AdminReportsContent";
import { AdminLayout } from "@/components/layout/AdminLayout";

export default async function AdminReportsPage() {
  return (
    <AdminLayout active="reports">
      <AdminReportsContent />
    </AdminLayout>
  );
}
