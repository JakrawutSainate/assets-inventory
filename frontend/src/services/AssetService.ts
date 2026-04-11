import type { Asset } from "@/models/Asset";
import type { UserAsset } from "@/models/UserAsset";
import {
  AssetGrpcRepository,
  createAssetGrpcRepository,
} from "@/services/grpc/AssetGrpcRepository";

/**
 * Application facade: Server Components call `createAssetService(token)` — data is loaded on the server (SSR), not in the browser.
 */
export class AssetService {
  constructor(private readonly repo: AssetGrpcRepository) {}

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

export function createAssetService(token: string): AssetService {
  return new AssetService(createAssetGrpcRepository(token));
}

export type { UserAsset, UserAssetStatus } from "@/models/UserAsset";
