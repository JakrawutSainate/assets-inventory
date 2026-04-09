import { Borrow } from "@/models/Borrow";
import { Asset } from "@/models/Asset";

type MyBorrowingsContentProps = {
  borrowings: Borrow[];
  assets: Asset[];
};

export function MyBorrowingsContent({ borrowings, assets }: MyBorrowingsContentProps) {
  const assetMap = new Map(assets.map((asset) => [asset.id, asset]));

  return (
    <>
      <header className="mb-12">
        <h1 className="text-[2.25rem] font-extrabold tracking-tight">My Borrowings</h1>
      </header>
      <div className="space-y-6">
        {borrowings.map((item) => {
          const asset = assetMap.get(item.assetId);
          if (!asset) return null;
          return (
            <article key={item.id} className="flex flex-col overflow-hidden rounded-xl bg-surface-container-lowest md:flex-row">
              <img className="h-48 w-full object-cover md:h-auto md:w-64" src={asset.imageUrl} alt={asset.name} />
              <div className="flex-1 p-8">
                <h2 className="text-[1.375rem] font-bold tracking-tight">{asset.name}</h2>
                <p className="text-sm text-on-surface-variant">Due: {item.dueDateLabel}</p>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
