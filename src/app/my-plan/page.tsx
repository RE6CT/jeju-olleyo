import { Button } from '@/components/ui/button';
import PlanFilterSection from './_components/plan-filter-section';
import { getPlans } from '@/lib/apis/plan/plan';

const MyPlanPage = async () => {
  const userId = '37d2b9de-7a50-4a53-bb9c-b9cccbbe975a'; // TODO: 실제 로그인한 사용자 ID로 교체
  const plans = await getPlans(userId);

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">내 일정</h1>
          <Button>새 일정 만들기</Button>
        </div>
        <PlanFilterSection initialPlans={plans} />
      </div>
    </div>
  );
};

export default MyPlanPage;
