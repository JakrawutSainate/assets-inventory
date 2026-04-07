"use client";

import dayjs from "dayjs";
import { Navbar } from "@/components/Navbar";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { borrowService } from "@/services/BorrowService";
import { assetService } from "@/services/AssetService";
import { useAuthStore } from "@/store/useAuthStore";

export default function HistoryPage() {
  const user = useAuthStore((state) => state.user);
  const history = user ? borrowService.getUserBorrowings(user.id) : [];

  return (
    <div>
      <Navbar />
      <main className="mx-auto max-w-5xl space-y-4 p-4">
        <h2 className="text-xl font-semibold">Borrow History</h2>
        {history.map((item) => {
          const asset = assetService.getAssetById(item.assetId);
          const days = dayjs(item.returnDate).diff(dayjs(item.borrowDate), "day") || 1;
          const savedMoney = asset ? (asset.price / 100) * days : 0;

          return (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="text-base">{asset?.name ?? item.assetId}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    {dayjs(item.borrowDate).format("DD MMM")} - {dayjs(item.returnDate).format("DD MMM YYYY")}
                  </p>
                  <p className="text-sm font-medium">Saved money: ${savedMoney.toFixed(2)}</p>
                </div>
                <StatusBadge status={item.status} />
              </CardContent>
            </Card>
          );
        })}
      </main>
    </div>
  );
}
