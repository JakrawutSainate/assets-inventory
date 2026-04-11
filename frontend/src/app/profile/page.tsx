import { UserLayout } from "@/components/layout/UserLayout";
import { requireUser } from "@/lib/auth-server";

export default async function ProfilePage() {
  const { user } = await requireUser();

  return (
    <UserLayout active="my-items" avatarUrl={user.avatarUrl}>
      <section className="rounded-xl bg-white p-8 shadow-[0_20px_40px_rgba(13,28,46,0.06)] dark:bg-slate-900 dark:shadow-none">
        <h1 className="mb-2 text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
          Profile
        </h1>
        <p className="mb-8 text-slate-600 dark:text-slate-400">Manage your personal account details.</p>

        <div className="space-y-4">
          <div>
            <p className="text-xs tracking-widest text-slate-500 uppercase dark:text-slate-400">Name</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{user.name}</p>
          </div>
          <div>
            <p className="text-xs tracking-widest text-slate-500 uppercase dark:text-slate-400">Email</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{user.email}</p>
          </div>
          <div>
            <p className="text-xs tracking-widest text-slate-500 uppercase dark:text-slate-400">Role</p>
            <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{user.role}</p>
          </div>
        </div>
      </section>
    </UserLayout>
  );
}
