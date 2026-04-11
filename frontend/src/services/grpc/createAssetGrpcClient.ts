import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

import { getGrpcAssetAddress } from "@/config/app-config";

const PROTO_PATH = path.join(process.cwd(), "proto", "asset_v1.proto");

let client: grpc.Client | null = null;

/**
 * Node gRPC client for `asset_v1.AssetService` (same .proto as Rust tonic).
 * Server Components only — not bundled for the browser.
 */
export function getAssetGrpcClient(): grpc.Client {
  if (client) {
    return client;
  }

  const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: Number,
    defaults: true,
    oneofs: true,
  });

  const descriptor = grpc.loadPackageDefinition(packageDefinition) as {
    asset_v1?: { AssetService: grpc.ServiceClientConstructor };
  };

  const AssetServiceCtor = descriptor.asset_v1?.AssetService;
  if (!AssetServiceCtor) {
    throw new Error("Failed to load asset_v1.AssetService from proto");
  }

  const address = getGrpcAssetAddress();
  const creds =
    process.env.GRPC_ASSET_TLS === "1" || process.env.GRPC_ASSET_TLS === "true"
      ? grpc.credentials.createSsl()
      : grpc.credentials.createInsecure();

  client = new AssetServiceCtor(address, creds) as grpc.Client;
  return client;
}
