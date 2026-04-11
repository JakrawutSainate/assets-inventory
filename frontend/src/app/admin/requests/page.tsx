import { AdminRequestsContent } from "@/components/admin/requests/AdminRequestsContent";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { requireAdmin } from "@/lib/auth-server";
import { createAdminApiRepository } from "@/services/AdminApiRepository";

export default async function AdminRequestsPage() {
  const { token, user } = await requireAdmin();
  const requests = await createAdminApiRepository(token).listBorrowRequests();

  return (
    <AdminLayout active="requests" user={user}>
      <AdminRequestsContent requests={requests} />
    </AdminLayout>
  );
}
