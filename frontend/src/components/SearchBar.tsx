export function SearchBar() {
  return (
    <section className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-12">
      <div className="relative md:col-span-8">
        <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-slate-500">
          search
        </span>
        <input
          type="text"
          placeholder="Search by asset name, serial, or custodian..."
          className="w-full rounded-xl bg-slate-950 py-4 pr-4 pl-12 text-slate-100 placeholder:text-slate-500/60 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        />
      </div>

      <div className="flex gap-2 md:col-span-4">
        <button className="flex flex-1 items-center justify-between rounded-xl bg-slate-950 px-5 py-4 text-slate-300 transition-colors hover:bg-slate-800">
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">filter_list</span>
            Category
          </span>
          <span className="material-symbols-outlined">expand_more</span>
        </button>
        <button className="rounded-xl bg-slate-950 px-5 py-4 text-slate-300 transition-colors hover:bg-slate-800">
          <span className="material-symbols-outlined">tune</span>
        </button>
      </div>
    </section>
  );
}
