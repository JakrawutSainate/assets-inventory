import { Asset, AssetStatus } from "@/models/Asset";
import { Borrow, BorrowStatus } from "@/models/Borrow";
import { User, UserRole } from "@/models/User";

export const mockUsers: User[] = [
  new User("u-1", "Alice Admin", UserRole.ADMIN),
  new User("u-2", "Uma User", UserRole.USER),
];

export const mockAssets: Asset[] = [
  new Asset("a-1", "MacBook Pro 16", "https://picsum.photos/seed/asset1/600/400", "Laptop", AssetStatus.AVAILABLE, "HQ Room A", 220),
  new Asset("a-2", "Canon EOS R6", "https://picsum.photos/seed/asset2/600/400", "Camera", AssetStatus.BORROWED, "Studio B", 180),
  new Asset("a-3", "DJI Mini Drone", "https://picsum.photos/seed/asset3/600/400", "Drone", AssetStatus.RESERVED, "Warehouse", 140),
  new Asset("a-4", "iPad Pro", "https://picsum.photos/seed/asset4/600/400", "Tablet", AssetStatus.IN_TRANSIT, "Branch Office", 120),
  new Asset("a-5", "Sony WH-1000XM5", "https://picsum.photos/seed/asset5/600/400", "Audio", AssetStatus.AVAILABLE, "HQ Room C", 60),
];

export const mockBorrows: Borrow[] = [
  new Borrow("b-1", "a-2", "u-2", "2026-04-01", "2026-04-10", BorrowStatus.IN_USE),
  new Borrow("b-2", "a-5", "u-2", "2026-03-20", "2026-03-24", BorrowStatus.COMPLETED),
];
