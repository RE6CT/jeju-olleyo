import Image from 'next/image';
import Link from 'next/link';

import ErrorMessage from '@/components/features/alert/error-message';
import { Button } from '@/components/ui/button';
import { PATH } from '@/constants/path.constants';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import { fetchGetAllPlansByUserId } from '@/lib/apis/plan/plan.api';

import PlanFilterSection from './_components/plan-filter-section';

const MyPlanPage = async () => {
  const SUNGLASSES_IMAGE = {
    width: 37,
    height: 36,
  };

  const { user, error: userError } = await fetchGetCurrentUser();

  if (userError) {
    return (
      <ErrorMessage
        title="사용자 정보 조회 실패"
        description={userError.message}
      />
    );
  }

  const userId = user?.id;

  if (!userId) {
    return (
      <ErrorMessage
        title="로그인 필요"
        description="일정을 보려면 로그인이 필요합니다."
      />
    );
  }

  try {
    const plans = await fetchGetAllPlansByUserId(userId);

    return (
      <div className="container mx-auto py-8">
        <div className="mb-8 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <span className="bold-28 leading-[130%]">지난 일정 보기</span>
              <Image
                src="/character/sunglasses.svg"
                alt="sunglasses icon"
                width={SUNGLASSES_IMAGE.width}
                height={SUNGLASSES_IMAGE.height}
              />
            </div>
            <Link href={PATH.PLAN_NEW}>
              <Button className="flex items-center gap-2 rounded-[20px] border border-primary-500 bg-white px-3 py-2 hover:bg-primary-100">
                <span className="mr-1 flex h-[20px] w-[20px] items-center justify-center">
                  <Image
                    src="/icons/add.svg"
                    alt="plus icon"
                    width={20}
                    height={20}
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
            userId={userId}
            userNickname={user.nickname}
          />
        </div>
      </div>
    );
  } catch {
    return (
      <ErrorMessage
        title="일정 목록 조회 실패"
        description="일정 목록을 불러오는데 실패했습니다. 다시 시도해주세요."
      />
    );
  }
};

export default MyPlanPage;
