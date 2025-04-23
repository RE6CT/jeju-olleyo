'use client';

import { DayPlaces, TabType } from '@/types/plan-detail.type';
import { Plan } from '@/types/plan.type';
import {
  usePlanSetTitle,
  usePlanSetDescription,
  usePlanSetImg,
  usePlanSetDayPlaces,
  usePlanSetActiveTab,
  usePlanSetStartDate,
  usePlanSetEndDate,
  usePlanSetIsReadOnly,
} from '@/zustand/plan.store';
import { useEffect } from 'react';

import PlanHeader from './core/plan-header';
import PlanMap from './core/plan-map';
import PlanSchedule from './core/plan-schedule';
import useAuthStore from '@/zustand/auth.store';

const PlanForm = ({
  initialPlan,
  initialDayPlaces,
  isReadOnly = true,
}: {
  initialPlan?: Omit<Plan, 'nickname' | 'createdAt' | 'publicAt' | 'isLiked'>;
  initialDayPlaces?: DayPlaces;
  isReadOnly?: boolean;
}) => {
  const { user } = useAuthStore();
  const userId = user?.id || null;

  const setTitle = usePlanSetTitle();
  const setDescription = usePlanSetDescription();
  const setPlanImg = usePlanSetImg();
  const setActiveTab = usePlanSetActiveTab();
  const setStartDate = usePlanSetStartDate();
  const setEndDate = usePlanSetEndDate();
  const setIsReadOnly = usePlanSetIsReadOnly();
  const setDayPlaces = usePlanSetDayPlaces();

  // 초기값 설정
  useEffect(() => {
    if (initialPlan) {
      setTitle(initialPlan.title);
      setDescription(initialPlan.description || '');
      setPlanImg(initialPlan.planImg || '');
      setActiveTab('전체보기');
      setStartDate(
        initialPlan.travelStartDate
          ? new Date(initialPlan.travelStartDate)
          : null,
      );
      setEndDate(
        initialPlan.travelEndDate ? new Date(initialPlan.travelEndDate) : null,
      );
      setIsReadOnly(isReadOnly);
      setDayPlaces(initialDayPlaces || {});
    }
  }, [initialPlan, setTitle, setDescription, setPlanImg, setDayPlaces]);

  console.log('planform 렌더링');

  if (!userId) {
    return null;
  }

  return (
    <div>
      <PlanHeader />
      <PlanMap />
      <PlanSchedule />
    </div>
  );
};

export default PlanForm;
