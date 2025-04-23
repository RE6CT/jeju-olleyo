'use client';

import { DayPlaces, TabType } from '@/types/plan-detail.type';
import { Plan } from '@/types/plan.type';
import { usePlanStore } from '@/zustand/plan.store';
import { usePlanDetailForm } from '@/lib/hooks/use-plan-detail-form';
import { useEffect } from 'react';

import PlanHeader from './core/plan-header';
import PlanMap from './core/plan-map';
import PlanSchedule from './core/plan-schedule';

const PlanForm = ({
  userId,
  initialPlan,
  initialDayPlaces,
  isReadOnly = false,
}: {
  userId: string;
  initialPlan?: Omit<Plan, 'nickname' | 'createdAt' | 'publicAt' | 'isLiked'>;
  initialDayPlaces?: DayPlaces;
  isReadOnly?: boolean;
}) => {
  const { title, description, planImg, setTitle, setDescription, setPlanImg } =
    usePlanStore();

  const { dayPlaces, activeTab, updateRouteSummary } = usePlanDetailForm({
    userId,
    initialPlan,
    initialDayPlaces,
    isReadOnly,
  });

  // 초기값 설정
  useEffect(() => {
    if (initialPlan) {
      setTitle(initialPlan.title);
      setDescription(initialPlan.description || '');
      setPlanImg(initialPlan.planImg || '');
    }
  }, [initialPlan, setTitle, setDescription, setPlanImg]);

  console.log('planform 렌더링');
  return (
    <div>
      <PlanHeader />
      <PlanMap />
      <PlanSchedule />
    </div>
  );
};

export default PlanForm;
