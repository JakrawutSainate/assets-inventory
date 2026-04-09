import type { Borrow } from "@/models/Borrow";

const mockBorrows: Borrow[] = [
  {
    id: "borrow-001",
    assetId: "IT-9024",
    assetName: 'MacBook Pro 16" M2',
    assetImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC4BBoG3jLs4C1zElCX-KQD3ctCNA8NSzEzriMh29-hII_s_Z-5QcEsra3h7GxkpVZ4DGX9_75Oz0VxWrIdOh34gtNwdfTsoWXMl6jadltV6P108jHx5FhN6P89Z1k3OX46mWiySzSoRai0iiFBwbkf-nxadcQDFM-iaX1wO2I5Gt82eBAPFka9Y5f6LdQ4fx-gfeakrTB2rLOAYJwxOpV_OxEptw8_vyp4bGL36xfDx7gYG-40dw2MkVrgVBP2eHlu_PlS_zYsrkA",
    category: "Electronics",
    borrowerName: "Alex Sterling",
    borrowedAt: "2023-10-12",
    dueAt: "2023-11-15",
    returnedAt: "2023-11-15",
    status: "completed",
    savingsUsd: 1122,
  },
  {
    id: "borrow-002",
    assetId: "IT-1129",
    assetName: "Acoustic Studio 500",
    assetImageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB8j9MCI5hEH72rVNjDamLAO_PXWG5mMaZlcSc2IaYZyTjLab86vTkL1QZqKz7bhNYgR9Tv7fulRp4QpJ1g83hB1IJW82D1V1tqCzffyg6y7ZbXg54rOBjvZRKmemlS2I7PRFahbQSZ5OdBcb0usyk_ehW7gfNBvIYsaOnjzxex5A8zDI-NjPYTHU6XJJ8Gm7eWoErsIa8re8U9quJBXMCJ_Kjz3NB7u2IBI8GwWcbIa5XIJqoIOJGr74BOzFosJ2wwC_jNN3aGPSo",
    category: "Audio",
    borrowerName: "Alex Sterling",
    borrowedAt: "2023-07-20",
    dueAt: "2023-07-25",
    returnedAt: null,
    status: "overdue",
    savingsUsd: 168.5,
  },
];

export class BorrowService {
  static async getHistory(): Promise<Borrow[]> {
    return mockBorrows;
  }

  static async getActiveBorrows(): Promise<Borrow[]> {
    return mockBorrows.filter((borrow) => borrow.status !== "completed");
  }

  static async getPendingRequests(): Promise<Borrow[]> {
    return mockBorrows.map((borrow) => ({ ...borrow, status: "pending" }));
  }
}
