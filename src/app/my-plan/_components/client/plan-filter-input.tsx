import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FILTER_TYPES, PUBLIC_OPTIONS } from '@/constants/plan.constants';
import { FilterType, PublicOption } from '@/types/plan.type';
import { CheckboxSecondary } from '@/components/ui/checkbox-secondary';

export const FilterInput = ({
  selectedFilter,
  inputValue,
  setInputValue,
  selectedPublicOption,
  setSelectedPublicOption,
  date,
  setDate,
  setIsDatePickerFocused,
  filters,
  applyFilter,
}: {
  selectedFilter: FilterType;
  inputValue: string;
  setInputValue: (value: string) => void;
  selectedPublicOption: PublicOption;
  setSelectedPublicOption: (option: PublicOption) => void;
  date: string;
  setDate: (date: string) => void;
  setIsDatePickerFocused: (focused: boolean) => void;
  filters: { keyword?: string; date?: string; public?: string };
  applyFilter: () => void;
}) => {
  const renderFilterInput = () => {
    if (selectedFilter === FILTER_TYPES.KEYWORD) {
      return (
        <div className="flex flex-col items-start justify-center gap-[10px] self-stretch pr-4">
          <Input
            placeholder="예) 첫 제주"
            value={inputValue}
            className="medium-16 m-0 border-gray-200 px-4 py-[10px] text-gray-900"
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      );
    } else if (selectedFilter === FILTER_TYPES.DATE) {
      return (
        <div className="flex flex-col items-start justify-center gap-[10px] self-stretch pr-4">
          <Input
            type="date"
            value={date}
            className="medium-16 m-0 border-gray-200 px-4 py-[10px] text-gray-900 [&::-webkit-datetime-edit-day-field]:text-gray-200 [&::-webkit-datetime-edit-fields-wrapper]:text-gray-200 [&::-webkit-datetime-edit-month-field]:text-gray-200 [&::-webkit-datetime-edit-text]:text-gray-200 [&::-webkit-datetime-edit-year-field]:text-gray-200 [&::-webkit-datetime-edit]:text-gray-200"
            onChange={(e) => setDate(e.target.value)}
            onFocus={() => setIsDatePickerFocused(true)}
            onBlur={() => setIsDatePickerFocused(false)}
            placeholder="예) 2025.01.01"
          />
        </div>
      );
    } else if (selectedFilter === FILTER_TYPES.PUBLIC) {
      return (
        <div className="flex flex-col items-center justify-center gap-[10px] self-stretch pr-4">
          <div className="flex flex-col items-start justify-center self-stretch pr-4">
            {Object.values(PUBLIC_OPTIONS).map((option) => (
              <label
                key={option}
                className="medium-16 flex cursor-pointer items-center gap-[10px] py-[6px] text-gray-900"
              >
                <CheckboxSecondary
                  checked={selectedPublicOption === option}
                  onCheckedChange={() => setSelectedPublicOption(option)}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      );
    }
  };

  return (
    <section className="flex h-[212px] w-[183px] flex-col items-start rounded-r-[12px] rounded-bl-[12px] py-4">
      {renderFilterInput()}
      <div className="flex flex-col items-end gap-[10px] self-stretch pb-3 pl-0 pr-4 pt-2">
        <Button
          className="semibold-16 flex h-[40px] items-center justify-center rounded-[20px] bg-primary-500 px-5 py-1 text-white hover:bg-primary-600"
          disabled={
            selectedFilter === FILTER_TYPES.PUBLIC
              ? filters.public === selectedPublicOption
              : selectedFilter === FILTER_TYPES.DATE
                ? !date
                : !inputValue
          }
          onClick={applyFilter}
        >
          적용
        </Button>
      </div>
    </section>
  );
};
