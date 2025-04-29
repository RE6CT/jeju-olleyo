'use client';

import React, { useEffect, useState } from 'react';
import { usePopularPlans } from '@/lib/queries/use-get-popular-plans';
import { PlanType } from '@/types/plan.type';
import PlanVerticalCard from '../../../components/features/card/plan-vertical-card';
import { useCurrentUser } from '@/lib/queries/auth-queries';
import { useRouter } from 'next/navigation';

/**
 * 인기 일정을 표시하는 클라이언트 컴포넌트
 */
const PopularSchedules = () => {
  const { data: user } = useCurrentUser();
  const userId = user?.id || null;
  const router = useRouter();

  // 가져올 데이터 개수
  const [planCount, setPlanCount] = useState(4);

  useEffect(() => {
    const updatePlanCount = () => {
      if (window.innerWidth >= 1024) {
        setPlanCount(6); // lg 이상이면 6개 (3개씩 2줄)
      } else {
        setPlanCount(4); // 기본, md에서는 4개 (2개씩 2줄)
      }
    };

    updatePlanCount(); // 처음 한 번 실행
    window.addEventListener('resize', updatePlanCount); // 리사이즈 이벤트 등록

    return () => window.removeEventListener('resize', updatePlanCount);
  }, []);

  const handleViewMore = () => router.push('/community');

  const { data: plans = [], isLoading } = usePopularPlans(userId, planCount);

  const renderSkeleton = () => (
    <div className="grid w-full grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
      {Array(planCount)
        .fill(null)
        .map((_, index) => (
          <div
            key={`skeleton-${index}`}
            className="h-64 animate-pulse rounded-lg bg-gray-200"
          />
        ))}
    </div>
  );

  return (
    <div className="flex w-[375px] flex-col items-start gap-3 px-4 py-0 md:w-full lg:w-full">
      <div className="flex items-center justify-between self-stretch">
        <h2 className="semibold-20 lg:semibold-22 text-center text-gray-900">
          올레 인기 일정
        </h2>
        <div className="flex items-center justify-center gap-2.5 p-2.5">
          <button
            onClick={handleViewMore}
            className="regular-14 md:regular-16 text-center text-gray-600"
          >
            더보기
          </button>
        </div>
      </div>

      {isLoading ? (
        renderSkeleton()
      ) : (
        <div className="grid w-full grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan: PlanType) => (
            <PlanVerticalCard key={plan.planId} plan={plan} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularSchedules;
