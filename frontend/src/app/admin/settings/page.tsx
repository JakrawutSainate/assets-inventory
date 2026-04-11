import { AdminSettingsContent } from "@/components/admin/settings/AdminSettingsContent";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { requireAdmin } from "@/lib/auth-server";

export default async function AdminSettingsPage() {
  const { user } = await requireAdmin();
  return (
    <AdminLayout active="settings" user={user}>
      <AdminSettingsContent />
    </AdminLayout>
  );
}
