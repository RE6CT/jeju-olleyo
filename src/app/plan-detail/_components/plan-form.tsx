'use client';

import { useState } from 'react';

import { DayPlaces, TabType } from '@/types/plan-detail.type';
import { Plan } from '@/types/plan.type';

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
  const [startDate, setStartDate] = useState<Date | null>(
    initialPlan?.travelStartDate ? new Date(initialPlan.travelStartDate) : null,
  );
  const [endDate, setEndDate] = useState<Date | null>(
    initialPlan?.travelEndDate ? new Date(initialPlan.travelEndDate) : null,
  );
  const [plan, setPlan] = useState<
    Omit<Plan, 'nickname' | 'createdAt' | 'publicAt' | 'isLiked'>
  >(
    initialPlan || {
      planId: 0,
      planImg: '',
      title: '',
      description: '',
      travelStartDate: '',
      travelEndDate: '',
      userId: userId,
      public: false,
    },
  );
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dayPlaces, setDayPlaces] = useState<DayPlaces>(initialDayPlaces || {});
  const [activeTab, setActiveTab] = useState<TabType>('전체보기');
  const [routeSummary, setRouteSummary] = useState<{
    [key: number]: { distance: number; duration: number }[];
  }>({});

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    if (isReadOnly) return;
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      setPlan((prev) => ({
        ...prev,
        travelStartDate: start.toISOString(),
        travelEndDate: end.toISOString(),
      }));
      setIsCalendarOpen(false);
    }
  };

  return (
    <div>
      <PlanHeader
        startDate={startDate}
        endDate={endDate}
        isCalendarOpen={isCalendarOpen}
        setIsCalendarOpen={setIsCalendarOpen}
        handleDateChange={handleDateChange}
        planTitle={plan.title}
        setPlanTitle={(title) =>
          !isReadOnly && setPlan((prev) => ({ ...prev, title }))
        }
        planDescription={plan.description || ''}
        setPlanDescription={(description) =>
          !isReadOnly && setPlan((prev) => ({ ...prev, description }))
        }
        previewImage={plan.planImg || ''}
        isReadOnly={isReadOnly}
      />
      <PlanMap
        dayPlaces={dayPlaces}
        activeTab={activeTab}
        setRouteSummary={setRouteSummary}
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
