/**
 * Rust HTTP API (`api-http` / runner). Used for auth + protected REST assets.
 */
export function getApiBaseUrl(): string {
  const raw =
    process.env.API_BASE_URL?.trim() ??
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!raw) {
    return "http://127.0.0.1:3001";
  }
  return raw.replace(/\/$/, "");
}

/**
 * gRPC address for the Rust `asset-grpc` service (`host:port`).
 * Optional if the app uses REST-only asset loading.
 */
export function getGrpcAssetAddress(): string {
  const raw =
    process.env.GRPC_ASSET_ADDRESS?.trim() ??
    process.env.NEXT_PUBLIC_GRPC_ASSET_ADDRESS?.trim();
  if (!raw) {
    throw new Error(
      "Set GRPC_ASSET_ADDRESS in frontend/.env.local (e.g. 127.0.0.1:50051) — see .env.local.example",
    );
  }
  return raw.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
