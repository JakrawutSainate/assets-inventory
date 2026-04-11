import * as grpc from "@grpc/grpc-js";

import type { User } from "@/models/User";

import { getAuthGrpcClient } from "@/services/grpc/grpcClients";
import { unaryPromise } from "@/services/grpc/grpc-unary";

type PublicUserPb = {
  id: string;
  email: string;
  role: string;
  name: string;
  avatar_url: string;
};

export function mapPublicUserToUser(u: PublicUserPb): User {
  return {
    id: u.id,
    email: u.email,
    role: u.role === "admin" ? "admin" : "user",
    name: u.name,
    avatarUrl: u.avatar_url ?? "",
  };
}

export async function grpcAuthLogin(
  email: string,
  password: string,
): Promise<{ token: string; user: User }> {
  const client = getAuthGrpcClient();
  const reply = await unaryPromise<{ token: string; user?: PublicUserPb }>((cb) =>
    (client as any).login({ email, password }, cb),
  );
  if (!reply.token || !reply.user) {
    throw new Error("invalid auth reply");
  }
  return { token: reply.token, user: mapPublicUserToUser(reply.user) };
}

export async function grpcAuthRegister(
  email: string,
  password: string,
  name?: string,
): Promise<{ token: string; user: User }> {
  const client = getAuthGrpcClient();
  const req: { email: string; password: string; name?: string } = { email, password };
  if (name !== undefined && name !== "") {
    req.name = name;
  }
  const reply = await unaryPromise<{ token: string; user?: PublicUserPb }>((cb) =>
    (client as any).register(req, cb),
  );
  if (!reply.token || !reply.user) {
    throw new Error("invalid auth reply");
  }
  return { token: reply.token, user: mapPublicUserToUser(reply.user) };
}

export function grpcStatus(err: unknown): number | undefined {
  if (typeof err === "object" && err !== null && "code" in err) {
    return (err as grpc.ServiceError).code;
  }
  return undefined;
}
