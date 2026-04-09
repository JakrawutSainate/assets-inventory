import type { Asset } from "@/models/Asset";

export type UserAssetStatus = "available" | "borrowed" | "reserved" | "in_transit";

export interface UserAsset {
  id: string;
  name: string;
  imageUrl: string;
  status: UserAssetStatus;
  category: string;
  locationLabel: string;
  dailyRateUsd: number;
  actionLabel: string;
}

const mockAssets: Asset[] = [
  {
    id: "asset-001",
    name: 'MacBook Pro 16" M3',
    serialNumber: "8902-X-2024",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD9RY0YJ6TZv9AZRRJjSySvi5HdmXuSlM_pk5B6y0KisO4xYaEahd8WQhqdNT_j7jjt42FP8mMldab4nPto-7KxEOc3op7I7zU-4M81l3DHy-QDmmhpdKtQyR7A5jOeHEvC6PeV-cZoqm9opfkR062fPcE6hPFOHfBRDzn2I5_OX7q5pE7EWm4w7IGphZIgx6oL5a-qaxVbXS0Tq2Av3poazwXy1gXOWaaXS1GQsbJ4bI9C3tr_Yo589VbXUHnHEm9uPr4VIPOoQ_c",
    status: "assigned",
    category: "Computing",
    custodianName: "Sarah Jenkins",
    valueUsd: 3499,
  },
  {
    id: "asset-002",
    name: "Phase One XF IQ4",
    serialNumber: "CP-7721-P1",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBanDZ7ft8Y_IEt5gECzKVXxqxcG4tvmBH7ABrYQxxFUDQgVSiXwvXIjtNOHM7OqQMjG4VIUHrv2g5DLf7IpJXBRbo5AZ5UW3j7C50O1cNXRYZuCFTrEl13BERagNv7be5qB77cLY7FHpkeL83dDzvk8z0YbyOjiRQRZRE0AE8Hv8YAkUt1OFq3SaReKvfuWbqG_p0yvLNnd9mSs93C05DXAOYKKwwRfUyQOIRWyYq5UGHcvB8l3K8sm2caSAHvr50uhSV8ISeQSyE",
    status: "available",
    category: "Production",
    custodianName: null,
    valueUsd: 48990,
  },
  {
    id: "asset-003",
    name: "SSL Fusion Outboard",
    serialNumber: "AU-1122-SSL",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuADJWvdLjT9R8H8-o4DUV1kAiJa7c3fHCrVupVBOgPt8h8WKVYtz0Z0fpBy300eb1ufsBpbE0bvgBx_QoRYFuHqdc_4lZ-6Ngo5l07Vr8tOPR8Ibm0bQSFUzg2ZbOFWZyN7Zw1y2ezkws0PVs_s3cVV8N_7VrrhOMCckxogX0x-qStRk1nZig1QwwT17WAZyBAKRA4maG5hmfRXorNYkMP0-RJVMrqkHCZl7Zp7Zm51NEIfIMvziJH2VjyQUmzIoqQ5mfJSeA_P4hU",
    status: "maintenance",
    category: "Audio Hardware",
    custodianName: "David Miller",
    valueUsd: 2450,
  },
];

const userDashboardAssets: UserAsset[] = [
  {
    id: "asset-101",
    name: "ARRI Alexa Mini LF",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhdpPapBwpRxJjPuZ2i7R6WsAYZPH_aFl2mtujkMDnJ4J2jYcl9OZvpQvW5EFlQlZc01aBHEUZoPtw_l0JjEkc_UCwxZvXHSqeiJ2xBAadYBFtff1JtFdT26HaV--p5_REi-A_Kie1f7IcWMdgXy-P4b2wTYO0Mq5SCwJUU1jkYSyrU3cZKozdrOF0OKGS5wxehEjxgR9Ek6TpskghleB8Ztr3v7rZYDjmx9IBrruZL5gCsue1JHzeT01P1yexnALUaVS1TS2B_Kk",
    status: "available",
    category: "Production",
    locationLabel: "London, UK",
    dailyRateUsd: 450,
    actionLabel: "Request Asset",
  },
  {
    id: "asset-102",
    name: "MacBook Pro M3 Max",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuARTKFDSfOMCnp4fEmkFBe9K-2WuJCDl5VpgmQ3O07ltruO3pv_eBanukJMYocuJbRUHOyRM1ThHkJbDDn9sveGWqJ33wQTvMa4V5bUWhNSn9T2TsN3l86nWDpi0ZkBonyYrRScNQlKcRPyTsKE_hIDARCbsStGSOrPsw98XoXMqTqF8qMdoMuBIRL5e6fZzIBHjdlS3JoLypOyN2znqFKp2NK_ECdTf274E41hVyp6BipzXdWuCxel5gwW97gjNiSSY1iPLjCV1ac",
    status: "borrowed",
    category: "Computing",
    locationLabel: "New York, USA",
    dailyRateUsd: 120,
    actionLabel: "View Details",
  },
  {
    id: "asset-103",
    name: "Profoto D2 Duo Kit",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDIAQdzjw12C-XHTTH_kjvUKoS9Vnlz0KoeigYadOkJu3_ldj306546dUOVYQUV6O-SMpuxtMYEkxh95hX3KrGzKDWMyViMhjGBTiDbyYVuDGaobwiJ2QahEXpe61avKADFr8_ENSSKGIPnGqafh3kyNBWC2ome4uE8acNHxneVtgqueoUKF67qtFB6f5r5TwkFKQfD7Ka3WDG5yxVUya8fennUBHBW2mNJIZu4oIHp0UTqM5kI1p-nB9qnVpzHXwk8M5A6vmtbFOk",
    status: "reserved",
    category: "Production",
    locationLabel: "Berlin, DE",
    dailyRateUsd: 200,
    actionLabel: "Notify When Free",
  },
  {
    id: "asset-104",
    name: "DJI Inspire 3 Combo",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAC0UHQDOlidDuH8_VI98nxbTsSOrjhIQSzhj1V-tnldiASSL2HuimB9rxK3qXV2SXvGd_zxO8g9ieQnPGZwvfkH2iVcOjvoOZXMCA777LoVG1EldEQiGwt5prkC6hDMawK5cb-XPlABXy3yjeTvgbaTwWkkdP-n9YHdktR-oHlxdFo2JBJXhFDdy0zx1IWW_GOY_cYxqPNG3oMwy_NuiW1SnJCdwK_Kh_e8sRFudo5gbQiyle6aYS1dbpOW3trSZ1YaBYRnvbdROA",
    status: "in_transit",
    category: "Production",
    locationLabel: "Arriving Today",
    dailyRateUsd: 380,
    actionLabel: "Track Shipment",
  },
];

export class AssetService {
  static async getAllAssets(): Promise<Asset[]> {
    return mockAssets;
  }

  static async getDashboardAssets(): Promise<UserAsset[]> {
    return userDashboardAssets;
  }

  static async getAssetById(id: string): Promise<UserAsset | null> {
    const asset = userDashboardAssets.find((item) => item.id === id);
    return asset ?? null;
  }

  static async getSimilarAssets(): Promise<UserAsset[]> {
    return userDashboardAssets.slice(0, 3);
  }
}
