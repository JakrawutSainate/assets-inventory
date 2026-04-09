import { Borrow } from "@/models/Borrow";

export class BorrowService {
  private static readonly items: Borrow[] = [
    new Borrow("borrow-1", "asset-2", "user-1", "2 hours ago", "Oct 24, 2023", null, "Borrow Request", "Pending"),
    new Borrow("borrow-2", "asset-3", "user-2", "15 mins ago", "Nov 12, 2023", null, "Return Request", "Pending"),
    new Borrow("borrow-3", "asset-1", "user-3", "Yesterday", "Nov 15, 2023", null, "Borrow Request", "Pending"),
    new Borrow("borrow-4", "asset-1", "user-1", "Oct 12, 2023", "Nov 15, 2023", "Nov 15, 2023", "Borrow Request", "Completed"),
    new Borrow("borrow-5", "asset-3", "user-2", "Jul 20, 2023", "Jul 25, 2023", "Aug 2, 2023", "Borrow Request", "Overdue"),
  ];

  static async getPendingRequests(): Promise<Borrow[]> {
    return Promise.resolve(this.items.filter((item) => item.status === "Pending"));
  }

  static async getMyBorrowings(): Promise<Borrow[]> {
    return Promise.resolve(this.items.filter((item) => item.status === "Pending"));
  }

  static async getBorrowHistory(): Promise<Borrow[]> {
    return Promise.resolve(this.items.filter((item) => item.status !== "Pending"));
  }
}
