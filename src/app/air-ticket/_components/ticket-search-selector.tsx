import { TicketSearchSelectorProps } from '@/types/air-ticket.type';

const TicketSearchSelector = ({
  passengers,
  setPassengers,
  classType,
  setClassType,
}: TicketSearchSelectorProps) => {
  const handlePassengerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPassengers(Number(e.target.value));
  };

  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setClassType(e.target.value);
  };

  return (
    <div className="mb-3 mt-3 flex items-center gap-3 md:mb-7 md:mt-9">
      <span className="whitespace-nowrap text-14 font-medium md:mr-[30px] md:text-16 lg:text-18">
        왕복
      </span>
      <div className="min-w-0">
        <select
          value={passengers}
          onChange={handlePassengerChange}
          className="w-full rounded border-none bg-transparent p-1 text-14 md:w-32 md:text-16 lg:text-18"
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              인원 {i + 1}명
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          value={classType}
          onChange={handleClassChange}
          className="w-full rounded border-none bg-transparent p-1 text-14 md:w-32 md:text-16 lg:text-18"
        >
          <option value="economy">이코노미</option>
          <option value="business">비지니스</option>
          <option value="first">퍼스트</option>
        </select>
      </div>
    </div>
  );
};

export default TicketSearchSelector;
