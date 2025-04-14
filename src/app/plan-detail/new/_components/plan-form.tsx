'use client';

import { useState } from 'react';
import PlanHeader from './plan-header';
import PlanMap from './plan-map';
import PlanSchedule from './plan-schedule';

const PlanForm = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
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
      />
      <PlanMap />
      <PlanSchedule startDate={startDate} endDate={endDate} />
      <PlanSchedule startDate={startDate} endDate={endDate} />
      <PlanSchedule startDate={startDate} endDate={endDate} />
    </div>
  );
};

export default PlanForm;
