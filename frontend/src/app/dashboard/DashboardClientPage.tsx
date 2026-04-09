"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AssetCard } from "@/components/AssetCard";
import { UserNavbar } from "@/components/UserNavbar";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { AssetStatus } from "@/models/Asset";
import { useAssetStore } from "@/store/useAssetStore";

export function DashboardClientPage() {
  const { assets, fetchAssets } = useAssetStore();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssets();
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, [fetchAssets]);

  const filteredAssets = useMemo(
    () =>
      assets.filter((asset) => {
        const byText = asset.name.toLowerCase().includes(query.toLowerCase());
        const byStatus = statusFilter === "ALL" || asset.status === statusFilter;
        return byText && byStatus;
      }),
    [assets, query, statusFilter],
  );

  return (
    <div>
      <UserNavbar />
      <main className="mx-auto max-w-7xl space-y-6 p-8">
        <section className="space-y-3">
          <h1 className="text-6xl font-black tracking-tight text-white">Explore Assets.</h1>
          <p className="max-w-2xl text-sm text-muted-foreground">Seamlessly manage and request high-precision hardware across the ecosystem.</p>
        </section>
        <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur md:flex-row md:items-center">
          <Input placeholder="Search by asset name, ID, or serial..." value={query} onChange={(event) => setQuery(event.target.value)} className="border-none bg-transparent" />
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="h-10 rounded-xl border border-white/10 bg-white/5 px-3 text-sm">
            <option value="ALL">All statuses</option><option value={AssetStatus.AVAILABLE}>Available</option><option value={AssetStatus.BORROWED}>Borrowed</option><option value={AssetStatus.RESERVED}>Reserved</option><option value={AssetStatus.IN_TRANSIT}>In Transit</option>
          </select>
        </div>
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-72" />
            <Skeleton className="h-72" />
            <Skeleton className="h-72" />
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAssets.map((asset) => (
              <AssetCard key={asset.id} asset={asset} />
            ))}
          </motion.div>
        )}
      </main>
    </div>
  );
}
