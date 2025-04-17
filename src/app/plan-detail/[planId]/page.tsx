import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import { fetchGetPlanById } from '@/lib/apis/plan/plan.api';
import ErrorMessage from '@/components/features/alert/error-message';

const PlanDetailPage = async ({ params }: { params: { planId: string } }) => {
  const { user } = await fetchGetCurrentUser();
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
    const plan = await fetchGetPlanById(Number(params.planId));

    return (
      <div className="flex flex-col">
        <span className="text-28 font-bold">일정 보기</span>
        <div className="mt-4">
          <h2 className="text-24 font-semibold">{plan.title}</h2>
          <p className="mt-2 text-gray-600">{plan.description}</p>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <ErrorMessage
        title="일정 조회 실패"
        description="일정을 불러오는데 실패했습니다. 다시 시도해주세요."
      />
    );
  }
};

export default PlanDetailPage;
