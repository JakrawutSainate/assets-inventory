import { UserLayout } from "@/components/layout/UserLayout";
import { BorrowHistoryContent } from "@/components/user/history/BorrowHistoryContent";
import { BorrowService } from "@/services/BorrowService";
import { AssetService } from "@/services/AssetService";

export default async function BorrowHistoryPage() {
  const [history, assets] = await Promise.all([BorrowService.getBorrowHistory(), AssetService.getAllAssets()]);

  return (
    <UserLayout activePath="/history">
      <BorrowHistoryContent history={history} assets={assets} />
    </UserLayout>
  );
}
