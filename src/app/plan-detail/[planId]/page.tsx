import Image from 'next/image';

import PlanForm from '@/app/plan-detail/_components/plan-form';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import {
  fetchGetPlanById,
  fetchGetPlanDaysAndLocations,
} from '@/lib/apis/plan/plan.api';

import NotFound from '../not-found';

const PlanDetailPage = async ({ params }: { params: { planId: string } }) => {
  const HAPPY_IMAGE = {
    width: 37,
    height: 36,
  };

  try {
    // 먼저 일정 정보를 가져옵니다.
    const plan = await fetchGetPlanById(Number(params.planId));

    // 현재 로그인한 사용자 정보를 가져옵니다.
    const { user } = await fetchGetCurrentUser();
    const userId = user?.id;

    // 비공개 일정인 경우 로그인 필수
    if (!plan.public) {
      // 로그인하지 않은 경우
      if (!userId) {
        return <NotFound />;
      }
      // 작성자가 아닌 경우
      if (plan.userId !== userId) {
        return <NotFound />;
      }
    }

    const dayPlaces = await fetchGetPlanDaysAndLocations(Number(params.planId));

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

    return (
      <div className="flex flex-col">
        <div className="border-b px-9">
          {/* 헤더 영역 */}
          <div className="flex gap-3 pt-6">
            <span className="text-28 font-bold leading-[130%]">
              {isOwner ? '내 일정 수정하기' : '일정 보기'}
            </span>
            <Image
              src="/character/happy_color.svg"
              alt="happy icon"
              width={HAPPY_IMAGE.width}
              height={HAPPY_IMAGE.height}
            />
          </div>
          <PlanForm
            userId={userId || ''}
            initialPlan={initialPlan}
            initialDayPlaces={dayPlaces}
            isReadOnly={!isOwner}
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
