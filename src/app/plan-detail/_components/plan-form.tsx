'use client';

import { useState } from 'react';
import PlanHeader from './plan-header';
import PlanMap from './plan-map';
import PlanSchedule from './plan-schedule';
import { Plan } from '@/types/plan.type';
import { DayPlaces, TabType } from '@/types/plan-detail.type';

const PlanForm = ({ userId }: { userId: string }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [plan, setPlan] = useState<
    Omit<Plan, 'nickname' | 'createdAt' | 'publicAt' | 'isLiked'>
  >({
    planId: 0,
    planImg: '',
    title: '',
    description: '',
    travelStartDate: '',
    travelEndDate: '',
    userId: userId,
    public: false,
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dayPlaces, setDayPlaces] = useState<DayPlaces>({});
  const [activeTab, setActiveTab] = useState<TabType>('전체보기');

  const handleDateChange = (dates: [Date | null, Date | null]) => {
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
        setPlanTitle={(title) => setPlan((prev) => ({ ...prev, title }))}
        planDescription={plan.description || ''}
        setPlanDescription={(description) =>
          setPlan((prev) => ({ ...prev, description }))
        }
        planImage={plan.planImg || ''}
        setPlanImage={(planImg) => setPlan((prev) => ({ ...prev, planImg }))}
      />
      <PlanMap dayPlaces={dayPlaces} activeTab={activeTab} />
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
      />
    </div>
  );
};

export default PlanForm;
