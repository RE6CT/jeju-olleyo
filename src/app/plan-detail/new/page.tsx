import Image from 'next/image';
import { Metadata } from 'next';
import { PLAN_PAGE_META } from '@/constants/plan.constants';

import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';

import NotFound from '@/app/plan-detail/_components/server/not-found';
import PlanForm from '@/app/plan-detail/_components/client/plan-form';
import PlanSaveButton from '@/app/plan-detail/_components/client/features/button/plan-save-button';

export const metadata: Metadata = {
  title: PLAN_PAGE_META.NEW.title,
  description: PLAN_PAGE_META.NEW.description,
};

const PlanDetailNewPage = async () => {
  const HAPPY_IMAGE = {
    width: 37,
    height: 36,
  };

  try {
    const { user } = await fetchGetCurrentUser();
    const userId = user?.id;

    if (!userId) return <NotFound />;

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
          <PlanSaveButton />
        </header>
        <section>
          <PlanForm isReadOnly={false} />
        </section>
      </main>
    );
  } catch (error) {
    return <NotFound />;
  }
};

export default PlanDetailNewPage;
