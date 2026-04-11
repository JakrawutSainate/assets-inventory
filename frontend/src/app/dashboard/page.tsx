import { UserLayout } from "@/components/layout/UserLayout";
import { UserDashboardContent } from "@/components/user/dashboard/UserDashboardContent";
import { requireUser } from "@/lib/auth-server";
import { createAssetService } from "@/services/AssetService";

export default async function UserDashboardPage() {
  const { token, user } = await requireUser();
  const assets = await createAssetService(token).getDashboardAssets();

  return (
    <UserLayout active="browse" avatarUrl={user.avatarUrl}>
      <UserDashboardContent assets={assets} />
    </UserLayout>
  );
}
