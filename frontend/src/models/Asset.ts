export enum AssetStatus {
  AVAILABLE = "AVAILABLE",
  BORROWED = "BORROWED",
  RESERVED = "RESERVED",
  IN_TRANSIT = "IN_TRANSIT",
}

export class Asset {
  constructor(
    public id: string,
    public name: string,
    public image: string,
    public category: string,
    public status: AssetStatus,
    public location: string,
    public price: number,
  ) {}
}
