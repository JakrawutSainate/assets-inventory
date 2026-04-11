import type { Asset } from "@/models/Asset";
import type { UserAsset } from "@/models/UserAsset";
import { AssetGrpcRepository } from "@/services/grpc/AssetGrpcRepository";

/**
 * Application service (facade): pages use this; data comes from gRPC (`AssetGrpcRepository`).
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

let singleton: AssetService | null = null;

function getSingleton(): AssetService {
  if (!singleton) {
    const repo = new AssetGrpcRepository();
    singleton = new AssetService(repo);
  }
  return singleton;
}

export const assetService = {
  getAllAssets: (): Promise<Asset[]> => getSingleton().getAllAssets(),
  getDashboardAssets: (): Promise<UserAsset[]> =>
    getSingleton().getDashboardAssets(),
  getAssetById: (id: string): Promise<UserAsset | null> =>
    getSingleton().getAssetById(id),
  getSimilarAssets: (): Promise<UserAsset[]> =>
    getSingleton().getSimilarAssets(),
};

export type { UserAsset, UserAssetStatus } from "@/models/UserAsset";
