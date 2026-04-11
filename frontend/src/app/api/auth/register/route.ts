import { NextResponse } from "next/server";

import { getApiBaseUrl } from "@/config/app-config";

export async function POST(req: Request) {
  const body = await req.json();
  const api = getApiBaseUrl();
  const res = await fetch(`${api}/api/v1/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as {
    token?: string;
    user?: unknown;
  };
  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }
  if (!data.token || !data.user) {
    return NextResponse.json({ message: "Invalid response from API" }, { status: 502 });
  }
  const out = NextResponse.json({ user: data.user }, { status: 201 });
  out.cookies.set("auth_token", data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return out;
}
