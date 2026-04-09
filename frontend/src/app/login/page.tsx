import { LoginFormCard } from "@/components/login/LoginFormCard";
import { LoginHero } from "@/components/login/LoginHero";
import { LoginVisualPanel } from "@/components/login/LoginVisualPanel";

export default async function LoginPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-slate-50 selection:bg-indigo-200 selection:text-indigo-900">
      <div className="pointer-events-none absolute top-0 left-0 -z-10 h-full w-full overflow-hidden opacity-40">
        <div className="absolute -top-[10%] -left-[5%] h-[60%] w-[40%] rounded-full bg-slate-200 blur-[120px]" />
        <div className="absolute -right-[5%] -bottom-[10%] h-[60%] w-[40%] rounded-full bg-indigo-200 opacity-30 blur-[120px]" />
      </div>

      <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
      <div className="w-full max-w-md">
        <LoginHero />
        <LoginFormCard />
        <div className="mt-8 flex justify-center gap-6 text-xs font-bold text-slate-500 opacity-60">
          <a className="transition-colors hover:text-indigo-700" href="#">
            Terms of Service
          </a>
          <a className="transition-colors hover:text-indigo-700" href="#">
            Privacy Policy
          </a>
          <a className="transition-colors hover:text-indigo-700" href="#">
            System Health
          </a>
        </div>
      </div>
      </div>
      <LoginVisualPanel />
    </main>
  );
}
