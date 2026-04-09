import { notFound } from "next/navigation";
import { UserLayout } from "@/components/layout/UserLayout";
import { AssetDetailsContent } from "@/components/user/asset-details/AssetDetailsContent";
import { AssetService } from "@/services/AssetService";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AssetDetailsPage({ params }: Props) {
  const { id } = await params;
  const asset = await AssetService.getAssetById(id);
  if (!asset) notFound();

  return (
    <UserLayout activePath="/dashboard">
      <AssetDetailsContent asset={asset} />
    </UserLayout>
  );
}
