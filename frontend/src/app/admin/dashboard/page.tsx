import { AdminDashboardContent } from "@/components/admin/dashboard/AdminDashboardContent";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { requireAdmin } from "@/lib/auth-server";
import { createAdminApiRepository } from "@/services/AdminApiRepository";
import { createAssetService } from "@/services/AssetService";

export default async function AdminDashboardPage() {
  const { token, user } = await requireAdmin();
  const adminApi = createAdminApiRepository(token);
  const [dashboard, assets] = await Promise.all([
    adminApi.getDashboard(),
    createAssetService(token).getAllAssets(),
  ]);

  return (
    <AdminLayout active="dashboard" user={user}>
      <AdminDashboardContent dashboard={dashboard} assets={assets} />
    </AdminLayout>
  );
}
