import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import type { User } from "@/models/User";
import { AuthService } from "@/services/AuthService";

export async function getAuthToken(): Promise<string | null> {
  const c = await cookies();
  return c.get("auth_token")?.value ?? null;
}

export async function requireUser(): Promise<{ token: string; user: User }> {
  const token = await getAuthToken();
  if (!token) {
    redirect("/login");
  }
  const user = await AuthService.fetchMe(token);
  if (!user) {
    redirect("/login");
  }
  return { token, user };
}

export async function requireAdmin(): Promise<{ token: string; user: User }> {
  const { token, user } = await requireUser();
  if (user.role !== "admin") {
    redirect("/dashboard");
  }
  return { token, user };
}
