import Image from "next/image";

import type { Borrow } from "@/models/Borrow";

type BorrowHistoryContentProps = {
  history: Borrow[];
};

function currency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function BorrowHistoryContent({ history }: BorrowHistoryContentProps) {
  return (
    <>
      <header className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <span className="mb-2 block text-xs font-bold tracking-widest text-indigo-700 uppercase">
            Custodial Records
          </span>
          <h1 className="text-5xl font-extrabold tracking-tight">Borrowing History</h1>
        </div>
      </header>

      <div className="overflow-x-auto rounded-xl bg-white shadow-[0_20px_40px_rgba(13,28,46,0.06)]">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b bg-slate-100">
              <th className="px-8 py-5 text-xs font-bold tracking-widest text-slate-500 uppercase">Asset</th>
              <th className="px-6 py-5 text-xs font-bold tracking-widest text-slate-500 uppercase">
                Borrowed
              </th>
              <th className="px-6 py-5 text-xs font-bold tracking-widest text-slate-500 uppercase">
                Returned
              </th>
              <th className="px-6 py-5 text-xs font-bold tracking-widest text-slate-500 uppercase">
                Savings
              </th>
              <th className="px-8 py-5 text-right text-xs font-bold tracking-widest text-slate-500 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item.id} className="border-b border-slate-100">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-lg bg-slate-100">
                      <Image src={item.assetImageUrl} alt={item.assetName} width={48} height={48} />
                    </div>
                    <div>
                      <div className="font-bold">{item.assetName}</div>
                      <div className="text-xs text-slate-500">{item.category}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 text-sm text-slate-500">{item.borrowedAt}</td>
                <td className="px-6 py-6 text-sm text-slate-500">{item.returnedAt ?? "-"}</td>
                <td className="px-6 py-6 font-bold text-indigo-700">{currency(item.savingsUsd)}</td>
                <td className="px-8 py-6 text-right">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
