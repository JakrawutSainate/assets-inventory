import { AdminRequestsContent } from "@/components/admin/requests/AdminRequestsContent";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { BorrowService } from "@/services/BorrowService";

export default async function AdminRequestsPage() {
  const requests = await BorrowService.getPendingRequests();

  return (
    <AdminLayout active="requests">
      <AdminRequestsContent requests={requests} />
    </AdminLayout>
  );
}
