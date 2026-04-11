import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import { getAdminGrpcClient } from "@/services/grpc/grpcClients";
import { bearerMetadata, unaryPromise } from "@/services/grpc/grpc-unary";

export async function PUT(req: Request) {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as { terms_and_conditions?: string; terms_text?: string };
  const termsText = body.terms_text ?? body.terms_and_conditions ?? "";
  try {
    const client = getAdminGrpcClient();
    await unaryPromise<unknown>((cb) =>
      (client as any).patchSettings({ terms_text: termsText }, bearerMetadata(token), cb),
    );
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ message: "Save failed" }, { status: 502 });
  }
}
