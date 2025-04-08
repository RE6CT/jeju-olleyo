import { Button } from '@/components/ui/button';
import { FILTER_TYPES } from '@/constants/plan.constants';
import { FilterMenuProps } from '@/types/plan.type';

export const FilterMenu = ({
  selectedFilter,
  setSelectedFilter,
  filter,
  setInputValue,
}: FilterMenuProps) => (
  <div className="flex w-[120px] flex-col gap-2">
    <Button
      variant={selectedFilter === FILTER_TYPES.TITLE ? 'default' : 'ghost'}
      className="w-full justify-start"
      onClick={() => {
        setSelectedFilter(FILTER_TYPES.TITLE);
        setInputValue(filter.type === FILTER_TYPES.TITLE ? filter.value : '');
      }}
    >
      제목
    </Button>
    <Button
      variant={selectedFilter === FILTER_TYPES.DATE ? 'default' : 'ghost'}
      className="w-full justify-start"
      onClick={() => {
        setSelectedFilter(FILTER_TYPES.DATE);
        setInputValue(filter.type === FILTER_TYPES.DATE ? filter.value : '');
      }}
    >
      날짜
    </Button>
    <Button
      variant={selectedFilter === FILTER_TYPES.PUBLIC ? 'default' : 'ghost'}
      className="w-full justify-start"
      onClick={() => {
        setSelectedFilter(FILTER_TYPES.PUBLIC);
        setInputValue('');
      }}
    >
      공개상태
    </Button>
  </div>
);
