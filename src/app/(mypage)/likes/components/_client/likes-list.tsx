'use client';

import PlanHorizontalCard from '@/components/features/card/plan-horizontal-card';
import useAuth from '@/lib/hooks/use-auth';
import { useGetDataCount } from '@/lib/queries/use-get-data-count';
import MypagePagination from '../../../_components/_client/mypage-pagination';
import EmptyResult from '@/components/commons/empty-result-link';
import { PATH } from '@/constants/path.constants';
import PlanVerticalCard from '@/components/features/card/plan-vertical-card';
import { useSearchParams } from 'next/navigation';
import { useGetLikes } from '@/lib/queries/use-get-likes';

const PAGE_SIZE = 4;

/**
 * 좋아요 목록 전체를 담고 있는 클라이언트 컴포넌트
 * @param likes - 좋아요 목록
 */
const LikesList = () => {
  const searchParams = useSearchParams();

  const { user } = useAuth();
  const { data: countData } = useGetDataCount(user?.id);
  const { likes } = useGetLikes(user?.id);

  // 현재 페이지
  const currentPage: number = parseInt(searchParams.get('page') || '1');
  const firstPlanIndex = (currentPage - 1) * 4;

  return (
    <>
      {countData?.likeCount === 0 ? (
        <div role="region" aria-label="좋아요한 일정 없음">
          <EmptyResult
            buttonText="인기 일정 보러가기"
            href={PATH.COMMUNITY}
            imagePath="/empty-result/empty_likes.png"
          />
        </div>
      ) : (
        <section className="flex flex-col gap-20">
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-1 md:gap-5">
            {likes
              ?.slice(firstPlanIndex, firstPlanIndex + PAGE_SIZE)
              ?.map((plan) => (
                <li key={plan.planId}>
                  <div className="block md:hidden">
                    <PlanVerticalCard plan={plan} />
                  </div>
                  <div className="hidden md:block">
                    <PlanHorizontalCard plan={plan} nickname={plan.nickname} />
                  </div>
                </li>
              ))}
          </ul>

          <nav aria-label="페이지 탐색">
            <MypagePagination pageType="likes" pageSize={PAGE_SIZE} />
          </nav>
        </section>
      )}
    </>
  );
};

export default LikesList;
