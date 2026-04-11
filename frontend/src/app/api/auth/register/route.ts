import * as grpc from "@grpc/grpc-js";
import { NextResponse } from "next/server";

import { grpcAuthRegister, grpcStatus } from "@/services/grpc/authActions";

export async function POST(req: Request) {
  const body = (await req.json()) as { email?: string; password?: string; name?: string };
  try {
    const { token, user } = await grpcAuthRegister(
      String(body.email ?? ""),
      String(body.password ?? ""),
      body.name,
    );
    const out = NextResponse.json({ user }, { status: 201 });
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
    if (code === grpc.status.ALREADY_EXISTS) {
      return NextResponse.json({ message: "Email already registered" }, { status: 409 });
    }
    if (code === grpc.status.INVALID_ARGUMENT) {
      return NextResponse.json({ message: "Invalid registration data" }, { status: 400 });
    }
    return NextResponse.json({ message: "Registration failed" }, { status: 502 });
  }
}
