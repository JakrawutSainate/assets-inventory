import type { User } from "@/models/User";
import { getAuthGrpcClient } from "@/services/grpc/grpcClients";
import { mapPublicUserToUser } from "@/services/grpc/authActions";
import { bearerMetadata, unaryPromise } from "@/services/grpc/grpc-unary";

type PublicUserPb = {
  id: string;
  email: string;
  role: string;
  name: string;
  avatar_url: string;
};

export class AuthService {
  /** Server-only: `AuthService.Me` with Bearer metadata. */
  static async fetchMe(token: string): Promise<User | null> {
    try {
      const client = getAuthGrpcClient();
      const reply = await unaryPromise<{ user?: PublicUserPb }>((cb) =>
        (client as any).me({}, bearerMetadata(token), cb),
      );
      const u = reply.user;
      if (!u) {
        return null;
      }
      return mapPublicUserToUser(u);
    } catch {
      return null;
    }
  }
}
