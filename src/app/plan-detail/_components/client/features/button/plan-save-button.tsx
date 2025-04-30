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
    <section>
      {!isReadOnly && (
        <Button
          onClick={handleSaveButtonClick}
          className="md:semibold-16 flex items-center justify-center rounded-[12px] bg-primary-500 p-[10px] text-white hover:bg-primary-600 md:h-[36px] md:w-[130px] lg:h-[44px] lg:w-[138px]"
        >
          저장하기
        </Button>
      )}
    </section>
  );
});

PlanSaveButton.displayName = 'PlanSaveButton';

export default PlanSaveButton;
