import {
  ClipboardList,
  Eye,
  TrendingUp,
} from "lucide-react";

import { DashboardToolbar } from "@/components/admin/dashboard/parts/DashboardToolbar";
import { DashboardStatCard } from "@/components/admin/dashboard/parts/DashboardStatCard";
import { RecentHandlersCard } from "@/components/admin/dashboard/parts/RecentHandlersCard";
import { TopPerformingAssetsTable } from "@/components/admin/dashboard/parts/TopPerformingAssetsTable";
import { UtilizationChartCard } from "@/components/admin/dashboard/parts/UtilizationChartCard";
import type { RecentHandler } from "@/components/admin/dashboard/parts/types";
import type { Asset } from "@/models/Asset";
import type { Borrow } from "@/models/Borrow";

type AdminDashboardContentProps = {
  assets: Asset[];
  pending: Borrow[];
};

export function AdminDashboardContent({ assets, pending }: AdminDashboardContentProps) {
  const recentHandlers: RecentHandler[] = [
    {
      id: "h1",
      name: "Sarah Chen",
      action: "Borrowed Arri Alexa Mini",
      time: "2m ago",
      online: true,
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAZn3V8DspgnBPBj4L7tDCefaNSAmrN6IlHbD29yvFoz5sUW2cx1uBt11578o5vEDULqPzLgY4bJx8sx_Gk7oB-t8SIEgqdBmS3p5OnOxgmuVI_vCJtyfL1FlpQ26o4RZ9iV1YEKbF6DmL_Z_O6YuEiicDdKFTbu9zXEf4AoBPF-Wqlroeflq8s7IB_8RdZHmGeDxE30puGmr-XYxZwj1veWClp8zUO9j5EwQpMenMHsVzRkPK3pLg2gRj3nRJvsOS_K1AZHyGCTis",
    },
    {
      id: "h2",
      name: "David Miller",
      action: "Returned MacBook Pro M3",
      time: "14m ago",
      online: false,
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDF7f2KB88WTa5rTeeVJ5-L_lV3i2OEO2_4h8gkb__qnwlOVNIIBM-Av_pGSCz_rOaKdJu9lG3kRHqgWxzkadSTEhkCr0Urcu08kPtmnKoYoP0_nDpdSfDc60GBP0ACbCI6UiDZAviCL9LArlySlt4qpUxetfmX920E6iOVQLzRd574jJcrXBPycqkH67Hg52YUpb8TF5Y4V2ZuZu4TiDjnWviwFZbmBwcVjJAYwCF75nogvWHD7aB3LsWyDSaCdtgw_dkojyHeK7E",
    },
    {
      id: "h3",
      name: "Elena Rodriguez",
      action: "Borrowed Sony G-Master Lens",
      time: "42m ago",
      online: true,
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAULpGiJOOkTXhkYRbLdGqn3eT2sEXZiPd9VSRzz-OurnsptE-fcD5LktcUVFTzviqKUo2LH-ULHPV-1MbmIHpqJkJUi3r-_7Kgj5gshl4cUJPTIMniTBVrvdNAEsjwxHk7emH_Cj2V9HYpQkSnYz59xZVsHhLA0q3tDFT3fpUQMuOXzwIbBVL0HiOei_EfllObXBxBY2b-S9rO4H_nR4TpLh4napyQ_MgmzuLYeqg5pFcW-poxvo0k0xUMmOYuSIhGvk1asbMbtBQ",
    },
  ];

  return (
    <>
      <header className="mb-12 flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter text-slate-900 dark:text-slate-100">
            Systems Overview
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Real-time custody metrics and asset flow.
          </p>
        </div>
        <DashboardToolbar />
      </header>

      <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        <DashboardStatCard
          label="Total Assets"
          value={assets.length.toLocaleString()}
          trend={
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-500">
              <TrendingUp size={14} />
              <span>+4.2% from last month</span>
            </div>
          }
        />
        <DashboardStatCard
          label="Pending Requests"
          value={pending.length.toString()}
          trend={
            <div className="flex items-center gap-2 text-sm font-bold text-amber-500">
              <ClipboardList size={14} />
              <span>Avg. wait time: 14m</span>
            </div>
          }
        />
        <DashboardStatCard
          label="Active Borrows"
          value="3,912"
          trend={
            <div className="flex items-center gap-2 text-sm font-bold text-indigo-500">
              <Eye size={14} />
              <span>View live stream</span>
            </div>
          }
        />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <UtilizationChartCard />
        <RecentHandlersCard handlers={recentHandlers} />
      </section>

      <TopPerformingAssetsTable assets={assets} />
    </>
  );
}
