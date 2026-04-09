"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { UserNavbar } from "@/components/UserNavbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AssetStatus } from "@/models/Asset";
import { borrowService } from "@/services/BorrowService";
import { useAssetStore } from "@/store/useAssetStore";
import { useAuthStore } from "@/store/useAuthStore";

export function AssetDetailClientPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const { assets, fetchAssets, updateStatus } = useAssetStore();
  const [returnDate, setReturnDate] = useState("");
  const [returnLocation, setReturnLocation] = useState("");
  const [acceptedTerm, setAcceptedTerm] = useState(false);
  useEffect(() => fetchAssets(), [fetchAssets]);
  const asset = useMemo(() => assets.find((item) => item.id === params.id), [assets, params.id]);

  const handleBorrow = async () => {
    if (!asset || !user || !acceptedTerm || !returnDate || !returnLocation) return;
    const result = await Swal.fire({ title: "Confirm borrow?", text: `Borrow ${asset.name} until ${returnDate}`, icon: "question", showCancelButton: true, confirmButtonText: "Confirm" });
    if (!result.isConfirmed) return;
    borrowService.borrowAsset(asset.id, user.id, returnDate);
    updateStatus(asset.id, AssetStatus.BORROWED);
    await Swal.fire("Success", "Asset borrowed successfully", "success");
    router.push("/my-borrowings");
  };

  if (!asset) return <div><UserNavbar /><main className="mx-auto max-w-4xl p-8">Asset not found.</main></div>;

  return (
    <div>
      <UserNavbar />
      <main className="mx-auto max-w-4xl p-8">
        <header className="mb-6">
          <h1 className="text-4xl font-black tracking-tight text-white">Asset Details</h1>
          <p className="text-sm text-muted-foreground">Review terms and request borrowing access.</p>
        </header>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardHeader><CardTitle className="text-xl font-semibold">{asset.name}</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <img src={asset.image} alt={asset.name} className="h-80 w-full rounded-2xl object-cover" />
              <p className="text-sm text-muted-foreground">Location: {asset.location}</p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2"><Label>Return Date</Label><Input type="date" value={returnDate} onChange={(event) => setReturnDate(event.target.value)} /></div>
                <div className="space-y-2"><Label>Return Location</Label><Input value={returnLocation} onChange={(event) => setReturnLocation(event.target.value)} /></div>
              </div>
              <label className="flex items-center gap-2 text-sm"><Checkbox checked={acceptedTerm} onChange={(event) => setAcceptedTerm(event.target.checked)} />I accept terms and conditions</label>
              <Button disabled={asset.status !== AssetStatus.AVAILABLE} onClick={handleBorrow}>Borrow</Button>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
