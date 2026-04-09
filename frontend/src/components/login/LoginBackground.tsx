export function LoginBackground() {
  return (
    <div className="absolute left-0 top-0 -z-10 h-full w-full overflow-hidden opacity-40">
      <div className="absolute -left-[5%] -top-[10%] h-[60%] w-[40%] rounded-full bg-surface-container blur-[120px]" />
      <div className="absolute -bottom-[10%] -right-[5%] h-[60%] w-[40%] rounded-full bg-secondary-container opacity-30 blur-[120px]" />
    </div>
  );
}
