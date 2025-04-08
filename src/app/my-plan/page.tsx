import { Button } from '@/components/ui/button';
import PlanFilterSection from './_components/plan-filter-section';
import { fetchGetAllPlansByUserId } from '@/lib/apis/plan/plan.api';
import { fetchGetCurrentUser } from '@/lib/apis/auth-server.api';
import ErrorMessage from '@/components/ui/error-message';

const MyPlanPage = async () => {
  const { user, error: userError } = await fetchGetCurrentUser();

  if (userError) {
    return (
      <ErrorMessage
        title="사용자 정보 조회 실패"
        description={userError.message}
      />
    );
  }

  const userId = user?.id;

  if (!userId) {
    return (
      <ErrorMessage
        title="로그인 필요"
        description="일정을 보려면 로그인이 필요합니다."
      />
    );
  }

  try {
    const plans = await fetchGetAllPlansByUserId(userId);

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
  } catch (error) {
    return (
      <ErrorMessage
        title="일정 목록 조회 실패"
        description="일정 목록을 불러오는데 실패했습니다. 다시 시도해주세요."
      />
    );
  }
};

export default MyPlanPage;
