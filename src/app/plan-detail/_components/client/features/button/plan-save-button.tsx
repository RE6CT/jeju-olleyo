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
          className="flex h-[44px] w-[138px] items-center justify-center rounded-[12px] bg-primary-500 p-[10px] text-24 font-semibold text-white hover:bg-primary-600"
        >
          저장하기
        </Button>
      )}
    </div>
  );
});

PlanSaveButton.displayName = 'PlanSaveButton';

export default PlanSaveButton;
