import { Combobox } from '@/components/commons/combo-box';
import { Button } from '@/components/ui/button';

import { TicketSearchFormProps } from '../../../types/air-ticket.type';
import TicketSearchSelector from './ticket-search-selector';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';

const TicketSearchForm = ({
  departureList,
  departure,
  setDeparture,
  handleSubmit,
  showInnerButton,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  passengers,
  setPassengers,
  classType,
  setClassType,
}: TicketSearchFormProps) => {
  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };
  return (
    <>
      {!showInnerButton && (
        <header className="mb-8 flex justify-center gap-0 text-center text-4xl">
          항공권
          <img src="/icons/plane.svg" alt="비행기 로고" className="ml-3" />
        </header>
      )}
      <form
        className={`mx-auto mb-9 grid max-w-4xl bg-gray-50 p-4 px-9 py-8 shadow-md ${
          showInnerButton
            ? 'grid-cols-[1fr_180px_2fr]'
            : 'grid-cols-[1fr_1fr_1fr]'
        } gap-4`}
      >
        <div className="col-span-3">
          <TicketSearchSelector
            passengers={passengers}
            setPassengers={setPassengers}
            classType={classType}
            setClassType={setClassType}
          />
        </div>
        <div>
          <span className="mb-2 block text-18 font-medium">출발지</span>
          <div className="px-30 relative h-[44px] w-full pr-5">
            <img
              src="/icons/plane_departure.svg"
              alt="plane"
              className="absolute left-2 top-1/2 z-10 h-6 w-6 -translate-y-1/2 opacity-60"
            />
            <Combobox
              list={departureList}
              value={departure}
              setValue={setDeparture}
              defaultMessage="출발지를 찾을 수 없습니다"
            />
          </div>
        </div>
        <div>
          <span className="mb-2 block text-18 font-medium">도착지</span>
          <div className="px-30 relative h-[44px] w-[128x] pr-5">
            <img
              src="/icons/plane_land.svg"
              alt="plane"
              className="absolute left-2 top-1/2 h-6 w-6 -translate-y-1/2 opacity-60"
            />
            <input
              id="return"
              type="text"
              name="schArrvCityCode"
              placeholder="제주"
              disabled
              className={`self-end rounded border bg-gray-100 p-2 pl-9 text-black placeholder-gray-300 ${showInnerButton ? 'w-[180px]' : 'w-full'}`}
            />
          </div>
          <input type="hidden" name="schArrvCityCode" value="CJU" />
        </div>

        <div className="flex flex-col items-start gap-2">
          <span className="block text-18 font-medium">일정</span>
          <div className="flex gap-8">
            <div className="relative w-full">
              <img
                src="/icons/calendar.svg"
                alt="plane"
                className="absolute left-2 top-1/2 z-10 h-6 w-6 -translate-y-1/2 opacity-60"
              />
              <DatePicker
                selected={startDate}
                onChange={handleChange}
                startDate={startDate}
                endDate={endDate}
                placeholderText="출발일자  |  도착 일자"
                monthsShown={2}
                locale={ko}
                selectsRange
                dateFormat="yyyy-MM-dd"
                className="w-full rounded border p-2 pl-9 text-16 text-black"
                minDate={new Date()}
              />
            </div>
            {showInnerButton && (
              <Button
                type="submit"
                form="ticketForm"
                className="h-11 w-24 !rounded-12 bg-secondary-300 px-6 py-[10px] text-white hover:bg-secondary-400"
                onClick={handleSubmit}
              >
                조회 하기
              </Button>
            )}
          </div>
        </div>
      </form>
      {!showInnerButton && (
        <div className="mb-12 flex justify-center">
          <Button
            type="submit"
            form="ticketForm"
            className="h-16 w-32 rounded-24 bg-primary-500 px-5 py-3 text-white hover:bg-primary-400"
            onClick={handleSubmit}
          >
            조회 하기
          </Button>
        </div>
      )}
    </>
  );
};

export default TicketSearchForm;
