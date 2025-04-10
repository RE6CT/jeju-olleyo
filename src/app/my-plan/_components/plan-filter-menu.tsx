import { Button } from '@/components/ui/button';
import { FILTER_TYPES } from '@/constants/plan.constants';
import { FilterMenuProps, FilterState, FilterType } from '@/types/plan.type';

/**
 * 필터 버튼 클릭 핸들러
 * @param filterType - 선택된 필터 타입 (제목, 날짜, 공개상태)
 * @param setSelectedFilter - 선택된 필터를 설정하는 함수
 * @param setInputValue - 입력값을 설정하는 함수
 * @param filter - 현재 적용된 필터 상태
 */
const handleFilterClick = (
  filterType: FilterType,
  setSelectedFilter: (filter: FilterType) => void,
  setInputValue: (value: string) => void,
  filter: FilterState,
) => {
  setSelectedFilter(filterType);
  setInputValue(
    filterType === FILTER_TYPES.PUBLIC
      ? ''
      : filter.type === filterType
        ? filter.value
        : '',
  );
};

export const FilterMenu = ({
  selectedFilter,
  setSelectedFilter,
  filter,
  setInputValue,
}: FilterMenuProps) => (
  <div className="flex w-[120px] flex-col gap-2">
    <Button
      variant={selectedFilter === FILTER_TYPES.TITLE ? 'default' : 'ghost'}
      className="w-full justify-start focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      onClick={() =>
        handleFilterClick(
          FILTER_TYPES.TITLE,
          setSelectedFilter,
          setInputValue,
          filter,
        )
      }
    >
      제목
    </Button>
    <Button
      variant={selectedFilter === FILTER_TYPES.DATE ? 'default' : 'ghost'}
      className="w-full justify-start focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      onClick={() =>
        handleFilterClick(
          FILTER_TYPES.DATE,
          setSelectedFilter,
          setInputValue,
          filter,
        )
      }
    >
      날짜
    </Button>
    <Button
      variant={selectedFilter === FILTER_TYPES.PUBLIC ? 'default' : 'ghost'}
      className="w-full justify-start focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      onClick={() =>
        handleFilterClick(
          FILTER_TYPES.PUBLIC,
          setSelectedFilter,
          setInputValue,
          filter,
        )
      }
    >
      공개상태
    </Button>
  </div>
);
