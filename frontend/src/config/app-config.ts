/**
 * gRPC backend: `asset-grpc` / `runner` exposes Asset + Auth + Admin on one address.
 */
export function getGrpcBackendAddress(): string {
  const raw =
    process.env.GRPC_BACKEND_ADDRESS?.trim() ??
    process.env.GRPC_ASSET_ADDRESS?.trim() ??
    process.env.NEXT_PUBLIC_GRPC_ASSET_ADDRESS?.trim();
  if (!raw) {
    return "127.0.0.1:50051";
  }
  return raw.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/** @deprecated Use `getGrpcBackendAddress`. */
export function getGrpcAssetAddress(): string {
  return getGrpcBackendAddress();
}
