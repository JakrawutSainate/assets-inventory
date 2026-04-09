import { Asset } from "@/models/Asset";
import { AssetTable } from "@/components/AssetTable";
import { PageHeader } from "@/components/PageHeader";
import { SearchBar } from "@/components/SearchBar";
import { StatsCard } from "@/components/StatsCard";

type AdminAssetsContentProps = {
  assets: Asset[];
};

export function AdminAssetsContent({ assets }: AdminAssetsContentProps) {
  return (
    <>
      <PageHeader
        title="Asset Registry"
        description="Centralized oversight of all high-value custodial items and organizational resources."
        action={<button className="rounded-lg bg-gradient-to-br from-primary to-primary-container px-6 py-3 font-semibold text-white">Add New Asset</button>}
      />
      <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-12">
        <div className="md:col-span-8">
          <SearchBar placeholder="Search by asset name, serial, or custodian..." />
        </div>
      </section>
      <AssetTable assets={assets} />
      <section className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-4">
        <StatsCard label="Total Inventory Value" value="$1,240,400" hint="+12.4% this quarter" />
        <StatsCard label="Active Deployments" value="182 Items" hint="+14 pending" />
        <StatsCard label="Compliance Rate" value="99.2%" />
        <StatsCard label="Maintenance Alerts" value="3 Priority" hint="Immediate action required" />
      </section>
    </>
  );
}
