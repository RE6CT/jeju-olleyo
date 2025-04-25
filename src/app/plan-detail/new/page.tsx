import Image from 'next/image';
import { Metadata } from 'next';
import { PLAN_PAGE_META } from '@/constants/plan.constants';

import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';

import NotFound from '@/app/plan-detail/_components/server/not-found';
import PlanForm from '@/app/plan-detail/_components/client/plan-form';

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
      <div className="flex flex-col">
        <div className="border-b px-9">
          {/* 헤더 영역 */}
          <div className="flex gap-3 pt-6">
            <span className="text-28 font-bold leading-[130%]">
              내 일정 만들기
            </span>
            <Image
              src="/character/happy_color.svg"
              alt="happy icon"
              width={HAPPY_IMAGE.width}
              height={HAPPY_IMAGE.height}
            />
          </div>
          <PlanForm isReadOnly={false} />
        </div>
      </div>
    );
  } catch (error) {
    return <NotFound />;
  }
};

export default PlanDetailNewPage;
