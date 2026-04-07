import { cn } from "@/lib/utils";
import * as React from "react";

export function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold", className)}
      {...props}
    />
  );
}
