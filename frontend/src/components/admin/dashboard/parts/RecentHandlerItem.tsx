import { User } from "lucide-react";

import { RemoteAssetImage } from "@/components/ui/RemoteAssetImage";
import type { RecentHandler } from "@/components/admin/dashboard/parts/types";

type RecentHandlerItemProps = {
  handler: RecentHandler;
};

export function RecentHandlerItem({ handler }: RecentHandlerItemProps) {
  const hasAvatar = handler.avatar.trim().length > 0;

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
        {hasAvatar ? (
          <RemoteAssetImage
            src={handler.avatar}
            alt=""
            fill
            sizes="44px"
            className="object-cover"
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center bg-indigo-100 dark:bg-indigo-900/50">
            <User size={18} className="text-indigo-700 dark:text-indigo-300" aria-hidden />
          </span>
        )}
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
