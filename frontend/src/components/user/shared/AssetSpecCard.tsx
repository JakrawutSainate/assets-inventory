type AssetSpecCardProps = {
  label: string;
  value: string;
};

export function AssetSpecCard({ label, value }: AssetSpecCardProps) {
  return (
    <div className="rounded-lg bg-slate-100 p-4 transition-colors duration-200 dark:bg-slate-800">
      <span className="text-xs text-slate-500 dark:text-slate-400">{label}</span>
      <p className="font-semibold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}
