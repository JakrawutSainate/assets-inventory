"use client";

import { useMemo, useState } from "react";
import dayjs from "dayjs";
import Swal from "sweetalert2";
import { Navbar } from "@/components/Navbar";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AssetStatus } from "@/models/Asset";
import { BorrowStatus } from "@/models/Borrow";
import { borrowService } from "@/services/BorrowService";
import { useAuthStore } from "@/store/useAuthStore";
import { useAssetStore } from "@/store/useAssetStore";

export default function MyBorrowingsPage() {
  const user = useAuthStore((state) => state.user);
  const updateStatus = useAssetStore((state) => state.updateStatus);
  const [refreshKey, setRefreshKey] = useState(0);

  const borrowings = useMemo(() => {
    if (!user) {
      return [];
    }
    return borrowService.getUserBorrowings(user.id);
  }, [user, refreshKey]);

  const onReturn = async (assetId: string) => {
    const result = await Swal.fire({
      title: "Return this asset?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Return",
    });

    if (!result.isConfirmed) {
      return;
    }

    borrowService.returnAsset(assetId);
    updateStatus(assetId, AssetStatus.AVAILABLE);
    setRefreshKey((prev) => prev + 1);
    await Swal.fire("Returned", "Return flow started", "success");
  };

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl space-y-4 p-4">
        <h2 className="text-xl font-semibold">My Borrowings</h2>
        {borrowings.map((borrow) => (
          <Card key={borrow.id}>
            <CardHeader>
              <CardTitle className="text-base">Asset ID: {borrow.assetId}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Due: {dayjs(borrow.returnDate).format("DD MMM YYYY")}
                </p>
                <StatusBadge status={borrow.status} />
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" onClick={() => onReturn(borrow.assetId)}>
                  Return
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => Swal.fire("Extended", "Borrowing extended by 3 days", "success")}
                >
                  Extend
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => Swal.fire("Reported", "Damage report submitted", "info")}
                >
                  Report Damage
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}
