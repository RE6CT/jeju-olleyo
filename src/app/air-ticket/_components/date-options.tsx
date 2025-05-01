import { Button } from '@/components/ui/button';
import { DateOptionsProps } from '../../../types/air-ticket.type';

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
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dates = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() - 2 + i);
    return date;
  });

  return (
    <div className="mb-4 mt-2 flex gap-1 overflow-x-auto md:mb-[30px] md:mt-4 md:gap-2">
      {dates.map((date) => {
        const dateStr = date.toISOString().split('T')[0];
        const display = `${date.getMonth() + 1}.${date.getDate()}`;
        const selectedDateStr = startDate
          ? startDate.toISOString().split('T')[0]
          : '';
        const isSelected = selectedDateStr === dateStr;

        const isPast = date < today;

        return (
          <Button
            key={dateStr}
            type="button"
            onClick={() => {
              if (!isPast) {
                setStartDate?.(date);
              }
            }}
            disabled={isPast}
            className={`rounded-full border px-2 py-1 text-xs font-semibold text-black hover:bg-primary-100 md:px-3 md:text-sm ${
              isSelected
                ? 'border-primary-500 bg-primary-100'
                : 'border-gray-600 bg-white'
            } ${isPast ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            {display}
          </Button>
        );
      })}
    </div>
  );
};

export default DateOptions;
