import { ChevronDown, Filter, Search, SlidersHorizontal } from "lucide-react";

export function SearchBar() {
  return (
    <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-12">
      <div className="relative md:col-span-8">
        <Search size={16} className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-500 dark:text-slate-500" />
        <input
          type="text"
          placeholder="Search by asset name, serial, or custodian..."
          className="w-full rounded-xl bg-slate-100 py-4 pr-4 pl-12 text-slate-900 placeholder:text-slate-500/80 focus:ring-2 focus:ring-indigo-500 focus:outline-none dark:bg-slate-950 dark:text-slate-100 dark:placeholder:text-slate-500/60"
        />
      </div>

      <div className="flex gap-2 md:col-span-4">
        <button className="flex flex-1 items-center justify-between rounded-xl bg-slate-100 px-5 py-4 text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800">
          <span className="flex items-center gap-2">
            <Filter size={14} />
            Category
          </span>
          <ChevronDown size={16} />
        </button>
        <button className="rounded-xl bg-slate-100 px-5 py-4 text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-800">
          <SlidersHorizontal size={16} />
        </button>
      </div>
    </section>
  );
}
