import { AdminSettingsContent } from "@/components/admin/settings/AdminSettingsContent";
import { AdminLayout } from "@/components/layout/AdminLayout";

export default async function AdminSettingsPage() {
  return (
    <AdminLayout active="settings">
      <AdminSettingsContent />
    </AdminLayout>
  );
}
