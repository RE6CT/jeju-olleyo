import { useState, useCallback, useMemo } from 'react';
import { DayPlaces, TabType } from '@/types/plan-detail.type';
import { Plan } from '@/types/plan.type';

export const usePlanDetailForm = ({
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
  const [rawDayPlaces, setRawDayPlaces] = useState<DayPlaces>(
    initialDayPlaces || {},
  );
  const [activeTab, setActiveTab] = useState<TabType>('전체보기');
  const [rawRouteSummary, setRawRouteSummary] = useState<{
    [key: number]: { distance: number; duration: number }[];
  }>({});

  // dayPlaces를 메모이제이션
  const dayPlaces = useMemo(() => rawDayPlaces, [rawDayPlaces]);
  // routeSummary를 메모이제이션
  const routeSummary = useMemo(() => rawRouteSummary, [rawRouteSummary]);

  const updateRouteSummary = useCallback(
    (day: number, summaries: { distance: number; duration: number }[]) => {
      setRawRouteSummary((prev) => ({
        ...prev,
        [day]: summaries,
      }));
    },
    [],
  );

  const handleDateChange = useCallback(
    (dates: [Date | null, Date | null]) => {
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
    },
    [isReadOnly],
  );

  const handlePlanTitleChange = useCallback(
    (title: string) => {
      if (!isReadOnly) {
        setPlan((prev) => ({ ...prev, title }));
      }
    },
    [isReadOnly],
  );

  const handlePlanDescriptionChange = useCallback(
    (description: string) => {
      if (!isReadOnly) {
        setPlan((prev) => ({ ...prev, description }));
      }
    },
    [isReadOnly],
  );

  return {
    startDate,
    endDate,
    plan,
    isCalendarOpen,
    dayPlaces,
    activeTab,
    routeSummary,
    setStartDate,
    setEndDate,
    setPlan,
    setIsCalendarOpen,
    setDayPlaces: setRawDayPlaces,
    setActiveTab,
    updateRouteSummary,
    handleDateChange,
    handlePlanTitleChange,
    handlePlanDescriptionChange,
    isReadOnly,
  };
};
