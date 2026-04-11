import { AdminDashboardContent } from "@/components/admin/dashboard/AdminDashboardContent";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { assetService } from "@/services/AssetService";
import { BorrowService } from "@/services/BorrowService";

export default async function AdminDashboardPage() {
  const assets = await assetService.getAllAssets();
  const pending = await BorrowService.getPendingRequests();

  return (
    <AdminLayout active="dashboard">
      <AdminDashboardContent assets={assets} pending={pending} />
    </AdminLayout>
  );
}
