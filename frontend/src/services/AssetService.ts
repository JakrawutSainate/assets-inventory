import { Asset } from "@/models/Asset";

export class AssetService {
  private static readonly assets: Asset[] = [
    new Asset("asset-1", 'MacBook Pro 16" M3', "8902-X-2024", "Computing", "London, UK", "$3,499", "Assigned", "https://lh3.googleusercontent.com/aida-public/AB6AXuD9RY0YJ6TZv9AZRRJjSySvi5HdmXuSlM_pk5B6y0KisO4xYaEahd8WQhqdNT_j7jjt42FP8mMldab4nPto-7KxEOc3op7I7zU-4M81l3DHy-QDmmhpdKtQyR7A5jOeHEvC6PeV-cZoqm9opfkR062fPcE6hPFOHfBRDzn2I5_OX7q5pE7EWm4w7IGphZIgx6oL5a-qaxVbXS0Tq2Av3poazwXy1gXOWaaXS1GQsbJ4bI9C3tr_Yo589VbXUHnHEm9uPr4VIPOoQ_c", "$120/day", "Sarah Jenkins", 78),
    new Asset("asset-2", "Phase One XF IQ4", "CP-7721-P1", "Production", "Berlin, DE", "$48,990", "Available", "https://lh3.googleusercontent.com/aida-public/AB6AXuBanDZ7ft8Y_IEt5gECzKVXxqxcG4tvmBH7ABrYQxxFUDQgVSiXwvXIjtNOHM7OqQMjG4VIUHrv2g5DLf7IpJXBRbo5AZ5UW3j7C50O1cNXRYZuCFTrEl13BERagNv7be5qB77cLY7FHpkeL83dDzvk8z0YbyOjiRQRZRE0AE8Hv8YAkUt1OFq3SaReKvfuWbqG_p0yvLNnd9mSs93C05DXAOYKKwwRfUyQOIRWyYq5UGHcvB8l3K8sm2caSAHvr50uhSV8ISeQSyE", "$450/day", undefined, 92),
    new Asset("asset-3", "SSL Fusion Outboard", "AU-1122-SSL", "Audio Hardware", "Tokyo, JP", "$2,450", "Maintenance", "https://lh3.googleusercontent.com/aida-public/AB6AXuADJWvdLjT9R8H8-o4DUV1kAiJa7c3fHCrVupVBOgPt8h8WKVYtz0Z0fpBy300eb1ufsBpbE0bvgBx_QoRYFuHqdc_4lZ-6Ngo5l07Vr8tOPR8Ibm0bQSFUzg2ZbOFWZyN7Zw1y2ezkws0PVs_s3cVV8N_7VrrhOMCckxogX0x-qStRk1nZig1QwwT17WAZyBAKRA4maG5hmfRXorNYkMP0-RJVMrqkHCZl7Zp7Zm51NEIfIMvziJH2VjyQUmzIoqQ5mfJSeA_P4hU", "$25/day", "David Miller", 68),
  ];

  static async getAllAssets(): Promise<Asset[]> {
    return Promise.resolve(this.assets);
  }

  static async getAssetById(id: string): Promise<Asset | null> {
    const item = this.assets.find((asset) => asset.id === id);
    return Promise.resolve(item ?? null);
  }
}
