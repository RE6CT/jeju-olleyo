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
  <div className="flex w-[120px] flex-col gap-[9px] px-4 py-2">
    <FilterButton
      type={FILTER_TYPES.KEYWORD}
      selectedFilter={selectedFilter}
      onClick={() =>
        handleFilterClick(
          FILTER_TYPES.KEYWORD,
          setSelectedFilter,
          setInputValue,
          filter,
        )
      }
      label="키워드"
    />
    <div className="h-[1px] w-[120px] bg-gray-100" />
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
    <div className="h-[1px] w-[120px] bg-gray-100" />
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
      label="공개 상태"
    />
  </div>
);

export default FilterMenu;
