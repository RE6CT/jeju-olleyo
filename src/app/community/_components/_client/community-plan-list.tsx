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
    router.push(`?page=${page}&sort=${sortOption}`);
  };

  return (
    <div className="flex w-full flex-col gap-3 p-4 pt-0 md:p-9">
      <section className="flex items-center">
        <h2 className="semibold-20 md:semibold-22 flex-1 py-[10px] md:py-0">
          올레 인기 일정
        </h2>
        <SortDropdown sortType={sortOption} />
      </section>
      <div className="flex flex-col gap-20">
        <ul className="grid w-full list-none grid-cols-2 gap-x-3 gap-y-5 p-0 lg:grid-cols-3">
          {plans.map((plan) => (
            <li key={plan.planId}>
              <PlanVerticalCard plan={plan} />
            </li>
          ))}
        </ul>
        <nav aria-label="페이지 탐색">
          <DynamicPagination
            currentPage={currentPage}
            totalPages={totalPage}
            maxVisiblePages={10}
            onPageChange={handlePageChange}
            backgroundColor="primary-500"
          />
        </nav>
      </div>
    </div>
  );
};

export default CommunityPlanList;
