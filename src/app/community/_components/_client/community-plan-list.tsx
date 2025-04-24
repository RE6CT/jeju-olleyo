'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import PlanVerticalCard from '@/components/features/card/plan-vertical-card';
import { CommunitySortType } from '@/types/community.type';
import { PlanCardType } from '@/types/plan.type';

import SortDropdown from './community-sort-dropdown';
import DynamicPagination from '@/components/ui/dynamic-pagination';

/**
 * 일정 리스트 컴포넌트
 * @param plans - 일정 리스트
 * @param totalPage - 전체 페이지 수
 */
const CommunityPlanList = ({
  plans,
  totalPage,
}: {
  plans: PlanCardType[];
  totalPage: number;
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // URL에서 정렬 옵션 가져오기 (기본값 popular)
  const sortOption =
    (searchParams.get('sort') as CommunitySortType) || 'popular';
  const currentPage = parseInt(searchParams.get('page') || '1');

  /**
   * 페이지 이동 핸들러
   * @param page - 이동할 페이지 숫자
   */
  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <div className="flex w-full max-w-[1024px] flex-col gap-3 p-9">
      <div className="flex">
        <h2 className="semibold-22 flex-1">올레 인기 일정</h2>
        <SortDropdown sortType={sortOption} />
      </div>
      <div className="flex flex-col gap-20">
        <div className="grid w-full grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2 md:grid-cols-3">
          {plans.map((plan) => (
            <PlanVerticalCard key={plan.planId} plan={plan} />
          ))}
        </div>
        <DynamicPagination
          currentPage={currentPage}
          totalPages={totalPage}
          maxVisiblePages={10}
          onPageChange={handlePageChange}
          backgroundColor="primary-500"
        />
      </div>
    </div>
  );
};

export default CommunityPlanList;
