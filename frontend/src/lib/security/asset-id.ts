/**
 * Aligns with backend `validation::validate_asset_id` — safe path segment before HTTP.
 * OWASP: reduces path / injection-style probing via `id`.
 */
export function assertSafeAssetId(id: string): void {
  if (id.length === 0 || id.length > 128) {
    throw new Error("Invalid asset id");
  }
  const ok = [...id].every(
    (c) => /[a-zA-Z0-9_-]/.test(c),
  );
  if (!ok) {
    throw new Error("Invalid asset id");
  }
}
