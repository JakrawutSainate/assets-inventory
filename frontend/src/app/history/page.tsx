import { BorrowHistoryContent } from "@/components/user/history/BorrowHistoryContent";
import { UserLayout } from "@/components/layout/UserLayout";
import { requireUser } from "@/lib/auth-server";
import { BorrowService } from "@/services/BorrowService";

export default async function HistoryPage() {
  const { user } = await requireUser();
  const history = await BorrowService.getHistory();

  return (
    <UserLayout active="activity" avatarUrl={user.avatarUrl}>
      <BorrowHistoryContent history={history} />
    </UserLayout>
  );
}
