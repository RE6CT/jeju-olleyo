import Image from 'next/image';
import Link from 'next/link';

import ErrorMessage from '@/components/features/alert/error-message';
import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/path.constants';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import { fetchGetAllPlansByUserId } from '@/lib/apis/plan/plan.api';

import PlanFilterSection from './_components/plan-filter-section';

const IMAGE_CONSTANTS = {
  SUNGLASSES: {
    width: 37,
    height: 36,
  },
  ADD_ICON: {
    width: 20,
    height: 20,
  },
} as const;

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
      <div className="container mx-auto py-8">
        <div className="mb-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="bold-28 leading-[130%]">지난 일정 보기</h1>
              <Image
                src="/character/sunglasses.svg"
                alt="sunglasses icon"
                width={IMAGE_CONSTANTS.SUNGLASSES.width}
                height={IMAGE_CONSTANTS.SUNGLASSES.height}
              />
            </div>
            <Link href={PATH.PLAN_NEW}>
              <Button className="flex items-center gap-2 rounded-[20px] border border-primary-500 bg-white px-3 py-2 hover:bg-primary-100">
                <span className="mr-1 flex h-[20px] w-[20px] items-center justify-center">
                  <Image
                    src="/icons/add.svg"
                    alt="plus icon"
                    width={IMAGE_CONSTANTS.ADD_ICON.width}
                    height={IMAGE_CONSTANTS.ADD_ICON.height}
                  />
                </span>
                <span className="text-center text-16 font-medium leading-[150%] text-primary-500">
                  새 일정 만들기
                </span>
              </Button>
            </Link>
          </div>
          <PlanFilterSection
            initialPlans={plans ?? []}
            userId={user.id}
            userNickname={user.nickname}
          />
        </div>
      </div>
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
