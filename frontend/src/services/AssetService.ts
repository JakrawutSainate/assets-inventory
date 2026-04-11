import type { Asset } from "@/models/Asset";
import type { UserAsset } from "@/models/UserAsset";
import {
  createDefaultAssetRepository,
  type AssetHttpRepository,
} from "@/services/AssetHttpRepository";

/**
 * Application facade: pages use `createAssetService(token)` so each request carries the JWT.
 */
export class AssetService {
  constructor(private readonly repo: AssetHttpRepository) {}

  async getAllAssets(): Promise<Asset[]> {
    return this.repo.listAdminAssets();
  }

  async getDashboardAssets(): Promise<UserAsset[]> {
    return this.repo.listUserDashboardAssets();
  }

  async getAssetById(id: string): Promise<UserAsset | null> {
    return this.repo.getUserAssetById(id);
  }

  async getSimilarAssets(): Promise<UserAsset[]> {
    return this.repo.listSimilarUserAssets();
  }
}

export function createAssetService(token: string | null): AssetService {
  return new AssetService(createDefaultAssetRepository(token));
}

export type { UserAsset, UserAssetStatus } from "@/models/UserAsset";
