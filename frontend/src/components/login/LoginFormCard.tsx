import Link from "next/link";

import { FormInput } from "@/components/FormInput";

export function LoginFormCard() {
  return (
    <div className="group relative rounded-xl bg-white p-8 shadow-[0_20px_40px_rgba(13,28,46,0.06)] transition-colors duration-200 dark:bg-slate-900 dark:shadow-none">
      <div className="absolute -top-3 -right-3 rounded-full bg-linear-to-br from-indigo-700 to-indigo-500 px-4 py-1.5 shadow-lg">
        <span className="text-[10px] font-bold tracking-widest text-white uppercase">
          Portal Access
        </span>
      </div>

      <form className="space-y-6">
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          placeholder="name@organization.com"
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          placeholder="********"
          labelAction={
            <a href="#" className="text-xs font-bold text-indigo-700 transition-colors hover:text-indigo-500">
              Forgot Access?
            </a>
          }
        />

        <div className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-3">
            <Link
              href="/admin/dashboard"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-br from-indigo-700 to-indigo-500 px-6 py-4 font-bold text-white shadow-lg transition-all hover:shadow-indigo-500/20 active:scale-[0.98]"
            >
              <span>Login as Admin</span>
              <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                shield_person
              </span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-100 px-6 py-4 font-bold text-indigo-900 transition-all hover:bg-indigo-200 active:scale-[0.98] dark:bg-indigo-900/50 dark:text-indigo-200 dark:hover:bg-indigo-900/70"
            >
              <span>Login as User</span>
              <span className="material-symbols-outlined text-lg">person</span>
            </Link>
          </div>
        </div>
      </form>

      <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row dark:border-slate-700">
        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Secured by Vanguard Protocol</span>
        <div className="flex gap-4">
          <span className="h-2 w-2 rounded-full bg-indigo-700" />
          <span className="h-2 w-2 rounded-full bg-slate-300" />
          <span className="h-2 w-2 rounded-full bg-slate-300" />
        </div>
      </div>
    </div>
  );
}
