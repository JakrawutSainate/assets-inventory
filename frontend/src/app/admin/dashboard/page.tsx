import { AdminDashboardContent } from "@/components/admin/dashboard/AdminDashboardContent";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { requireAdmin } from "@/lib/auth-server";
import { createAssetService } from "@/services/AssetService";
import { BorrowService } from "@/services/BorrowService";

export default async function AdminDashboardPage() {
  const { token, user } = await requireAdmin();
  const assets = await createAssetService(token).getAllAssets();
  const pending = await BorrowService.getPendingRequests();

  return (
    <AdminLayout active="dashboard" user={user}>
      <AdminDashboardContent assets={assets} pending={pending} />
    </AdminLayout>
  );
}
