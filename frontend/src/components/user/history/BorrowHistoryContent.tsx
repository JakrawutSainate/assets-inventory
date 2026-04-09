import { Borrow } from "@/models/Borrow";
import { Asset } from "@/models/Asset";

type BorrowHistoryContentProps = {
  history: Borrow[];
  assets: Asset[];
};

export function BorrowHistoryContent({ history, assets }: BorrowHistoryContentProps) {
  const assetMap = new Map(assets.map((asset) => [asset.id, asset]));

  return (
    <>
      <header className="mb-12">
        <h1 className="text-5xl font-extrabold tracking-tight text-on-surface">Borrowing History</h1>
      </header>
      <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-[0_20px_40px_rgba(13,28,46,0.06)]">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-surface-container-low">
              <th className="px-8 py-5 text-xs uppercase tracking-widest text-on-surface-variant">Asset</th>
              <th className="px-6 py-5 text-xs uppercase tracking-widest text-on-surface-variant">Date Borrowed</th>
              <th className="px-6 py-5 text-xs uppercase tracking-widest text-on-surface-variant">Date Returned</th>
              <th className="px-8 py-5 text-right text-xs uppercase tracking-widest text-on-surface-variant">Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => {
              const asset = assetMap.get(item.assetId);
              if (!asset) return null;
              return (
                <tr key={item.id} className="border-t border-outline-variant/10">
                  <td className="px-8 py-6 font-bold">{asset.name}</td>
                  <td className="px-6 py-6">{item.requestedAtLabel}</td>
                  <td className="px-6 py-6">{item.returnDateLabel}</td>
                  <td className="px-8 py-6 text-right">{item.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
