import Image from "next/image";

import type { RecentHandler } from "@/components/admin/dashboard/parts/types";

type RecentHandlerItemProps = {
  handler: RecentHandler;
};

export function RecentHandlerItem({ handler }: RecentHandlerItemProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <Image
          src={handler.avatar}
          alt={handler.name}
          width={44}
          height={44}
          className="h-11 w-11 rounded-full object-cover"
        />
        <span
          className={[
            "absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white dark:border-slate-900",
            handler.online ? "bg-emerald-500" : "bg-slate-500",
          ].join(" ")}
        />
      </div>
      <div className="flex-1">
        <p className="text-sm font-bold">{handler.name}</p>
        <p className="text-[10px] text-slate-500">{handler.action}</p>
      </div>
      <span className="text-[10px] text-slate-500">{handler.time}</span>
    </div>
  );
}
