import * as grpc from "@grpc/grpc-js";

import type { Asset, AssetStatus } from "@/models/Asset";
import type { UserAsset, UserAssetStatus } from "@/models/UserAsset";
import { assertSafeAssetId } from "@/lib/security/asset-id";
import { getAssetGrpcClient } from "@/services/grpc/grpcClients";
import { bearerMetadata, unaryPromise } from "@/services/grpc/grpc-unary";

type AdminAssetPb = {
  id: string;
  name: string;
  serial_number: string;
  image_url: string;
  status: number;
  category: string;
  custodian_name: string;
  has_custodian: boolean;
  value_usd: number;
};

type UserAssetPb = {
  id: string;
  name: string;
  image_url: string;
  status: number;
  category: string;
  location_label: string;
  daily_rate_usd: number;
  action_label: string;
};

function mapAdminStatus(n: number): AssetStatus {
  switch (n) {
    case 1:
      return "assigned";
    case 2:
      return "available";
    case 3:
      return "maintenance";
    default:
      return "available";
  }
}

function mapUserStatus(n: number): UserAssetStatus {
  switch (n) {
    case 1:
      return "available";
    case 2:
      return "borrowed";
    case 3:
      return "reserved";
    case 4:
      return "in_transit";
    default:
      return "available";
  }
}

function mapAdminAsset(a: AdminAssetPb): Asset {
  return {
    id: a.id,
    name: a.name,
    serialNumber: a.serial_number,
    imageUrl: a.image_url,
    status: mapAdminStatus(a.status),
    category: a.category,
    custodianName: a.has_custodian ? a.custodian_name : null,
    valueUsd: a.value_usd,
  };
}

function mapUserAsset(a: UserAssetPb): UserAsset {
  return {
    id: a.id,
    name: a.name,
    imageUrl: a.image_url,
    status: mapUserStatus(a.status),
    category: a.category,
    locationLabel: a.location_label,
    dailyRateUsd: a.daily_rate_usd,
    actionLabel: a.action_label,
  };
}

/**
 * Data access via gRPC (`asset_v1.AssetService` on Rust). Requires Bearer JWT on every RPC.
 */
export class AssetGrpcRepository {
  constructor(private readonly token: string) {}

  private get client(): grpc.Client {
    return getAssetGrpcClient();
  }

  private md(): grpc.Metadata {
    return bearerMetadata(this.token);
  }

  async listAdminAssets(): Promise<Asset[]> {
    const reply = await unaryPromise<{ items: AdminAssetPb[] }>((cb) =>
      (this.client as any).listAdminAssets({}, this.md(), cb),
    );
    return (reply.items ?? []).map(mapAdminAsset);
  }

  async listUserDashboardAssets(): Promise<UserAsset[]> {
    const reply = await unaryPromise<{ items: UserAssetPb[] }>((cb) =>
      (this.client as any).listDashboardAssets({}, this.md(), cb),
    );
    return (reply.items ?? []).map(mapUserAsset);
  }

  async getUserAssetById(id: string): Promise<UserAsset | null> {
    assertSafeAssetId(id);
    try {
      const reply = await unaryPromise<{ asset?: UserAssetPb }>((cb) =>
        (this.client as any).getUserAsset({ id }, this.md(), cb),
      );
      if (!reply.asset) {
        return null;
      }
      return mapUserAsset(reply.asset);
    } catch (e) {
      if (isGrpcNotFound(e)) {
        return null;
      }
      throw e;
    }
  }

  async listSimilarUserAssets(): Promise<UserAsset[]> {
    const reply = await unaryPromise<{ items: UserAssetPb[] }>((cb) =>
      (this.client as any).listSimilarAssets({}, this.md(), cb),
    );
    return (reply.items ?? []).map(mapUserAsset);
  }
}

export function createAssetGrpcRepository(token: string): AssetGrpcRepository {
  return new AssetGrpcRepository(token);
}

function isGrpcNotFound(err: unknown): boolean {
  return (
    typeof err === "object" &&
    err !== null &&
    "code" in err &&
    (err as grpc.ServiceError).code === grpc.status.NOT_FOUND
  );
}
