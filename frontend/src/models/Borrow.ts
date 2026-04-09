export type BorrowRequestType = "Borrow Request" | "Return Request";
export type BorrowState = "Pending" | "Completed" | "Overdue";

export class Borrow {
  constructor(
    public readonly id: string,
    public readonly assetId: string,
    public readonly userId: string,
    public readonly requestedAtLabel: string,
    public readonly dueDateLabel: string,
    public readonly returnDateLabel: string | null,
    public readonly type: BorrowRequestType,
    public readonly status: BorrowState,
    public readonly notes?: string,
  ) {}
}
