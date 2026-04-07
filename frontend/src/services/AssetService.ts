import { mockAssets } from "@/lib/mockData";
import { Asset, AssetStatus } from "@/models/Asset";

export class AssetService {
  private assets: Asset[] = [...mockAssets];

  getAllAssets(): Asset[] {
    return [...this.assets];
  }

  getAssetById(id: string): Asset | undefined {
    return this.assets.find((asset) => asset.id === id);
  }

  updateAssetStatus(id: string, status: AssetStatus): Asset[] {
    this.assets = this.assets.map((asset) =>
      asset.id === id ? new Asset(asset.id, asset.name, asset.image, asset.category, status, asset.location, asset.price) : asset,
    );
    return [...this.assets];
  }
}

export const assetService = new AssetService();
