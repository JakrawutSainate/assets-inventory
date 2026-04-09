import { UserLayout } from "@/components/layout/UserLayout";
import { UserDashboardContent } from "@/components/user/dashboard/UserDashboardContent";
import { AssetService } from "@/services/AssetService";

export default async function DashboardPage() {
  const assets = await AssetService.getAllAssets();

  return (
    <UserLayout activePath="/dashboard">
      <UserDashboardContent assets={assets} />
    </UserLayout>
  );
}
