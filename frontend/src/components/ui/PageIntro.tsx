type PageIntroProps = {
  title: string;
  description: string;
  eyebrow?: string;
  className?: string;
};

export function PageIntro({
  title,
  description,
  eyebrow,
  className = "",
}: PageIntroProps) {
  return (
    <header className={className}>
      {eyebrow ? (
        <span className="mb-2 block text-xs font-semibold tracking-widest text-indigo-400 uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-slate-900">{title}</h1>
      <p className="max-w-2xl text-sm font-medium text-slate-500">{description}</p>
    </header>
  );
}
