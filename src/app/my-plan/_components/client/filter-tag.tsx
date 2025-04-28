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
  <div className="mr-1 flex items-center rounded-full border border-gray-300 bg-white px-3 py-1 text-sm text-gray-700">
    {children}
    <button
      className="ml-2 text-gray-400 hover:text-gray-700"
      onClick={onRemove}
      aria-label={ariaLabel}
      type="button"
    >
      ×
    </button>
  </div>
);

export default FilterTag;
