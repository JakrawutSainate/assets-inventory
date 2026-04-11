export type UserAssetStatus =
  | "available"
  | "borrowed"
  | "reserved"
  | "in_transit";

export interface UserAsset {
  id: string;
  name: string;
  imageUrl: string;
  status: UserAssetStatus;
  category: string;
  locationLabel: string;
  dailyRateUsd: number;
  actionLabel: string;
}
