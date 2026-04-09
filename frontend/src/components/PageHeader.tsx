type PageHeaderProps = {
  title: string;
  description: string;
  badge?: string;
  action?: React.ReactNode;
};

export function PageHeader({ title, description, badge, action }: PageHeaderProps) {
  return (
    <header className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <div className="max-w-2xl">
        {badge ? <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-indigo-400">{badge}</span> : null}
        <h1 className="mb-2 text-4xl font-bold tracking-tighter text-white">{title}</h1>
        <p className="text-lg text-slate-400">{description}</p>
      </div>
      {action}
    </header>
  );
}
