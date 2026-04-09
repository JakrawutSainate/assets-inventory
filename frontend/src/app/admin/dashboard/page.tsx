import { AdminLayout } from "@/components/layout/AdminLayout";
import { AdminDashboardContent } from "@/components/admin/dashboard/AdminDashboardContent";

export default async function AdminDashboardPage() {
  return (
    <AdminLayout activePath="/admin/dashboard">
      <AdminDashboardContent />
    </AdminLayout>
  );
}
