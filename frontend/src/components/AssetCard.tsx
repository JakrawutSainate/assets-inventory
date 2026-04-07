import Link from "next/link";
import { motion } from "framer-motion";
import { Asset } from "@/models/Asset";
import { Card, CardContent } from "@/components/ui/card";
import { StatusBadge } from "@/components/StatusBadge";

export function AssetCard({ asset }: { asset: Asset }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <Link href={`/asset/${asset.id}`} className="block">
        <Card className="overflow-hidden">
          <img src={asset.image} alt={asset.name} className="h-44 w-full object-cover" />
          <CardContent className="space-y-2 p-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-semibold">{asset.name}</h3>
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
