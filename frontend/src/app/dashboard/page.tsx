"use client";

import { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { AssetCard } from "@/components/AssetCard";
import { Input } from "@/components/ui/input";
import { useAssetStore } from "@/store/useAssetStore";
import { AssetStatus } from "@/models/Asset";

export default function UserDashboardPage() {
  const { assets, fetchAssets } = useAssetStore();
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const byText = asset.name.toLowerCase().includes(query.toLowerCase());
      const byStatus = statusFilter === "ALL" ? true : asset.status === statusFilter;
      return byText && byStatus;
    });
  }, [assets, query, statusFilter]);

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-7xl space-y-4 p-4">
        <div className="grid gap-3 md:grid-cols-2">
          <Input placeholder="Search assets..." value={query} onChange={(event) => setQuery(event.target.value)} />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-9 rounded-md border border-input bg-transparent px-3 text-sm"
          >
            <option value="ALL">All statuses</option>
            <option value={AssetStatus.AVAILABLE}>Available</option>
            <option value={AssetStatus.BORROWED}>Borrowed</option>
            <option value={AssetStatus.RESERVED}>Reserved</option>
            <option value={AssetStatus.IN_TRANSIT}>In Transit</option>
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAssets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      </main>
    </div>
  );
}
