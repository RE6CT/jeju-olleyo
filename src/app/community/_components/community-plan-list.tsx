'use client';

import { useSearchParams } from 'next/navigation';

import PlanVerticalCard from '@/components/features/card/plan-vertical-card';
import { CommunitySortType } from '@/types/community.type';
import { PlanCardType } from '@/types/plan.type';

import SortDropdown from './community-sort-dropdown';


const CommunityPlanList = ({ plans }: { plans: PlanCardType[] }) => {
  const searchParams = useSearchParams();

  // URL에서 정렬 옵션 가져오기 (기본값 popular)
  const sortOption =
    (searchParams.get('sort') as CommunitySortType) || 'popular';

  return (
    <div className="flex w-full max-w-[1024px] flex-col gap-3 p-9">
      <div className="flex">
        <h2 className="semibold-22 flex-1">올레 인기 일정</h2>
        <SortDropdown sortType={sortOption} />
      </div>
      <div className="grid w-full grid-cols-1 gap-x-3 gap-y-5 sm:grid-cols-2 md:grid-cols-3">
        {plans.map((plan) => (
          <PlanVerticalCard key={plan.planId} plan={plan} />
        ))}
      </div>
    </div>
  );
};

export default CommunityPlanList;
