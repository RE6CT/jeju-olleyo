'use client';

import { DayPlaces } from '@/types/plan-detail.type';
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
  usePlanSetPlanId,
} from '@/zustand/plan.store';
import { useEffect, useState } from 'react';

import PlanHeader from './core/plan-header';
import PlanMap from './core/plan-map';
import PlanSchedule from './core/plan-schedule';
import { useCurrentUser } from '@/lib/queries/auth-queries';

const PlanForm = ({
  initialPlan,
  initialDayPlaces,
  isReadOnly = true,
}: {
  initialPlan?: Omit<Plan, 'nickname' | 'createdAt' | 'publicAt' | 'isLiked'>;
  initialDayPlaces?: DayPlaces;
  isReadOnly?: boolean;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { data: user } = useCurrentUser();
  const userId = user?.id || null;

  const setTitle = usePlanSetTitle();
  const setDescription = usePlanSetDescription();
  const setPlanImg = usePlanSetImg();
  const setActiveTab = usePlanSetActiveTab();
  const setStartDate = usePlanSetStartDate();
  const setEndDate = usePlanSetEndDate();
  const setIsReadOnly = usePlanSetIsReadOnly();
  const setDayPlaces = usePlanSetDayPlaces();
  const setPlanId = usePlanSetPlanId();

  // 초기값 설정
  useEffect(() => {
    if (initialPlan) {
      setTitle(initialPlan.title);
      setDescription(initialPlan.description || '');
      setPlanImg(initialPlan.planImg || '');
      setPlanId(initialPlan.planId);
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
    } else {
      // 새로운 일정을 만들 때는 모든 데이터를 초기화
      setTitle('');
      setDescription('');
      setPlanImg('');
      setActiveTab('전체보기');
      setStartDate(null);
      setEndDate(null);
      setIsReadOnly(isReadOnly);
      setDayPlaces({});
    }
  }, [
    initialPlan,
    isReadOnly,
    initialDayPlaces,
    setTitle,
    setDescription,
    setPlanImg,
    setPlanId,
    setActiveTab,
    setStartDate,
    setEndDate,
    setIsReadOnly,
    setDayPlaces,
  ]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <PlanHeader />
      <PlanMap />
      <PlanSchedule />
    </>
  );
};

export default PlanForm;
