'use client';
import { ReactNode } from 'react';

const FilterTag = ({
  children,
  onRemove,
  ariaLabel,
}: {
  children: ReactNode;
  onRemove: () => void;
  ariaLabel: string;
}) => (
  <div className="semibold-12 md:semibold-16 flex items-center gap-2 rounded-[28px] border border-[0.6px] border-gray-300 bg-white px-[10px] text-gray-600 md:gap-3 md:px-5 md:py-1 lg:py-2">
    {children}
    <button
      className="text-gray-600 hover:text-gray-700"
      onClick={onRemove}
      aria-label={ariaLabel}
      type="button"
    >
      X
    </button>
  </div>
);

export default FilterTag;
