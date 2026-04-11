import * as grpc from "@grpc/grpc-js";
import { NextResponse } from "next/server";

import { grpcAuthLogin, grpcStatus } from "@/services/grpc/authActions";

export async function POST(req: Request) {
  const body = (await req.json()) as { email?: string; password?: string };
  try {
    const { token, user } = await grpcAuthLogin(
      String(body.email ?? ""),
      String(body.password ?? ""),
    );
    const out = NextResponse.json({ user });
    out.cookies.set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return out;
  } catch (e) {
    const code = grpcStatus(e);
    if (code === grpc.status.UNAUTHENTICATED) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
    if (code === grpc.status.INVALID_ARGUMENT) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 400 });
    }
    return NextResponse.json({ message: "Sign in failed" }, { status: 502 });
  }
}
