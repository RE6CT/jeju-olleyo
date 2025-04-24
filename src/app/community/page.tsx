import JejuBanner from '@/components/features/banner/jeju-banner';
import { PATH } from '@/constants/path.constants';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import { fetchGetAllPlans } from '@/lib/apis/plan/plan.api';
import { CommunitySortType } from '@/types/community.type';

import CommunityPlanList from './_components/community-plan-list';

const Community = async ({
  searchParams,
}: {
  searchParams: { sort?: string; page?: number };
}) => {
  const user = await fetchGetCurrentUser();
  const userId = user.user?.id || null;

  // 쿼리 파라미터에서 sort 값 가져오기
  const sort = (searchParams.sort as CommunitySortType) || 'popular';
  const page = searchParams.page || 1;
  const { data: plans, totalPage } = await fetchGetAllPlans(userId, sort, page);

  return (
    <>
      <JejuBanner
        imageUrl="/banner-images/plan-banner.jpg"
        title="나만의 제주 여행 계획하기"
        buttonText="내 일정 만들러 가기"
        buttonUrl={PATH.PLAN_NEW}
      />
      <CommunityPlanList plans={plans} totalPage={totalPage} />
    </>
  );
};

export default Community;
