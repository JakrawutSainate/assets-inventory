import { getApiBaseUrl } from "@/config/app-config";
import type { User } from "@/models/User";

type MeResponse = {
  id: string;
  email: string;
  role: "admin" | "user";
  name: string;
  avatar_url: string;
};

function mapUser(m: MeResponse): User {
  return {
    id: m.id,
    email: m.email,
    role: m.role,
    name: m.name,
    avatarUrl: m.avatar_url || "",
  };
}

export class AuthService {
  static async fetchMe(token: string): Promise<User | null> {
    const res = await fetch(`${getApiBaseUrl()}/api/v1/auth/me`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });
    if (!res.ok) {
      return null;
    }
    const data = (await res.json()) as MeResponse;
    return mapUser(data);
  }
}
