export function LoginHero() {
  return (
    <div className="mb-12 text-center md:text-left">
      <div className="mb-4 flex items-center justify-center gap-3 md:justify-start">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-container text-white shadow-[0_10px_20px_rgba(53,37,205,0.2)]">
          <span className="text-2xl">◈</span>
        </div>
        <span className="text-2xl font-black tracking-tighter text-on-surface">Fluid Custodian</span>
      </div>
      <h1 className="mb-2 text-4xl font-bold tracking-tight text-on-surface">Welcome Back.</h1>
      <p className="text-sm font-medium text-on-surface-variant">Please enter your credentials to access the ledger.</p>
    </div>
  );
}
