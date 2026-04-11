import Image, { type ImageProps } from "next/image";

/**
 * Remote asset photos (e.g. lh3.googleusercontent.com) often return **400** to Next.js
 * image optimization (server-side fetch). `unoptimized` lets the browser load the URL
 * directly and avoids broken thumbnails.
 */
export function RemoteAssetImage(props: ImageProps) {
  return <Image {...props} unoptimized />;
}
