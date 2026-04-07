export enum BorrowStatus {
  IN_USE = "IN_USE",
  RETURNING = "RETURNING",
  VERIFYING = "VERIFYING",
  COMPLETED = "COMPLETED",
}

export class Borrow {
  constructor(
    public id: string,
    public assetId: string,
    public userId: string,
    public borrowDate: string,
    public returnDate: string,
    public status: BorrowStatus,
  ) {}
}
