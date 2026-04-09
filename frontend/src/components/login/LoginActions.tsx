import Link from "next/link";

export function LoginActions() {
  return (
    <div className="space-y-3 pt-4">
      <Link
        href="/admin/dashboard"
        className="block w-full rounded-xl bg-gradient-to-br from-primary to-primary-container px-6 py-4 text-center font-bold text-white shadow-lg hover:opacity-90"
      >
        Login as Admin
      </Link>
      <Link
        href="/dashboard"
        className="block w-full rounded-xl bg-secondary-container px-6 py-4 text-center font-bold text-on-surface hover:opacity-90"
      >
        Login as User
      </Link>
    </div>
  );
}
