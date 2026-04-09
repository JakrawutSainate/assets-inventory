import { PageHeader } from "@/components/PageHeader";
import { StatsCard } from "@/components/StatsCard";

export function AdminDashboardContent() {
  return (
    <>
      <PageHeader
        title="Systems Overview"
        description="Real-time custody metrics and asset flow."
        action={<button className="rounded-lg bg-gradient-to-br from-primary to-primary-container px-6 py-2.5 text-sm font-bold text-white">Download Report</button>}
      />
      <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <StatsCard label="Total Assets" value="12,482" hint="+4.2% from last month" />
        <StatsCard label="Pending Requests" value="184" hint="Avg. wait time: 14m" />
        <StatsCard label="Active Borrows" value="3,912" hint="View live stream" />
      </section>
    </>
  );
}
