export type AssetStatus = "assigned" | "available" | "maintenance";

export interface Asset {
  id: string;
  name: string;
  serialNumber: string;
  imageUrl: string;
  status: AssetStatus;
  category: string;
  custodianName: string | null;
  valueUsd: number;
}
