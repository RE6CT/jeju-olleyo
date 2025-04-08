import { Button } from '@/components/ui/button';
import PlanFilterSection from './_components/plan-filter-section';
import { getPlans } from '@/lib/apis/plan/plan';
import { fetchGetCurrentUser } from '@/lib/apis/auth-server.api';

const MyPlanPage = async () => {
  const { user } = await fetchGetCurrentUser();
  const userId = user?.id;

  if (!userId) {
    return <div>로그인이 필요합니다.</div>;
  }

  const plans = await getPlans(userId);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">내 일정</h1>
          <Button>새 일정 만들기</Button>
        </div>
        <PlanFilterSection initialPlans={plans} userId={userId} />
      </div>
    </div>
  );
};

export default MyPlanPage;
