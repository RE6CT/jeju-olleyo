'use client';

import {
  usePlanDayPlaces,
  usePlanEndDate,
  usePlanIsReadOnly,
  usePlanStartDate,
  usePlanTitle,
  useScheduleModalStore,
} from '@/zustand/plan.store';
import { memo } from 'react';
import { Button } from '@/components/ui/button';
import { useScheduleSaveButton } from '@/lib/hooks/use-schedule';

const PlanSaveButton = memo(() => {
  const isReadOnly = usePlanIsReadOnly();
  const { setIsSaveModalOpen, setIsPublicModalOpen } = useScheduleModalStore();
  const { handleSaveButtonClick } = useScheduleSaveButton(
    usePlanTitle(),
    usePlanStartDate(),
    usePlanEndDate(),
    usePlanDayPlaces(),
    setIsSaveModalOpen,
    setIsPublicModalOpen,
  );

  return (
    <div className="mt-[70px]">
      {!isReadOnly && (
        <Button
          onClick={handleSaveButtonClick}
          className="flex items-center justify-center rounded-[12px] border border-primary-400 bg-primary-500 px-7 py-4 text-24 font-bold leading-[130%] text-[#F8F8F8] shadow-[2px_4px_4px_0px_rgba(153,61,0,0.20)] backdrop-blur-[10px] hover:bg-primary-600"
        >
          저장하기
        </Button>
      )}
    </div>
  );
});

PlanSaveButton.displayName = 'PlanSaveButton';

export default PlanSaveButton;
