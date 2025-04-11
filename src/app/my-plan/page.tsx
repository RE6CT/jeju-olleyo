import { Button } from '@/components/ui/button';
import PlanFilterSection from './_components/plan-filter-section';
import { fetchGetAllPlansByUserId } from '@/lib/apis/plan/plan.api';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import ErrorMessage from '@/components/ui/error-message';
import Link from 'next/link';
import { PATH } from '@/constants/path.constants';
import Image from 'next/image';

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
              <span className="font-pretendard text-28 font-bold leading-[130%]">
                지난 일정 보기
              </span>
              <Image
                src="/character/sunglasses.svg"
                alt="sunglasses icon"
                width={SUNGLASSES_IMAGE.width}
                height={SUNGLASSES_IMAGE.height}
              />
            </div>
            <Link href={PATH.PLAN_NEW}>
              <Button>새 일정 만들기</Button>
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
  } catch (error) {
    return (
      <ErrorMessage
        title="일정 목록 조회 실패"
        description="일정 목록을 불러오는데 실패했습니다. 다시 시도해주세요."
      />
    );
  }
};

export default MyPlanPage;
