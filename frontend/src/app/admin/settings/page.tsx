import { AdminLayout } from "@/components/layout/AdminLayout";
import { AdminSettingsContent } from "@/components/admin/settings/AdminSettingsContent";

export default async function AdminSettingsPage() {
  return (
    <AdminLayout activePath="/admin/settings">
      <AdminSettingsContent />
    </AdminLayout>
  );
}
