export type AssetStatus = "Available" | "Assigned" | "Borrowed" | "Reserved" | "Maintenance" | "In Transit";

export class Asset {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly serial: string,
    public readonly category: string,
    public readonly location: string,
    public readonly valueLabel: string,
    public readonly status: AssetStatus,
    public readonly imageUrl: string,
    public readonly rateLabel?: string,
    public readonly custodian?: string,
    public readonly utilization?: number,
  ) {}
}
