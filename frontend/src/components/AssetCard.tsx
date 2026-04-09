"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Asset } from "@/models/Asset";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";

export function AssetCard({ asset }: { asset: Asset }) {
  return (
    <motion.div whileHover={{ scale: 1.02, y: -4 }} transition={{ duration: 0.2 }}>
      <Link href={`/asset/${asset.id}`} className="block">
        <Card className="overflow-hidden">
          <img src={asset.image} alt={asset.name} className="h-44 w-full object-cover" />
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-xl font-semibold">{asset.name}</h3>
              <StatusBadge status={asset.status} />
            </div>
            <p className="text-sm text-muted-foreground">
              {asset.category} - {asset.location}
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
