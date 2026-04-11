import { AdminSettingsContent } from "@/components/admin/settings/AdminSettingsContent";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { requireAdmin } from "@/lib/auth-server";
import { createAdminApiRepository } from "@/services/AdminApiRepository";

export default async function AdminSettingsPage() {
  const { token, user } = await requireAdmin();
  const settings = await createAdminApiRepository(token).getSettings();

  return (
    <AdminLayout active="settings" user={user}>
      <AdminSettingsContent settings={settings} />
    </AdminLayout>
  );
}
