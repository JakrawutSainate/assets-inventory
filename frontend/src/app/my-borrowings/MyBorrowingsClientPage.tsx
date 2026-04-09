"use client";

import { useMemo, useState } from "react";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { UserNavbar } from "@/components/UserNavbar";
import { EmptyState } from "@/components/EmptyState";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AssetStatus } from "@/models/Asset";
import { borrowService } from "@/services/BorrowService";
import { useAuthStore } from "@/store/useAuthStore";
import { useAssetStore } from "@/store/useAssetStore";

export function MyBorrowingsClientPage() {
  const user = useAuthStore((state) => state.user);
  const updateStatus = useAssetStore((state) => state.updateStatus);
  const [refreshKey, setRefreshKey] = useState(0);
  const borrowings = useMemo(() => (user ? borrowService.getUserBorrowings(user.id) : []), [user, refreshKey]);

  const onReturn = async (assetId: string) => {
    const result = await Swal.fire({ title: "Return this asset?", icon: "warning", showCancelButton: true, confirmButtonText: "Return" });
    if (!result.isConfirmed) return;
    borrowService.returnAsset(assetId);
    updateStatus(assetId, AssetStatus.AVAILABLE);
    setRefreshKey((prev) => prev + 1);
    await Swal.fire("Returned", "Return flow started", "success");
  };

  return (
    <div>
      <UserNavbar />
      <main className="mx-auto max-w-5xl space-y-6 p-8">
        <header>
          <h2 className="text-4xl font-black tracking-tight text-white">My Borrowings</h2>
          <p className="text-sm text-muted-foreground">Track due dates and manage active borrowing requests.</p>
        </header>
        {borrowings.length === 0 ? (
          <EmptyState title="No borrowings found" />
        ) : (
          borrowings.map((borrow, index) => (
            <motion.div key={borrow.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
              <Card>
                <CardHeader><CardTitle className="text-base">Asset ID: {borrow.assetId}</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <p className="text-sm text-muted-foreground">Due: {dayjs(borrow.returnDate).format("DD MMM YYYY")}</p>
                    <StatusBadge status={borrow.status} />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" onClick={() => onReturn(borrow.assetId)}>Return</Button>
                    <Button size="sm" variant="outline" onClick={() => Swal.fire("Extended", "Borrowing extended by 3 days", "success")}>Extend</Button>
                    <Button size="sm" variant="destructive" onClick={() => Swal.fire("Reported", "Damage report submitted", "info")}>Report Damage</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        )}
      </main>
    </div>
  );
}
