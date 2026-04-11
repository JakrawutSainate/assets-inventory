import * as grpc from "@grpc/grpc-js";

/** Metadata matching Rust `authorization: Bearer <jwt>`. */
export function bearerMetadata(token: string): grpc.Metadata {
  const m = new grpc.Metadata();
  m.set("authorization", `Bearer ${token}`);
  return m;
}

/** Wrap grpc-js unary callback API in a Promise. */
export function unaryPromise<T>(
  invoke: (cb: (err: grpc.ServiceError | null, res: T) => void) => void,
): Promise<T> {
  return new Promise((resolve, reject) => {
    invoke((err, res) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(res as T);
    });
  });
}
