import { Button } from '@/components/ui/button';
import { DateOptionsProps } from '../../../types/air-ticket-type';

const DateOptions = ({
  baseDateStr,
  setStartDate,
  startDate,
}: DateOptionsProps) => {
  if (!baseDateStr) return null;

  const year = parseInt(baseDateStr.slice(0, 4), 10);
  const month = parseInt(baseDateStr.slice(4, 6), 10) - 1;
  const day = parseInt(baseDateStr.slice(6, 8), 10);

  const baseDate = new Date(year, month, day);

  const dates = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() - 2 + i);
    return date;
  });

  return (
    <div className="mb-[30px] mt-4 flex gap-2">
      {dates.map((date) => {
        const dateStr = date.toISOString().split('T')[0];
        const display = `${date.getMonth() + 1}.${date.getDate()}`;
        const selectedDateStr = startDate
          ? startDate.toISOString().split('T')[0]
          : '';
        const isSelected = selectedDateStr === dateStr;

        return (
          <Button
            key={dateStr}
            type="button"
            onClick={() => {
              setStartDate?.(date);
            }}
            className={`rounded-full border px-3 py-1 text-sm font-semibold text-black hover:bg-primary-100 ${
              isSelected
                ? 'border-primary-500 bg-primary-100'
                : 'border-gray-600 bg-white'
            }`}
          >
            {display}
          </Button>
        );
      })}
    </div>
  );
};

export default DateOptions;
