type SearchBarProps = {
  placeholder: string;
};

export function SearchBar({ placeholder }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <input
        className="w-full rounded-xl bg-slate-900 py-4 pl-12 pr-4 text-inverse-on-surface placeholder:text-outline-variant/50 focus:ring-2 focus:ring-primary"
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
}
