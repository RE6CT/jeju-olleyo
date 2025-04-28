'use client';

import Link from 'next/link';
import React from 'react';

import { usePopularPlans } from '@/lib/queries/use-get-popular-plans';
import { PlanType } from '@/types/plan.type';

import PlanVerticalCard from '../../../components/features/card/plan-vertical-card';
import { useCurrentUser } from '@/lib/queries/auth-queries';

/**
 * 인기 일정을 표시하는 클라이언트 컴포넌트
 * 타입 안정성이 적용된 버전
 */
const PopularSchedules = () => {
  const { data: user } = useCurrentUser();
  const userId = user?.id || null;

  // 타입이 적용된 쿼리 훅 사용
  const { data: plans = [], isLoading } = usePopularPlans(userId, 6);

  // 스켈레톤 UI 렌더링
  const renderSkeleton = () => (
    <div className="grid w-full list-none grid-cols-2 gap-x-3 gap-y-5 p-0 md:grid-cols-3">
      {Array(6)
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
    <div className="flex w-full max-w-[1024px] flex-col gap-[17.5px] p-4 md:p-7 lg:p-9">
      <div className="flex items-center justify-between">
        <h2 className="semibold-22 text-center text-gray-900">
          올레 인기 일정
        </h2>
        <Link
          href={'/community'}
          className="regular-16 text-gray-600 hover:text-black"
        >
          더보기
        </Link>
      </div>

      {isLoading ? (
        renderSkeleton()
      ) : (
        <div className="grid w-full list-none grid-cols-2 gap-x-3 gap-y-5 p-0 md:grid-cols-3">
          {plans.map((plan: PlanType) => (
            <PlanVerticalCard key={plan.planId} plan={plan} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PopularSchedules;
