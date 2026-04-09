import Link from "next/link";

export default async function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-8">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Fluid Custodian</h1>
        <p className="text-slate-500">Choose an entry point.</p>
        <div className="flex justify-center gap-3">
          <Link className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-bold text-white" href="/login">
            Login
          </Link>
          <Link className="rounded-lg bg-slate-200 px-5 py-3 text-sm font-bold text-slate-800" href="/dashboard">
            User Dashboard
          </Link>
          <Link className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-bold text-white" href="/admin/dashboard">
            Admin Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
