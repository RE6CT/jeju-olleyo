import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FILTER_TYPES, PUBLIC_OPTIONS } from '@/constants/plan.constants';
import { FilterInputProps } from '@/types/plan.type';

export const FilterInput = ({
  selectedFilter,
  inputValue,
  setInputValue,
  selectedPublicOption,
  setSelectedPublicOption,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  isDatePickerFocused,
  setIsDatePickerFocused,
  filter,
  applyFilter,
}: FilterInputProps) => (
  <div className="flex w-[250px] flex-col gap-2 border-l p-2">
    {selectedFilter === FILTER_TYPES.PUBLIC ? (
      <div className="flex flex-col gap-2">
        {Object.values(PUBLIC_OPTIONS).map((option) => (
          <Button
            key={option}
            variant={selectedPublicOption === option ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setSelectedPublicOption(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    ) : selectedFilter === FILTER_TYPES.DATE ? (
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <Label>여행 시작 날짜</Label>
          <Input
            type="date"
            value={startDate}
            className="w-[140px]"
            onChange={(e) => setStartDate(e.target.value)}
            onFocus={() => setIsDatePickerFocused(true)}
            onBlur={() => setIsDatePickerFocused(false)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label>여행 종료 날짜</Label>
          <Input
            type="date"
            value={endDate}
            className="w-[140px]"
            onChange={(e) => setEndDate(e.target.value)}
            onFocus={() => setIsDatePickerFocused(true)}
            onBlur={() => setIsDatePickerFocused(false)}
          />
        </div>
      </div>
    ) : (
      <div className="flex flex-col gap-2">
        <Input
          placeholder="제목 입력"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    )}
    <Button
      className="mt-2"
      disabled={
        selectedFilter === FILTER_TYPES.PUBLIC
          ? filter.value === selectedPublicOption
          : selectedFilter === FILTER_TYPES.DATE
            ? !startDate || !endDate
            : !inputValue
      }
      onClick={applyFilter}
    >
      적용
    </Button>
  </div>
);
