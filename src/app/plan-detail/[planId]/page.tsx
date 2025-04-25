import Image from 'next/image';
import { Metadata } from 'next';

import PlanForm from '@/app/plan-detail/_components/client/plan-form';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import {
  fetchGetPlanById,
  fetchGetPlanDaysAndLocations,
} from '@/lib/apis/plan/plan.api';
import { PLAN_PAGE_META } from '@/constants/plan.constants';

import NotFound from '@/app/plan-detail/_components/server/not-found';

export async function generateMetadata({
  params,
}: {
  params: { planId: string };
}): Promise<Metadata> {
  const planId = parseInt(params.planId);
  const plan = await fetchGetPlanById(planId);

  return {
    title: plan.title
      ? `${plan.title} | 제주올래`
      : PLAN_PAGE_META.DEFAULT.title,
    description: plan.description || PLAN_PAGE_META.DEFAULT.description,
  };
}

const PlanDetailPage = async ({
  params,
  searchParams,
}: {
  params: { planId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const HAPPY_IMAGE = {
    width: 37,
    height: 36,
  };

  try {
    // 병렬로 API 호출 실행
    const [plan, { user }, dayPlaces] = await Promise.all([
      fetchGetPlanById(Number(params.planId)),
      fetchGetCurrentUser(),
      fetchGetPlanDaysAndLocations(Number(params.planId)),
    ]);

    const userId = user?.id;

    const initialPlan = {
      planId: plan.planId,
      userId: plan.userId,
      title: plan.title,
      description: plan.description,
      travelStartDate: plan.travelStartDate,
      travelEndDate: plan.travelEndDate,
      planImg: plan.planImg,
      public: plan.public,
    };

    const isOwner = plan.userId === userId;
    const isReadOnly = searchParams.isReadOnly === 'true' || !isOwner;

    return (
      <div className="flex flex-col">
        <div className="border-b px-9">
          {/* 헤더 영역 */}
          {!isReadOnly && (
            <div className="flex gap-3 pt-6">
              <span className="text-28 font-bold leading-[130%]">
                내 일정 수정하기
              </span>
              <Image
                src="/character/happy_color.svg"
                alt="happy icon"
                width={HAPPY_IMAGE.width}
                height={HAPPY_IMAGE.height}
              />
            </div>
          )}
          <PlanForm
            initialPlan={initialPlan}
            initialDayPlaces={dayPlaces}
            isReadOnly={isReadOnly}
          />
        </div>
      </div>
    );
  } catch {
    // 일정을 찾을 수 없는 경우
    return <NotFound />;
  }
};

export default PlanDetailPage;
