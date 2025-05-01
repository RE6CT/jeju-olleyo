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
        <header
          className={`mb-4 flex justify-center gap-0 text-center text-2xl md:mb-6 md:text-3xl lg:mb-8 lg:text-4xl`}
        >
          항공권
          <img src="/icons/plane.svg" alt="비행기 로고" className="ml-3" />
        </header>
      )}
      <form className="mx-auto mb-5 md:mb-9">
        {/* 모바일 및 태블릿 뷰에서는 다른 배치를 사용 */}
        <div className="grid grid-cols-1 gap-3 bg-gray-50 p-4 shadow-md md:grid-cols-[2fr_1fr_3fr] md:gap-4 md:px-9 md:py-8">
          <div className="col-span-1 md:col-span-3">
            <TicketSearchSelector
              passengers={passengers}
              setPassengers={setPassengers}
              classType={classType}
              setClassType={setClassType}
            />
          </div>

          <div className="col-span-1">
            <span className="mb-2 block text-16 font-medium">출발지</span>
            <div className="relative h-[44px] w-full">
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

          <div className="col-span-1">
            <span className="mb-2 block text-16 font-medium">도착지</span>
            <div className="relative h-[44px] w-full">
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
                className="h-full w-full rounded border bg-gray-100 p-2 pl-9 text-black placeholder-gray-300"
              />
            </div>
            <input type="hidden" name="schArrvCityCode" value="CJU" />
          </div>

          <div className="col-span-1 flex flex-col md:col-span-1">
            <span className="mb-2 block text-16 font-medium">일정</span>
            <div className="flex gap-2 md:gap-4 lg:gap-8">
              <div className="relative w-full">
                <img
                  src="/icons/calendar.svg"
                  alt="calendar"
                  className="absolute left-2 top-1/2 z-10 h-6 w-6 -translate-y-1/2 opacity-60"
                />
                <DatePicker
                  selected={startDate}
                  onChange={handleChange}
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText="출발일자 | 도착 일자"
                  monthsShown={1}
                  locale={ko}
                  selectsRange
                  dateFormat="yyyy-MM-dd"
                  className="h-[44px] w-full rounded border p-2 pl-9 text-12 text-black md:text-14 lg:text-16"
                  minDate={new Date()}
                  popperModifiers={[
                    {
                      name: 'preventOverflow',
                      options: {
                        rootBoundary: 'viewport',
                        tether: false,
                        altAxis: true,
                      },
                      fn: () => ({}),
                    },
                  ]}
                  popperPlacement="bottom-start"
                />
              </div>
              <Button
                type="submit"
                form="ticketForm"
                className={`h-11 w-20 !rounded-12 px-2 py-[10px] text-white md:w-24 md:px-6 ${
                  showInnerButton
                    ? 'bg-secondary-400 hover:bg-secondary-500'
                    : 'bg-primary-500 hover:bg-primary-400'
                }`}
                onClick={handleSubmit}
              >
                조회하기
              </Button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default TicketSearchForm;
