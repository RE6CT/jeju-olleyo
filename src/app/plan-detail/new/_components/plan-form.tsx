'use client';

import { useState } from 'react';
import PlanHeader from './plan-header';
import PlanMap from './plan-map';

const PlanForm = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div>
      <PlanHeader
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
      <PlanMap />
    </div>
  );
};

export default PlanForm;
