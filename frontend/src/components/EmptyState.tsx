import { Inbox } from "lucide-react";

export function EmptyState({ title }: { title: string }) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
      <Inbox className="mb-3 size-8 text-muted-foreground" />
      <p className="text-xl font-semibold">{title}</p>
      <p className="text-sm text-muted-foreground">No requests available</p>
    </div>
  );
}
