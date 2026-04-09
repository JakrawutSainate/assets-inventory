import Image from "next/image";

import { UserLayout } from "@/components/layout/UserLayout";
import { GradientButton } from "@/components/ui/GradientButton";
import { PageIntro } from "@/components/ui/PageIntro";
import { AuthService } from "@/services/AuthService";
import { BorrowService } from "@/services/BorrowService";

export default async function MyBorrowingsPage() {
  const user = await AuthService.getCurrentUser();
  const borrows = await BorrowService.getActiveBorrows();

  return (
    <UserLayout active="my-items" avatarUrl={user.avatarUrl}>
      <PageIntro
        className="mb-12"
        title="My Borrowings"
        description="Manage your active asset lifecycle and track upcoming return deadlines."
      />

      <div className="grid grid-cols-1 gap-6">
        {borrows.map((borrow) => (
          <article key={borrow.id} className="group flex flex-col overflow-hidden rounded-xl bg-white md:flex-row">
            <div className="relative h-48 overflow-hidden md:h-auto md:w-64">
              <Image src={borrow.assetImageUrl} alt={borrow.assetName} fill sizes="260px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col justify-between gap-6 p-8">
              <div className="flex flex-col items-start justify-between gap-4 md:flex-row">
                <div>
                  <h2 className="text-[1.375rem] font-bold tracking-tight">{borrow.assetName}</h2>
                  <p className="mt-2 text-sm text-slate-500">{borrow.category}</p>
                </div>
                <div className="text-right">
                  <span className="block text-xs font-bold tracking-widest text-slate-500 uppercase">Due Date</span>
                  <span className="text-xl font-black tracking-tighter">{borrow.dueAt}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="rounded-full bg-indigo-100 px-6 py-2.5 text-xs font-bold text-indigo-900">Extend</button>
                <GradientButton className="rounded-full px-6 py-2.5 text-xs">Return</GradientButton>
              </div>
            </div>
          </article>
        ))}
      </div>
    </UserLayout>
  );
}
