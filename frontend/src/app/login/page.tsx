import { FormInput } from "@/components/FormInput";

export default async function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 p-6 sm:p-12">
      <div className="w-full max-w-md">
        <div className="mb-12">
          <h1 className="mb-2 text-4xl font-bold tracking-tight text-slate-900">Welcome Back.</h1>
          <p className="text-sm font-medium text-slate-500">
            Please enter your credentials to access the ledger.
          </p>
        </div>

        <div className="relative rounded-xl bg-white p-8 shadow-[0_20px_40px_rgba(13,28,46,0.06)]">
          <div className="absolute -top-3 -right-3 rounded-full bg-gradient-to-br from-indigo-700 to-indigo-500 px-4 py-1.5">
            <span className="text-[10px] font-bold tracking-widest text-white uppercase">
              Portal Access
            </span>
          </div>
          <form className="space-y-6">
            <FormInput id="email" label="Email Address" type="email" placeholder="name@organization.com" />
            <FormInput id="password" label="Password" type="password" placeholder="••••••••" />
            <div className="space-y-3 pt-2">
              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-indigo-700 to-indigo-500 px-6 py-4 font-bold text-white">
                Login as Admin
              </button>
              <button className="w-full rounded-xl bg-indigo-100 px-6 py-4 font-bold text-indigo-900">
                Login as User
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
