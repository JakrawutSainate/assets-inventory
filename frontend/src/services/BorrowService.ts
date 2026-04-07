import { mockBorrows } from "@/lib/mockData";
import { Borrow, BorrowStatus } from "@/models/Borrow";

export class BorrowService {
  private borrows: Borrow[] = [...mockBorrows];

  borrowAsset(assetId: string, userId: string, returnDate: string): Borrow {
    const newBorrow = new Borrow(
      `b-${Date.now()}`,
      assetId,
      userId,
      new Date().toISOString(),
      returnDate,
      BorrowStatus.IN_USE,
    );

    this.borrows = [newBorrow, ...this.borrows];
    return newBorrow;
  }

  returnAsset(assetId: string): Borrow[] {
    this.borrows = this.borrows.map((borrow) =>
      borrow.assetId === assetId
        ? new Borrow(
            borrow.id,
            borrow.assetId,
            borrow.userId,
            borrow.borrowDate,
            borrow.returnDate,
            BorrowStatus.RETURNING,
          )
        : borrow,
    );

    return [...this.borrows];
  }

  getUserBorrowings(userId: string): Borrow[] {
    return this.borrows.filter((borrow) => borrow.userId === userId);
  }
}

export const borrowService = new BorrowService();
