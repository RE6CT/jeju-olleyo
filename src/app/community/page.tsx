import JejuBanner from '@/components/features/banner/jeju-banner';
import { PATH } from '@/constants/path.constants';
import Link from 'next/link';
import Duration from '@/components/commons/duration';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import { fetchAllPlans } from '@/lib/apis/plan/plan.api';
import PlanImage from '@/components/commons/plan-image';

const Community = async () => {
  const user = await fetchGetCurrentUser();
  const userId = user.user?.id || null;

  const plans = await fetchAllPlans(userId);

  return (
    <>
      <JejuBanner
        imageUrl="/images/jeju-banner.png"
        title="나만의 제주 여행 계획하기"
        buttonText="내 일정 만들러 가기"
        buttonUrl={PATH.PLAN_NEW}
      />
      <div className="flex w-full max-w-[1024px] flex-col gap-3 p-9">
        <h2 className="semibold-22">올레 인기 일정</h2>
        <div className="grid w-full grid-cols-2 gap-x-3 gap-y-5 sm:grid-cols-3">
          {plans.map((plan) => (
            <Link href={`/plan-detail/${plan.planId}`} key={plan.planId}>
              <div className="relative aspect-[310/216]">
                <PlanImage
                  image={plan.planImg}
                  title={plan.title}
                  className="rounded-12"
                />
              </div>

              <div className="flex flex-col gap-1 p-2">
                <p className="medium-16 line-clamp-1">{plan.title}</p>
                <p className="regular-14 text-description line-clamp-2">
                  {plan.description}
                </p>
                <div className="medium-12 flex items-center gap-2 text-gray-500">
                  <span>{plan.nickname}</span>
                  <Duration
                    start={plan.travelStartDate}
                    end={plan.travelEndDate}
                    separator="-"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Community;
