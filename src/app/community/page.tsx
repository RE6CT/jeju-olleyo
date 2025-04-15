import JejuBanner from '@/components/features/banner/jeju-banner';
import { PATH } from '@/constants/path.constants';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import { fetchAllPlans } from '@/lib/apis/plan/plan.api';
import PlanVerticalCard from '@/components/features/card/plan-vertical-card';

const Community = async () => {
  const user = await fetchGetCurrentUser();
  const userId = user.user?.id || null;

  const plans = await fetchAllPlans(userId);

  return (
    <>
      <JejuBanner
        imageUrl="/banner-images/plan-banner.svg"
        title="나만의 제주 여행 계획하기"
        buttonText="내 일정 만들러 가기"
        buttonUrl={PATH.PLAN_NEW}
      />
      <div className="flex w-full max-w-[1024px] flex-col gap-3 p-9">
        <h2 className="semibold-22">올레 인기 일정</h2>
        <div className="grid w-full grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2 md:grid-cols-3">
          {plans.map((plan) => (
            <PlanVerticalCard key={plan.planId} plan={plan} userId={userId} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Community;
