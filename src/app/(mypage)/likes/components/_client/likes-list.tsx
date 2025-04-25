'use client';

import PlanHorizontalCard from '@/components/features/card/plan-horizontal_card';
import useAuth from '@/lib/hooks/use-auth';
import { useGetDataCount } from '@/lib/queries/use-get-data-count';
import { Plan } from '@/types/plan.type';
import MypagePagination from '../../../_components/_client/mypage-pagination';
import Loading from '@/app/loading';
import EmptyResult from '@/components/commons/empty-result-link';
import { PATH } from '@/constants/path.constants';

const PAGE_SIZE = 4;

/**
 * 좋아요 목록 전체를 담고 있는 클라이언트 컴포넌트
 * @param likes - 좋아요 목록
 */
const LikesList = ({ likes }: { likes: Plan[] }) => {
  const { user, isLoading } = useAuth();
  const { data: countData, isLoading: isCountLoading } = useGetDataCount(
    user?.id,
  );

  if (isLoading || isCountLoading) return <Loading />;

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
          <ul className="grid list-none grid-cols-1 gap-6 p-0">
            {likes?.map((plan) => (
              <li key={plan.planId}>
                <PlanHorizontalCard plan={plan} nickname={plan.nickname} />
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
