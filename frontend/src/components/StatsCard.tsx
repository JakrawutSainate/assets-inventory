type StatsCardProps = {
  label: string;
  value: string;
  hint?: string;
};

export function StatsCard({ label, value, hint }: StatsCardProps) {
  return (
    <div className="rounded-2xl border border-slate-800/50 bg-slate-900/40 p-6">
      <p className="mb-4 text-xs font-bold uppercase tracking-widest text-slate-500">{label}</p>
      <h3 className="text-2xl font-bold tracking-tight text-slate-100">{value}</h3>
      {hint ? <p className="mt-2 text-xs text-slate-400">{hint}</p> : null}
    </div>
  );
}
