import Link from "next/link";

import { LoginHero } from "@/components/login/LoginHero";
import { LoginVisualPanel } from "@/components/login/LoginVisualPanel";
import { RegisterFormCard } from "@/components/register/RegisterFormCard";

export default async function RegisterPage() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-slate-50 selection:bg-emerald-200 selection:text-emerald-900">
      <div className="pointer-events-none absolute top-0 left-0 -z-10 h-full w-full overflow-hidden opacity-40">
        <div className="absolute -top-[10%] -left-[5%] h-[60%] w-[40%] rounded-full bg-slate-200 blur-[120px]" />
        <div className="absolute -right-[5%] -bottom-[10%] h-[60%] w-[40%] rounded-full bg-emerald-200 opacity-30 blur-[120px]" />
      </div>

      <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <Link href="/login" className="text-sm font-bold text-indigo-700 hover:underline dark:text-indigo-400">
              ← Back to sign in
            </Link>
          </div>
          <LoginHero title="Create your profile" subtitle="Join the custodial workspace and browse shared assets." />
          <RegisterFormCard />
        </div>
      </div>
      <LoginVisualPanel />
    </main>
  );
}
