import { AssetStatus } from "@/models/Asset";
import { BorrowStatus } from "@/models/Borrow";
import { Badge } from "@/components/ui/badge";

type Status = AssetStatus | BorrowStatus;

const statusClassMap: Record<Status, string> = {
  [AssetStatus.AVAILABLE]: "bg-emerald-100 text-emerald-800 border-emerald-200",
  [AssetStatus.BORROWED]: "bg-red-100 text-red-800 border-red-200",
  [AssetStatus.RESERVED]: "bg-amber-100 text-amber-800 border-amber-200",
  [AssetStatus.IN_TRANSIT]: "bg-blue-100 text-blue-800 border-blue-200",
  [BorrowStatus.IN_USE]: "bg-indigo-100 text-indigo-800 border-indigo-200",
  [BorrowStatus.RETURNING]: "bg-orange-100 text-orange-800 border-orange-200",
  [BorrowStatus.VERIFYING]: "bg-violet-100 text-violet-800 border-violet-200",
  [BorrowStatus.COMPLETED]: "bg-zinc-200 text-zinc-800 border-zinc-300",
};

export function StatusBadge({ status }: { status: Status }) {
  return <Badge className={statusClassMap[status]}>{status}</Badge>;
}
