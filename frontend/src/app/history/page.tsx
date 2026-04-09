import { BorrowHistoryContent } from "@/components/user/history/BorrowHistoryContent";
import { UserLayout } from "@/components/layout/UserLayout";
import { AuthService } from "@/services/AuthService";
import { BorrowService } from "@/services/BorrowService";

export default async function HistoryPage() {
  const user = await AuthService.getCurrentUser();
  const history = await BorrowService.getHistory();

  return (
    <UserLayout active="activity" avatarUrl={user.avatarUrl}>
      <BorrowHistoryContent history={history} />
    </UserLayout>
  );
}
