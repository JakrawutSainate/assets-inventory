import { notFound } from "next/navigation";

import { UserLayout } from "@/components/layout/UserLayout";
import { AssetDetailsContent } from "@/components/user/asset-details/AssetDetailsContent";
import { assetService } from "@/services/AssetService";
import { AuthService } from "@/services/AuthService";

type AssetDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AssetDetailPage({ params }: AssetDetailPageProps) {
  const { id } = await params;
  const user = await AuthService.getCurrentUser();
  const asset = await assetService.getAssetById(id);
  const similarAssets = await assetService.getSimilarAssets();

  if (!asset) {
    notFound();
  }

  return (
    <UserLayout active="browse" avatarUrl={user.avatarUrl}>
      <AssetDetailsContent asset={asset} similarAssets={similarAssets} />
    </UserLayout>
  );
}
