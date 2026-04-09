"use client";

import dayjs from "dayjs";
import { motion } from "framer-motion";
import { UserNavbar } from "@/components/UserNavbar";
import { EmptyState } from "@/components/EmptyState";
import { StatusBadge } from "@/components/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { borrowService } from "@/services/BorrowService";
import { assetService } from "@/services/AssetService";
import { useAuthStore } from "@/store/useAuthStore";

export function HistoryClientPage() {
  const user = useAuthStore((state) => state.user);
  const history = user ? borrowService.getUserBorrowings(user.id) : [];

  return (
    <div>
      <UserNavbar />
      <main className="mx-auto max-w-5xl space-y-6 p-8">
        <header>
          <h2 className="text-4xl font-black tracking-tight text-white">Borrow History</h2>
          <p className="text-sm text-muted-foreground">Analyze historical requests and savings impact over time.</p>
        </header>
        {history.length === 0 ? (
          <EmptyState title="No history found" />
        ) : (
          history.map((item, index) => {
            const asset = assetService.getAssetById(item.assetId);
            const days = dayjs(item.returnDate).diff(dayjs(item.borrowDate), "day") || 1;
            const savedMoney = asset ? (asset.price / 100) * days : 0;
            return (
              <motion.div key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04 }}>
                <Card>
                  <CardHeader><CardTitle className="text-base">{asset?.name ?? item.assetId}</CardTitle></CardHeader>
                  <CardContent className="flex items-center justify-between border-t border-white/10 pt-4">
                    <div>
                      <p className="text-sm text-muted-foreground">{dayjs(item.borrowDate).format("DD MMM")} - {dayjs(item.returnDate).format("DD MMM YYYY")}</p>
                      <p className="text-sm font-medium">Saved money: ${savedMoney.toFixed(2)}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })
        )}
      </main>
    </div>
  );
}
