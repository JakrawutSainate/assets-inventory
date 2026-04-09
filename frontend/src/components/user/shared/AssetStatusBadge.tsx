import type { UserAssetStatus } from "@/services/AssetService";

type AssetStatusBadgeProps = {
  status: UserAssetStatus;
};

const badgeClassMap: Record<UserAssetStatus, string> = {
  available: "text-emerald-700 bg-emerald-100",
  borrowed: "text-slate-700 bg-slate-200",
  reserved: "text-orange-700 bg-orange-100",
  in_transit: "text-indigo-700 bg-indigo-100",
};

export function AssetStatusBadge({ status }: AssetStatusBadgeProps) {
  return (
    <span
      className={[
        "rounded-full px-3 py-1 text-[10px] font-bold tracking-wider uppercase",
        badgeClassMap[status],
      ].join(" ")}
    >
      {status}
    </span>
  );
}
