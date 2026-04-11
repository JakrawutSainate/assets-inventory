import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getAdminGrpcClient } from "@/services/grpc/grpcClients";
import { bearerMetadata, unaryPromise } from "@/services/grpc/grpc-unary";

export async function GET() {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const client = getAdminGrpcClient();
    const reply = await unaryPromise<{
      terms_text: string;
      maintenance_mode: boolean;
      core_version: string;
      last_backup_at?: string;
      database_latency_ms?: string | number;
    }>((cb) => (client as any).getSettings({}, bearerMetadata(token), cb));
    return NextResponse.json({
      terms_text: reply.terms_text,
      maintenance_mode: reply.maintenance_mode,
      core_version: reply.core_version,
      last_backup_at: reply.last_backup_at ?? null,
      database_latency_ms:
        typeof reply.database_latency_ms === "string"
          ? Number(reply.database_latency_ms)
          : (reply.database_latency_ms ?? 0),
    });
  } catch {
    return NextResponse.json({ message: "Failed to load settings" }, { status: 502 });
  }
}

export async function PATCH(req: Request) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as { terms_text?: string; maintenance_mode?: boolean };
  try {
    const client = getAdminGrpcClient();
    const reply = await unaryPromise<{
      terms_text: string;
      maintenance_mode: boolean;
      core_version: string;
      last_backup_at?: string;
      database_latency_ms?: string | number;
    }>((cb) =>
      (client as any).patchSettings(
        {
          terms_text: body.terms_text,
          maintenance_mode: body.maintenance_mode,
        },
        bearerMetadata(token),
        cb,
      ),
    );
    return NextResponse.json({
      terms_text: reply.terms_text,
      maintenance_mode: reply.maintenance_mode,
      core_version: reply.core_version,
      last_backup_at: reply.last_backup_at ?? null,
      database_latency_ms:
        typeof reply.database_latency_ms === "string"
          ? Number(reply.database_latency_ms)
          : (reply.database_latency_ms ?? 0),
    });
  } catch {
    return NextResponse.json({ message: "Update failed" }, { status: 502 });
  }
}
