import { redirect } from "next/navigation";

import { getApiBaseUrl } from "@/config/app-config";
import type { Asset } from "@/models/Asset";
import type { UserAsset } from "@/models/UserAsset";

function guardAuth(res: Response, path: string) {
  if (res.status === 401) {
    redirect("/login");
  }
  if (res.status === 403 && path.startsWith("/api/v1/admin")) {
    redirect("/dashboard");
  }
}

export class AssetHttpRepository {
  constructor(
    private readonly baseUrl: string,
    private readonly token: string | null,
  ) {}

  private headers(): HeadersInit {
    const h: Record<string, string> = { Accept: "application/json" };
    if (this.token) {
      h.Authorization = `Bearer ${this.token}`;
    }
    return h;
  }

  private async parseJson<T>(res: Response, path: string): Promise<T> {
    guardAuth(res, path);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} for ${path}`);
    }
    return res.json() as Promise<T>;
  }

  async listAdminAssets(): Promise<Asset[]> {
    const path = "/api/v1/admin/assets";
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: this.headers(),
      cache: "no-store",
    });
    return this.parseJson<Asset[]>(res, path);
  }

  async listUserDashboardAssets(): Promise<UserAsset[]> {
    const path = "/api/v1/user/dashboard-assets";
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: this.headers(),
      cache: "no-store",
    });
    return this.parseJson<UserAsset[]>(res, path);
  }

  async getUserAssetById(id: string): Promise<UserAsset | null> {
    const path = `/api/v1/user/assets/${encodeURIComponent(id)}`;
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: this.headers(),
      cache: "no-store",
    });
    if (res.status === 404) {
      return null;
    }
    return this.parseJson<UserAsset>(res, path);
  }

  async listSimilarUserAssets(): Promise<UserAsset[]> {
    const path = "/api/v1/user/similar-assets";
    const res = await fetch(`${this.baseUrl}${path}`, {
      headers: this.headers(),
      cache: "no-store",
    });
    return this.parseJson<UserAsset[]>(res, path);
  }
}

export function createDefaultAssetRepository(token: string | null): AssetHttpRepository {
  return new AssetHttpRepository(getApiBaseUrl(), token);
}
