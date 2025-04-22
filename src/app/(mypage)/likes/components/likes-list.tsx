'use client';

import PlanHorizontalCard from '@/components/features/card/plan-horizontal_card';
import Pagination from '@/components/ui/pagination';
import useAuth from '@/lib/hooks/use-auth';
import { useGetDataCount } from '@/lib/queries/use-get-data-count';
import { Plan } from '@/types/plan.type';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const PAGE_SIZE = 4;

/** 좋아요 목록 전체를 담고 있는 클라이언트 컴포넌트 */
const LikesList = ({ likes }: { likes: Plan[] }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL에서 페이지 번호 가져오기
  const currentPage = parseInt(searchParams.get('page') || '1');
  const [page, setPage] = useState<number>(currentPage);

  const { user, isLoading } = useAuth();
  const { data: countData, isLoading: isCountLoading } = useGetDataCount(
    user?.id,
  );

  /**
   * 페이지 이동 핸들러
   * @param page - 이동할 페이지 숫자
   */
  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
    setPage(page);
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="medium-16 text-secondary-300">
          {countData?.likeCount}개의 일정에 좋아요를 눌렀어요
        </p>
        <h2 className="semibold-28 w-full">내가 좋아요한 일정</h2>
      </div>
      {countData?.likeCount === 0 ? (
        <div>아직 좋아요한 일정이 없습니다.</div>
      ) : (
        <div className="flex flex-col gap-10">
          <div className="grid grid-cols-1 gap-6">
            {likes?.map((plan) => (
              <PlanHorizontalCard key={plan.planId} plan={plan} />
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={Math.ceil((countData?.likeCount ?? 1) / PAGE_SIZE)}
            onPageChange={handlePageChange}
            backgroundColor="primary-500"
            hideOnSinglePage={false}
          />
        </div>
      )}
    </>
  );
};

export default LikesList;
