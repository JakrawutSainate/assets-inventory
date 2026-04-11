import * as grpc from "@grpc/grpc-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getAdminGrpcClient } from "@/services/grpc/grpcClients";
import { bearerMetadata, unaryPromise } from "@/services/grpc/grpc-unary";

export async function POST(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const client = getAdminGrpcClient();
    const reply = await unaryPromise<{ ok: boolean }>((cb) =>
      (client as any).declineBorrowRequest({ id }, bearerMetadata(token), cb),
    );
    return NextResponse.json(reply);
  } catch (e) {
    if (
      typeof e === "object" &&
      e !== null &&
      "code" in e &&
      (e as grpc.ServiceError).code === grpc.status.NOT_FOUND
    ) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Request failed" }, { status: 502 });
  }
}
