export type BorrowStatus = "active" | "completed" | "overdue" | "pending";

export interface Borrow {
  id: string;
  assetId: string;
  assetName: string;
  assetImageUrl: string;
  category: string;
  borrowerName: string;
  borrowedAt: string;
  dueAt: string;
  returnedAt: string | null;
  status: BorrowStatus;
  savingsUsd: number;
}
