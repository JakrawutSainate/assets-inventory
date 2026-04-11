/**
 * gRPC address for the Rust `asset-grpc` service (`host:port`).
 * Must match runner / `ASSET_GRPC_PORT` (default 50051).
 *
 * OWASP: use `GRPC_ASSET_ADDRESS` (server-only). Avoid `NEXT_PUBLIC_*` unless a
 * Client Component must speak gRPC-Web via a proxy (not implemented here).
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
