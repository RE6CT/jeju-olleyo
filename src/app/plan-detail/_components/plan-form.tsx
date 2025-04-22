'use client';

import { DayPlaces, TabType } from '@/types/plan-detail.type';
import { Plan } from '@/types/plan.type';

import PlanHeader from './core/plan-header';
import PlanMap from './core/plan-map';
import PlanSchedule from './core/plan-schedule';
import { usePlanDetailForm } from '@/lib/hooks/use-plan-detail-form';

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
  const {
    startDate,
    endDate,
    plan,
    isCalendarOpen,
    dayPlaces,
    activeTab,
    routeSummary,
    setIsCalendarOpen,
    setDayPlaces,
    setActiveTab,
    updateRouteSummary,
    handleDateChange,
    handlePlanTitleChange,
    handlePlanDescriptionChange,
  } = usePlanDetailForm({
    userId,
    initialPlan,
    initialDayPlaces,
    isReadOnly,
  });

  return (
    <div>
      <PlanHeader
        startDate={startDate}
        endDate={endDate}
        isCalendarOpen={isCalendarOpen}
        setIsCalendarOpen={setIsCalendarOpen}
        handleDateChange={handleDateChange}
        planTitle={plan.title}
        setPlanTitle={handlePlanTitleChange}
        planDescription={plan.description || ''}
        setPlanDescription={handlePlanDescriptionChange}
        targetImage={plan.planImg || ''}
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
        planTitle={plan.title}
        planDescription={plan.description || ''}
        planImage={plan.planImg || ''}
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
