import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
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

  return (
    <div className="flex flex-col">
      <span className="text-28 font-bold">일정 보기</span>
    </div>
  );
};

export default PlanDetailPage;
