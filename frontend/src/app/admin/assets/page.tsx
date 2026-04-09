import { AdminLayout } from "@/components/layout/AdminLayout";
import { AdminAssetsContent } from "@/components/admin/assets/AdminAssetsContent";
import { AssetService } from "@/services/AssetService";

export default async function AdminAssetsPage() {
  const assets = await AssetService.getAllAssets();

  return (
    <AdminLayout activePath="/admin/assets">
      <AdminAssetsContent assets={assets} />
    </AdminLayout>
  );
}
