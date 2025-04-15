'use client';

import { useState } from 'react';
import PlanHeader from './plan-header';
import PlanMap from './plan-map';
import PlanSchedule from './plan-schedule';
import { Plan } from '@/types/plan.type';

const PlanForm = ({ userId }: { userId: string }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [plan, setPlan] = useState<Plan>({
    planId: 0,
    planImg: '',
    title: '',
    description: '',
    nickname: '',
    travelStartDate: '',
    travelEndDate: '',
    userId: userId,
    public: false,
    publicAt: null,
    createdAt: new Date().toISOString(),
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

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
      <PlanMap />
      <PlanSchedule
        startDate={startDate}
        endDate={endDate}
        userId={userId}
        planTitle={plan.title}
        planDescription={plan.description || ''}
        planImage={plan.planImg || ''}
      />
    </div>
  );
};

export default PlanForm;
