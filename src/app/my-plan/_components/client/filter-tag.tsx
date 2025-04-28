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
  <div className="semibold-16 flex items-center gap-3 rounded-[28px] border border-[0.6px] border-gray-300 bg-white px-5 py-2 text-gray-600">
    {children}
    <button
      className="text-gray-400 hover:text-gray-700"
      onClick={onRemove}
      aria-label={ariaLabel}
      type="button"
    >
      X
    </button>
  </div>
);

export default FilterTag;
