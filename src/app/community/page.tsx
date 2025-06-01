import JejuBanner from '@/components/features/banner/jeju-banner';
import { PATH } from '@/constants/path.constants';
import { fetchGetAllPlans } from '@/lib/apis/plan/plan.api';
import { CommunitySortType } from '@/types/community.type';

import CommunityPlanList from './_components/_client/community-plan-list';

export const metadata = {
  title: '커뮤니티',
  description: '다양한 제주도 여행 계획을 살펴보세요!',
};

// 30초마다 재생성
export const revalidate = 30;

const Community = async ({
  searchParams,
}: {
  searchParams: { sort?: string; page?: number };
}) => {
  // 쿼리 파라미터에서 sort 값 가져오기
  const sort = (searchParams.sort as CommunitySortType) || 'popular';
  const page = searchParams.page || 1;
  const { data: plans, totalPage } = await fetchGetAllPlans(sort, page);

  return (
    <div className="w-full">
      <section className="m-4 overflow-hidden rounded-12 md:m-0 md:rounded-none">
        <JejuBanner
          imageUrl="/banner-images/plan-banner.jpg"
          title="나만의 제주 여행 계획하기"
          buttonText="내 일정 만들러 가기"
          buttonUrl={PATH.PLAN_NEW}
        />
      </section>
      <section>
        <CommunityPlanList plans={plans} totalPage={totalPage} />
      </section>
    </div>
  );
};

export default Community;
