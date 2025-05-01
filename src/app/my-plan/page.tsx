import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';

import ErrorMessage from '@/components/features/alert/error-message';
import { PATH } from '@/constants/path.constants';
import { PLAN_PAGE_META } from '@/constants/plan.constants';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import { fetchGetAllPlansByUserId } from '@/lib/apis/plan/plan.api';

import PlanFilterSection from '@/app/my-plan/_components/client/plan-filter-section';
import AddIcon from '@/components/icons/add-icon';

const IMAGE_CONSTANTS = {
  SUNGLASSES: {
    lg: { width: 37, height: 36 },
    md: {
      width: 31,
      height: 30,
    },
  },
} as const;

export const metadata: Metadata = {
  title: PLAN_PAGE_META.MY_PLAN.title,
  description: PLAN_PAGE_META.MY_PLAN.description,
};

const MyPlanPage = async () => {
  try {
    const { user, error: userError } = await fetchGetCurrentUser();

    if (userError) {
      return (
        <ErrorMessage
          title="사용자 정보 조회 실패"
          description={userError.message}
        />
      );
    }

    if (!user?.id) {
      return (
        <ErrorMessage
          title="로그인 필요"
          description="일정을 보려면 로그인이 필요합니다."
        />
      );
    }

    const plans = await fetchGetAllPlansByUserId(user.id);

    return (
      <main className="mx-auto w-full min-w-[375px] max-w-[375px] px-4 py-0 md:mt-[22px] md:max-w-[769px] md:px-7 md:py-0 md:py-4 lg:mt-0 lg:max-w-[1024px] lg:px-9 lg:py-0">
        <div className="md:space-y-[21px] lg:space-y-6">
          <header className="hidden items-center justify-between md:flex">
            <div className="flex items-center gap-3">
              <h1 className="lg:bold-28 md:bold-24 leading-[130%]">
                지난 일정 보기
              </h1>
              <Image
                src="/character/sunglasses.svg"
                alt="sunglasses icon"
                width={IMAGE_CONSTANTS.SUNGLASSES.lg.width}
                height={IMAGE_CONSTANTS.SUNGLASSES.lg.height}
                className="md:h-[30px] md:w-[31px] lg:h-[36px] lg:w-[37px]"
              />
            </div>
            <Link href={PATH.PLAN_NEW}>
              <button className="flex items-center gap-2 rounded-[20px] border border-primary-500 bg-white px-3 hover:bg-primary-100 md:py-[6px] lg:py-2">
                <AddIcon size={20} fill="primary-500" />
                <span className="lg:medium-16 md:medium-12 text-center text-primary-500">
                  새로운 일정 만들기
                </span>
              </button>
            </Link>
          </header>
          <section>
            <PlanFilterSection
              plansList={plans ?? []}
              userId={user.id}
              userNickname={user.nickname}
            />
          </section>
        </div>
      </main>
    );
  } catch (error) {
    return (
      <ErrorMessage
        title="일정 목록 조회 실패"
        description={error instanceof Error ? error.message : '알 수 없는 오류'}
      />
    );
  }
};

export default MyPlanPage;
