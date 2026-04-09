import { Plus } from "lucide-react";

type PageHeaderProps = {
  title: string;
  description: string;
  actionLabel: string;
};

export function PageHeader({ title, description, actionLabel }: PageHeaderProps) {
  return (
    <header className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="max-w-2xl">
        <h2 className="mb-2 text-4xl font-bold tracking-tighter text-slate-900 dark:text-slate-100">
          {title}
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">{description}</p>
      </div>

      <button className="flex items-center gap-2 rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-500 px-6 py-3 font-semibold text-white shadow-xl shadow-indigo-900/30 transition-transform hover:scale-[1.02] active:scale-95">
        <Plus size={16} />
        <span>{actionLabel}</span>
      </button>
    </header>
  );
}
