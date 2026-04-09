import { cn } from "@/lib/utils";
import * as React from "react";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        "border-white/10 bg-white/5 backdrop-blur",
        className,
      )}
      {...props}
    />
  );
}
