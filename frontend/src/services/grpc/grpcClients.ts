import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

import { getGrpcBackendAddress } from "@/config/app-config";

const protoDir = path.join(process.cwd(), "proto");

const packageDefinition = protoLoader.loadSync(
  [
    path.join(protoDir, "asset_v1.proto"),
    path.join(protoDir, "auth_v1.proto"),
    path.join(protoDir, "admin_v1.proto"),
  ],
  {
    keepCase: true,
    longs: String,
    enums: Number,
    defaults: true,
    oneofs: true,
    includeDirs: [protoDir],
  },
);

const loaded = grpc.loadPackageDefinition(packageDefinition) as {
  asset_v1?: { AssetService: grpc.ServiceClientConstructor };
  auth_v1?: { AuthService: grpc.ServiceClientConstructor };
  admin_v1?: { AdminService: grpc.ServiceClientConstructor };
};

function channelCreds(): grpc.ChannelCredentials {
  return process.env.GRPC_BACKEND_TLS === "1" || process.env.GRPC_BACKEND_TLS === "true"
    ? grpc.credentials.createSsl()
    : grpc.credentials.createInsecure();
}

let assetClient: grpc.Client | null = null;
let authClient: grpc.Client | null = null;
let adminClient: grpc.Client | null = null;

/**
 * Node gRPC clients (same host:port as Rust `asset-grpc` / `runner`).
 * Server-only — not bundled for the browser.
 */
export function getAssetGrpcClient(): grpc.Client {
  if (!assetClient) {
    const Ctor = loaded.asset_v1?.AssetService;
    if (!Ctor) {
      throw new Error("Failed to load asset_v1.AssetService from proto");
    }
    assetClient = new Ctor(getGrpcBackendAddress(), channelCreds()) as grpc.Client;
  }
  return assetClient;
}

export function getAuthGrpcClient(): grpc.Client {
  if (!authClient) {
    const Ctor = loaded.auth_v1?.AuthService;
    if (!Ctor) {
      throw new Error("Failed to load auth_v1.AuthService from proto");
    }
    authClient = new Ctor(getGrpcBackendAddress(), channelCreds()) as grpc.Client;
  }
  return authClient;
}

export function getAdminGrpcClient(): grpc.Client {
  if (!adminClient) {
    const Ctor = loaded.admin_v1?.AdminService;
    if (!Ctor) {
      throw new Error("Failed to load admin_v1.AdminService from proto");
    }
    adminClient = new Ctor(getGrpcBackendAddress(), channelCreds()) as grpc.Client;
  }
  return adminClient;
}
