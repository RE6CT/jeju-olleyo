import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import React from 'react';

import { Button } from '@/components/ui/button';
import { DialogHeader } from '@/components/ui/dialog';
import { PlanCardProps } from '@/types/plan-card-modal.type';

const PlanCardInModal = ({ title, description, buttons }: PlanCardProps) => {
  return (
    <>
      <DialogHeader>
        <div className="mt-4 flex h-60 w-60 items-center justify-center rounded-md bg-gray-200">
          <span className="text-xs text-gray-600">이미지 영역</span>
        </div>
        <DialogTitle className="mt-4 text-sm font-semibold">
          {title}
        </DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground">
          {description}
        </DialogDescription>
      </DialogHeader>

      <div className="mt-1 flex justify-between gap-2">
        {buttons.map((btn, idx) => (
          <Button
            key={idx}
            variant={btn.variant || 'default'}
            onClick={btn.onClick}
            className="flex-1 text-xs"
          >
            {btn.label}
          </Button>
        ))}
      </div>
    </>
  );
};

export default PlanCardInModal;
