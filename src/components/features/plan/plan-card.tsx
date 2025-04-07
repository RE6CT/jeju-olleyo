import React from 'react';
import { Button } from '@/components/ui/button';

type Props = {
  title: string;
  description: string;
  buttons: ReadonlyArray<{
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline';
  }>;
};

const PlanCard = ({ title, description, buttons }: Props) => {
  return (
    <>
      <div className="mt-5 flex h-60 w-60 items-center justify-center rounded-md bg-gray-200">
        <span className="text-xs text-gray-600">이미지 영역</span>
      </div>
      <h2 className="mt-2 text-xs font-semibold">{title}</h2>
      <p className="text-xs text-muted-foreground">{description}</p>
      <div className="mt-4 flex justify-between gap-2">
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

export default PlanCard;
