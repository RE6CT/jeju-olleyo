import { DateOptionsProps } from '../../../types/air-ticket-type';

const DateOptions = ({
  formData,
  setFormData,
  field,
  baseDateStr,
}: DateOptionsProps) => {
  if (!baseDateStr) return null;

  const baseDate = new Date(baseDateStr);

  const dates = Array.from({ length: 5 }, (_, i) => {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() - 2 + i);
    return date;
  });

  return (
    <div className="mt-2 flex gap-2">
      {dates.map((date) => {
        const dateStr = date.toISOString().split('T')[0];
        const display = `${date.getMonth() + 1}.${date.getDate()}`;
        const isSelected = formData[field] === dateStr;

        return (
          <button
            key={dateStr}
            type="button"
            onClick={() => {
              setFormData((prev) => ({ ...prev, [field]: dateStr }));
            }}
            className={`rounded border px-3 py-1 text-sm ${isSelected ? 'bg-black font-semibold text-white' : 'bg-white text-black hover:bg-gray-100'}`}
          >
            {display}
          </button>
        );
      })}
    </div>
  );
};

export default DateOptions;
