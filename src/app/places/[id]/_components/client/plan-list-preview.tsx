'use client';

import PlanVerticalCard from '@/components/features/card/plan-vertical-card';

type PlanSummary = {
  planId: number;
  title: string;
  description: string;
  planImg: string | null;
  travelStartDate: string;
  travelEndDate: string;
  likeCount: number;
  nickname: string;
  isLiked: boolean;
};

const PlanListPreview = ({ plans }: { plans: PlanSummary[] }) => {
  return (
    <div className="grid grid-cols-2 gap-x-[40px] gap-y-4 lg:grid-cols-3">
      {plans.slice(0, 6).map((plan) => (
        <PlanVerticalCard key={plan.planId} plan={plan} />
      ))}
    </div>
  );
};

export default PlanListPreview;
