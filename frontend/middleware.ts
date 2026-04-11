import { jwtVerify } from "jose";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** Must match `JWT_SECRET` in backend `.env` when verifying cookies in middleware. */
const JWT_DEFAULT = "dev-only-change-me-use-at-least-32-characters-secret";

export async function middleware(request: NextRequest) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? JWT_DEFAULT);
  const token = request.cookies.get("auth_token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  try {
    const { payload } = await jwtVerify(token, secret);
    const role = payload.role as string | undefined;
    if (request.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/asset/:path*",
    "/history",
    "/profile",
    "/my-borrowings",
  ],
};
