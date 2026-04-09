import { PageHeader } from "@/components/PageHeader";
import { Borrow } from "@/models/Borrow";
import { Asset } from "@/models/Asset";
import { AdminRequestCard } from "@/components/admin/requests/AdminRequestCard";

type AdminRequestsContentProps = {
  requests: Borrow[];
  assets: Asset[];
};

export function AdminRequestsContent({ requests, assets }: AdminRequestsContentProps) {
  const assetMap = new Map(assets.map((asset) => [asset.id, asset]));

  return (
    <>
      <PageHeader title="Pending Requests" description="Review and manage asset lifecycle transitions." badge="System Queue" />
      <div className="space-y-8">
        {requests.map((request) => {
          const asset = assetMap.get(request.assetId);
          if (!asset) return null;
          return <AdminRequestCard key={request.id} request={request} asset={asset} />;
        })}
      </div>
    </>
  );
}
