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
  <div className="flex w-[250px] flex-col gap-2 border-l border-gray-200 p-2">
    {selectedFilter === FILTER_TYPES.PUBLIC ? (
      <div className="flex flex-col gap-2">
        {Object.values(PUBLIC_OPTIONS).map((option) => (
          <Button
            key={option}
            variant={selectedPublicOption === option ? 'default' : 'ghost'}
            className={`medium-14 w-full justify-start bg-transparent hover:bg-transparent hover:text-primary-300 ${
              selectedPublicOption === option
                ? 'text-primary-500'
                : 'text-gray-500'
            }`}
            onClick={() => setSelectedPublicOption(option)}
          >
            {option}
          </Button>
        ))}
      </div>
    ) : selectedFilter === FILTER_TYPES.DATE ? (
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          <Label className="medium-14 text-gray-900">여행 시작 날짜</Label>
          <Input
            type="date"
            value={startDate}
            className="medium-14 w-[140px] border-gray-200 text-gray-900"
            onChange={(e) => setStartDate(e.target.value)}
            onFocus={() => setIsDatePickerFocused(true)}
            onBlur={() => setIsDatePickerFocused(false)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label className="medium-14 text-gray-900">여행 종료 날짜</Label>
          <Input
            type="date"
            value={endDate}
            className="medium-14 w-[140px] border-gray-200 text-gray-900"
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
          className="medium-14 border-gray-200 text-gray-900"
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    )}
    <Button
      className="semibold-16 mt-2 flex items-center justify-center rounded-[20px] bg-primary-500 px-5 py-1 font-['Pretendard'] leading-[150%] text-white hover:bg-primary-600"
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
