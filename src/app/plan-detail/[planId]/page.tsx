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

    const isOwner = plan.userId === userId;
    const isReadOnly = searchParams.isReadOnly === 'true' || !isOwner;

    return (
      <main className="mx-auto flex w-full max-w-[1024px] flex-col">
        <header className="flex items-center justify-between gap-3 pt-6">
          <div className="flex gap-3 pt-6">
            <h1 className="text-28 font-bold leading-[130%]">
              내 일정 수정하기
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
  } catch {
    // 일정을 찾을 수 없는 경우
    return <NotFound />;
  }
};

export default PlanDetailPage;
