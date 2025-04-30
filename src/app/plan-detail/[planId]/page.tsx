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
import PlanSaveButton from '../_components/client/features/button/plan-save-button';
import { checkPlanAccess } from '@/lib/utils/plan.util';

export async function generateMetadata({
  params,
}: {
  params: { planId: string };
}): Promise<Metadata> {
  try {
    const [plan, { user }] = await Promise.all([
      fetchGetPlanById(parseInt(params.planId)),
      fetchGetCurrentUser(),
    ]);

    // 비공개 일정이면서 해당 일정의 작성자가 아닌 경우 메타데이터도 제한
    if (!checkPlanAccess(plan, user)) {
      return {
        title: PLAN_PAGE_META.DEFAULT.title,
        description: PLAN_PAGE_META.DEFAULT.description,
      };
    }

    return {
      title: plan.title ? plan.title : PLAN_PAGE_META.DEFAULT.title,
      description: plan.description || PLAN_PAGE_META.DEFAULT.description,
    };
  } catch (error) {
    return {
      title: PLAN_PAGE_META.DEFAULT.title,
      description: PLAN_PAGE_META.DEFAULT.description,
    };
  }
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
      fetchGetPlanById(parseInt(params.planId)),
      fetchGetCurrentUser(),
      fetchGetPlanDaysAndLocations(parseInt(params.planId)),
    ]);

    // 비공개 일정이면서 해당 일정의 작성자가 아닌 경우 접근 차단
    if (!checkPlanAccess(plan, user)) {
      return <NotFound />;
    }

    const userId = user?.id;
    const isOwner = plan.userId === userId;
    const isReadOnly = searchParams.isReadOnly === 'true' || !isOwner;

    return (
      <main className="mx-auto flex w-full min-w-[375px] max-w-[1024px] max-w-[375px] flex-col gap-5 bg-white p-4 md:max-w-[769px] md:px-5 md:py-3 lg:max-w-[1024px] lg:px-6 lg:py-5">
        <header className="hidden items-center justify-between md:flex">
          <div className="flex items-center gap-3">
            <h1 className="font-bold leading-[130%] md:text-24 lg:text-28">
              내 일정 만들기
            </h1>
            <Image
              src="/character/happy_color.svg"
              alt="happy icon"
              width={HAPPY_IMAGE.width}
              height={HAPPY_IMAGE.height}
            />
          </div>
          {!isReadOnly && <PlanSaveButton />}
        </header>
        <section>
          <PlanForm
            initialPlan={plan}
            initialDayPlaces={dayPlaces}
            isReadOnly={isReadOnly}
          />
        </section>
      </main>
    );
  } catch (error) {
    // 일정을 찾을 수 없는 경우
    return <NotFound />;
  }
};

export default PlanDetailPage;
