import { LoginForm } from "@/components/login/LoginForm";

export function LoginCard() {
  return (
    <div className="relative rounded-xl bg-surface-container-lowest p-8 shadow-[0_20px_40px_rgba(13,28,46,0.06)]">
      <div className="absolute -right-3 -top-3 rounded-full bg-gradient-to-br from-primary to-primary-container px-4 py-1.5 shadow-lg">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white">Portal Access</span>
      </div>

      <LoginForm />

      <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-surface-container pt-8 sm:flex-row">
        <span className="text-xs font-medium text-on-surface-variant">Secured by Vanguard Protocol</span>
        <div className="flex gap-4">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="h-2 w-2 rounded-full bg-outline-variant opacity-30" />
          <span className="h-2 w-2 rounded-full bg-outline-variant opacity-30" />
        </div>
      </div>
    </div>
  );
}
