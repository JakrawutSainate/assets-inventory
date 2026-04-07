"use client";

import { Asset, AssetStatus } from "@/models/Asset";
import { assetService } from "@/services/AssetService";
import { create } from "zustand";

type AssetState = {
  assets: Asset[];
  fetchAssets: () => void;
  updateStatus: (id: string, status: AssetStatus) => void;
};

export const useAssetStore = create<AssetState>((set) => ({
  assets: [],
  fetchAssets: () => set({ assets: assetService.getAllAssets() }),
  updateStatus: (id, status) => {
    const nextAssets = assetService.updateAssetStatus(id, status);
    set({ assets: nextAssets });
  },
}));
