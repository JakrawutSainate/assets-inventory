type AssetSpecCardProps = {
  label: string;
  value: string;
};

export function AssetSpecCard({ label, value }: AssetSpecCardProps) {
  return (
    <div className="rounded-lg bg-slate-100 p-4">
      <span className="text-xs text-slate-500">{label}</span>
      <p className="font-semibold text-slate-900">{value}</p>
    </div>
  );
}
