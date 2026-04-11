import { UserLayout } from "@/components/layout/UserLayout";
import { UserDashboardContent } from "@/components/user/dashboard/UserDashboardContent";
import { assetService } from "@/services/AssetService";
import { AuthService } from "@/services/AuthService";

export default async function UserDashboardPage() {
  const user = await AuthService.getCurrentUser();
  const assets = await assetService.getDashboardAssets();

  return (
    <UserLayout active="browse" avatarUrl={user.avatarUrl}>
      <UserDashboardContent assets={assets} />
    </UserLayout>
  );
}
