import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FILTER_TYPES, PUBLIC_OPTIONS } from '@/constants/plan.constants';
import { FilterState, FilterType, PublicOption } from '@/types/plan.type';

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
  setIsDatePickerFocused,
  filter,
  applyFilter,
}: {
  selectedFilter: FilterType;
  inputValue: string;
  setInputValue: (value: string) => void;
  selectedPublicOption: PublicOption;
  setSelectedPublicOption: (option: PublicOption) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
  setIsDatePickerFocused: (focused: boolean) => void;
  filter: FilterState;
  applyFilter: () => void;
}) => (
  <section className="flex w-[151px] flex-col items-start rounded-[12px]">
    <div className="flex items-center gap-[10px] self-stretch p-[12px_16px_8px_16px]">
      <h3 className="text-16 font-medium">
        {selectedFilter === FILTER_TYPES.KEYWORD
          ? '키워드'
          : selectedFilter === FILTER_TYPES.DATE
            ? '날짜'
            : '공개상태'}
      </h3>
    </div>
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
      className="semibold-16 mt-2 flex items-center justify-center rounded-[20px] bg-primary-500 px-5 py-1 text-white hover:bg-primary-600"
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
  </section>
);
