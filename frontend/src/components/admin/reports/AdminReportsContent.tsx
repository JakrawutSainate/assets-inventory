import { PageHeader } from "@/components/PageHeader";
import { StatsCard } from "@/components/StatsCard";

export function AdminReportsContent() {
  return (
    <>
      <PageHeader
        title="System Reports"
        description="Executive intelligence and utilization velocity."
        badge="Executive Intelligence"
        action={<button className="rounded-lg bg-gradient-to-br from-primary to-primary-container px-6 py-2.5 text-sm font-bold text-white">Refresh Metrics</button>}
      />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <StatsCard label="Active Custodians" value="1,204" />
        <StatsCard label="Inventory Value" value="$4.2M" />
        <StatsCard label="Mean Loan Duration" value="4.2d" />
        <StatsCard label="Fulfillment Rate" value="98.2%" />
      </div>
    </>
  );
}
