'use client';

import { FILTER_TYPES } from '@/constants/plan.constants';
import { FilterType, PublicOption } from '@/types/plan.type';
import FilterButton from '@/app/my-plan/_components/server/filter-button';

const FilterMenu = ({
  selectedFilter,
  setSelectedFilter,
  filters,
  setInputValue,
  handleFilterClick,
}: {
  selectedFilter: FilterType;
  setSelectedFilter: (filter: FilterType) => void;
  filters: { keyword?: string; date?: string; public?: PublicOption };
  setInputValue: (value: string) => void;
  handleFilterClick: (
    filterType: FilterType,
    setSelectedFilter: (filter: FilterType) => void,
    setInputValue: (value: string) => void,
    filters: { keyword?: string; date?: string; public?: PublicOption },
  ) => void;
}) => (
  <div className="flex w-[97px] flex-col gap-[9px] px-4 py-2">
    <FilterButton
      type={FILTER_TYPES.KEYWORD}
      selectedFilter={selectedFilter}
      onClick={() =>
        handleFilterClick(
          FILTER_TYPES.KEYWORD,
          setSelectedFilter,
          setInputValue,
          filters,
        )
      }
      label="키워드"
    />
    <FilterButton
      type={FILTER_TYPES.DATE}
      selectedFilter={selectedFilter}
      onClick={() =>
        handleFilterClick(
          FILTER_TYPES.DATE,
          setSelectedFilter,
          setInputValue,
          filters,
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
          filters,
        )
      }
      label="공개 상태"
    />
  </div>
);

export default FilterMenu;
