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
        <EmptyResult
          buttonText="제주도 인기 장소 보러가기"
          href={PATH.CATEGORIES}
          imagePath="/empty-result/empty_likes.png"
        />
      ) : (
        <div className="flex flex-col gap-20">
          <div className="grid grid-cols-1 gap-6">
            {likes?.map((plan) => (
              <PlanHorizontalCard key={plan.planId} plan={plan} />
            ))}
          </div>
          <MypagePagination pageType="likes" pageSize={PAGE_SIZE} />
        </div>
      )}
    </>
  );
};

export default LikesList;
