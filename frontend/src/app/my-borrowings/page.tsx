import { UserLayout } from "@/components/layout/UserLayout";
import { MyBorrowingsContent } from "@/components/user/my-borrowings/MyBorrowingsContent";
import { BorrowService } from "@/services/BorrowService";
import { AssetService } from "@/services/AssetService";

export default async function MyBorrowingsPage() {
  const [myBorrowings, assets] = await Promise.all([BorrowService.getMyBorrowings(), AssetService.getAllAssets()]);

  return (
    <UserLayout activePath="/my-borrowings">
      <MyBorrowingsContent borrowings={myBorrowings} assets={assets} />
    </UserLayout>
  );
}
