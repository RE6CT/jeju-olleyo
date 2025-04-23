'use client';

import { DayPlaces, TabType } from '@/types/plan-detail.type';
import { Plan } from '@/types/plan.type';
import { usePlanStore } from '@/lib/store/plan-store';
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

  const {
    startDate,
    endDate,
    isCalendarOpen,
    dayPlaces,
    activeTab,
    routeSummary,
    setIsCalendarOpen,
    setDayPlaces,
    setActiveTab,
    updateRouteSummary,
    handleDateChange,
  } = usePlanDetailForm({
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
      <PlanHeader
        startDate={startDate}
        endDate={endDate}
        isCalendarOpen={isCalendarOpen}
        setIsCalendarOpen={setIsCalendarOpen}
        handleDateChange={handleDateChange}
        isReadOnly={isReadOnly}
      />
      <PlanMap
        dayPlaces={dayPlaces}
        activeTab={activeTab}
        updateRouteSummary={updateRouteSummary}
      />
      <PlanSchedule
        startDate={startDate}
        endDate={endDate}
        userId={userId}
        dayPlaces={dayPlaces}
        setDayPlaces={setDayPlaces}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        routeSummary={routeSummary}
        isReadOnly={isReadOnly}
      />
    </div>
  );
};

export default PlanForm;
