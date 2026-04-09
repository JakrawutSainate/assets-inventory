import { MyBorrowingsContent } from "@/components/user/my-borrowings/MyBorrowingsContent";
import { UserLayout } from "@/components/layout/UserLayout";
import { AuthService } from "@/services/AuthService";
import { BorrowService } from "@/services/BorrowService";

export default async function MyBorrowingsPage() {
  const user = await AuthService.getCurrentUser();
  const borrows = await BorrowService.getActiveBorrows();

  return (
    <UserLayout active="my-items" avatarUrl={user.avatarUrl}>
      <MyBorrowingsContent borrows={borrows} />
    </UserLayout>
  );
}
