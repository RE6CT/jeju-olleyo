'use client';

import { FILTER_TYPES } from '@/constants/plan.constants';
import { FilterState, FilterType } from '@/types/plan.type';
import FilterButton from '@/app/my-plan/_components/server/filter-button';

const FilterMenu = ({
  selectedFilter,
  setSelectedFilter,
  filter,
  setInputValue,
  handleFilterClick,
}: {
  selectedFilter: FilterType;
  setSelectedFilter: (filter: FilterType) => void;
  filter: FilterState;
  setInputValue: (value: string) => void;
  handleFilterClick: (
    filterType: FilterType,
    setSelectedFilter: (filter: FilterType) => void,
    setInputValue: (value: string) => void,
    filter: FilterState,
  ) => void;
}) => (
  <div className="flex w-[120px] flex-col gap-2">
    <FilterButton
      type={FILTER_TYPES.TITLE}
      selectedFilter={selectedFilter}
      onClick={() =>
        handleFilterClick(
          FILTER_TYPES.TITLE,
          setSelectedFilter,
          setInputValue,
          filter,
        )
      }
      label="제목"
    />
    <FilterButton
      type={FILTER_TYPES.DATE}
      selectedFilter={selectedFilter}
      onClick={() =>
        handleFilterClick(
          FILTER_TYPES.DATE,
          setSelectedFilter,
          setInputValue,
          filter,
        )
      }
      label="날짜"
    />
    <FilterButton
      type={FILTER_TYPES.PUBLIC}
      selectedFilter={selectedFilter}
      onClick={() =>
        handleFilterClick(
          FILTER_TYPES.PUBLIC,
          setSelectedFilter,
          setInputValue,
          filter,
        )
      }
      label="공개상태"
    />
  </div>
);

export default FilterMenu;
