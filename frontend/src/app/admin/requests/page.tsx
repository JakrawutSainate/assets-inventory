import { AdminLayout } from "@/components/layout/AdminLayout";
import { AdminRequestsContent } from "@/components/admin/requests/AdminRequestsContent";
import { BorrowService } from "@/services/BorrowService";
import { AssetService } from "@/services/AssetService";

export default async function AdminRequestsPage() {
  const [requests, assets] = await Promise.all([BorrowService.getPendingRequests(), AssetService.getAllAssets()]);

  return (
    <AdminLayout activePath="/admin/requests">
      <AdminRequestsContent requests={requests} assets={assets} />
    </AdminLayout>
  );
}
