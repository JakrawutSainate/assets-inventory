import { notFound } from "next/navigation";

import { UserLayout } from "@/components/layout/UserLayout";
import { AssetDetailsContent } from "@/components/user/asset-details/AssetDetailsContent";
import { requireUser } from "@/lib/auth-server";
import { createAssetService } from "@/services/AssetService";

type AssetDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AssetDetailPage({ params }: AssetDetailPageProps) {
  const { id } = await params;
  const { token, user } = await requireUser();
  const svc = createAssetService(token);
  const asset = await svc.getAssetById(id);
  const similarAssets = await svc.getSimilarAssets();

  if (!asset) {
    notFound();
  }

  return (
    <UserLayout active="browse" avatarUrl={user.avatarUrl}>
      <AssetDetailsContent asset={asset} similarAssets={similarAssets} />
    </UserLayout>
  );
}
