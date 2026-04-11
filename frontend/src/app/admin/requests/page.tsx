import { AdminRequestsContent } from "@/components/admin/requests/AdminRequestsContent";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { requireAdmin } from "@/lib/auth-server";
import { BorrowService } from "@/services/BorrowService";

export default async function AdminRequestsPage() {
  const { user } = await requireAdmin();
  const requests = await BorrowService.getPendingRequests();

  return (
    <AdminLayout active="requests" user={user}>
      <AdminRequestsContent requests={requests} />
    </AdminLayout>
  );
}
