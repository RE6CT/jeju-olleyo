'use client';
import axios from 'axios';
import { useRef, useState } from 'react';

import { DEPARTURE_LIST } from '@/constants/ticket.constants';
import useAlertStore from '@/zustand/alert.store';

import { Flight, FlightResponseItem } from '../../types/air-ticket.type';
import Loading from '../loading';

import TicketList from './_components/ticket-list';
import TicketSearchForm from './_components/ticket-search-form';
import {
  combineDateAndTime,
  formatDateToString,
  getAirportLabel,
  sortFlights,
  SortKey,
} from './_utils/ticket-uitls';
import { getBrowserClient } from '@/lib/supabase/client';
import { useCurrentUser } from '@/lib/queries/auth-queries';
import useCustomToast from '@/lib/hooks/use-custom-toast';
import PayUI from './_components/pay-ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const FlightSearch = () => {
  const [departure, setDeparture] = useState('');
  const [goFlights, setGoFlights] = useState<Flight[]>([]);
  const [returnFlights, setReturnFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [goSortKey, setGoSortKey] = useState<SortKey>('airline');
  const [selectedGoFlight, setSelectedGoFlight] = useState<Flight | null>(null);
  const [selectedReturnFlight, setSelectedReturnFlight] =
    useState<Flight | null>(null);
  const [comeSortKey, setComeSortKey] = useState<SortKey>('airline');
  const [showInnerButton, setShowInnerButton] = useState(false);
  const [passengers, setPassengers] = useState(1);
  const [classType, setClassType] = useState('economy');
  const { open } = useAlertStore();
  const { data: user } = useCurrentUser();
  const { successToast } = useCustomToast();
  const [isModalOpen, setModalOpen] = useState(false);

  const totalPrice =
    125000 * (selectedGoFlight ? 1 : 0) +
    125000 * (selectedReturnFlight ? 1 : 0);

  const dateAlert = (message: string) => {
    open({
      type: 'warning',
      title: 'WARNING!',
      message,
      confirmText: '확인',
    });
  };

  const ErrorAlert = () => {
    open({
      type: 'error',
      title: 'ERROR!',
      message: '항공기 정보를 불러오는데 실패했습니다. 다시 시도해 주세요.',
      confirmText: '확인',
    });
  };

  const cancelPayAlert = ({
    onConfirm,
    onCancel,
  }: {
    onConfirm: () => void;
    onCancel: () => void;
  }) => {
    open({
      type: 'warning',
      title: '결제 취소',
      message: '결제가 취소됩니다.',
      confirmText: '확인',
      cancelText: '취소',
      onConfirm,
      onCancel,
    });
  };

  /** 예약 버튼 핸들러 함수 */
  const handleReserve = async () => {
    const supabase = getBrowserClient();

    if (!user) {
      successToast('로그인이 필요합니다!');
      return;
    }

    setModalOpen(true);

    const flightsToSave = [selectedGoFlight, selectedReturnFlight].filter(
      (flight): flight is Flight => flight !== null,
    );

    for (const flight of flightsToSave) {
      const isGoFlight = flight === selectedGoFlight;
      const baseDate = isGoFlight ? startDate : endDate;

      if (!baseDate) continue;
      if (startDate && endDate && startDate > endDate) {
        return dateAlert('오는날은 가는날보다 빠를수 없어요.');
      }
      if (
        flightsToSave.length > 1 &&
        formatDateToString(startDate) === formatDateToString(endDate) &&
        flightsToSave[0].arrPlandTime > flightsToSave[1].depPlandTime
      )
        return dateAlert('가는편의 도착시간이 오는편의 출발시간보다 빨라요!');

      const departure_time = combineDateAndTime(baseDate, flight.depPlandTime);
      const arrive_time = combineDateAndTime(baseDate, flight.arrPlandTime);

      const { error } = await supabase.from('tickets').insert({
        user_id: user.id,
        departure_time,
        arrive_time,
        airplane_name: flight!.airlineKorean,
        carrier_code: flight!.flightId,
        departure_location: isGoFlight ? getAirportLabel(departure) : '제주',
        arrive_location: isGoFlight ? '제주' : getAirportLabel(departure),
        size: passengers,
        class: classType,
        price: null,
      });
      if (error) {
        console.error(error.message);
        successToast('예약 중 오류가 발생했습니다!');
      }
    }
    successToast('항공권이 예약되었습니다!');
    setSelectedGoFlight(null);
    setSelectedReturnFlight(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const goDate: string = formatDateToString(startDate);
    const returnDate: string = formatDateToString(endDate);
    if (departure === '') {
      dateAlert('출발지를 선택해 주세요!');
      return;
    } else if (!startDate || !endDate) {
      dateAlert('날짜를 선택해 주세요!');
      return;
    } else if (returnDate < goDate) {
      dateAlert('돌아오는 날짜는 가는 날짜보다 빠를 수 없습니다.');
      return;
    }
    setLoading(true);
    setShowInnerButton(true);

    try {
      const [goRes, returnRes] = await Promise.all([
        axios.get('/api/flight', {
          params: {
            schDate: goDate,
            schDeptCityCode: departure,
            schArrvCityCode: 'CJU',
          },
        }),
        axios.get('/api/flight', {
          params: {
            schDate: returnDate,
            schDeptCityCode: 'CJU',
            schArrvCityCode: departure,
          },
        }),
      ]);

      const mapFlights = (items: FlightResponseItem[]): Flight[] => {
        const seen = new Set<string>();
        return items
          .map((item) => ({
            airlineKorean: item.airlineKorean,
            flightId: item.domesticNum,
            depPlandTime: item.domesticStartTime,
            arrPlandTime: item.domesticArrivalTime,
          }))
          .filter((flight) => {
            if (seen.has(flight.flightId)) return false;
            seen.add(flight.flightId);
            return true;
          });
      };

      setGoFlights(mapFlights(goRes.data.items || []));
      setReturnFlights(mapFlights(returnRes.data.items || []));
    } catch {
      ErrorAlert();
    } finally {
      setLoading(false);
    }
  };

  /**
   * 닫기 버튼 눌렀을 경우 실행할 함수
   * @param newOpen - 닫기 여부
   */
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // 결제 취소 여부 확인
      cancelPayAlert({
        onConfirm: () => {
          setModalOpen(false);
        },
        onCancel: () => {
          setModalOpen(true);
        },
      });
    } else {
      setModalOpen(newOpen);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-5xl p-6">
        <TicketSearchForm
          departureList={DEPARTURE_LIST}
          departure={departure}
          setDeparture={setDeparture}
          handleSubmit={handleSubmit}
          showInnerButton={showInnerButton}
          setShowInnerButton={setShowInnerButton}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          passengers={passengers}
          setPassengers={setPassengers}
          classType={classType}
          setClassType={setClassType}
        />

        {loading ? (
          <Loading />
        ) : (
          showInnerButton && (
            <div className="mx-auto grid max-w-full gap-6 px-2 py-4 md:mx-7 md:grid-cols-[1fr_1fr] md:px-9 md:py-8 lg:grid-cols-[1fr_1fr_auto]">
              <section className="w-full">
                <div className="flex items-end justify-between gap-2">
                  <div className="flex items-end gap-2">
                    <h2 className="text-16 font-semibold md:text-20 lg:text-24">
                      가는 편
                    </h2>
                    <p className="mb-2 flex text-12 text-gray-300 md:text-14">
                      {getAirportLabel(departure)}
                      <img
                        alt="오른쪽 화살표"
                        src="/icons/arrow_right.svg"
                        className="mx-2 h-4 w-4 pt-1"
                      />
                      제주
                    </p>
                  </div>

                  <select
                    id="ticket-list-filter-go"
                    className="mb-2 rounded px-2 py-1 text-sm text-gray-700"
                    value={goSortKey}
                    onChange={(e) =>
                      setGoSortKey(
                        e.target.value as
                          | 'airline'
                          | 'dep_desc'
                          | 'arr_asc'
                          | 'dep_asc'
                          | 'arr_desc',
                      )
                    }
                  >
                    <option value="arr_asc">출발 빠른 순</option>
                    <option value="arr_desc">출발 느린 순</option>
                    <option value="dep_asc">도착 빠른 순</option>
                    <option value="dep_desc">도착 느린 순</option>
                    <option value="airline">항공사 별</option>
                  </select>
                </div>

                <TicketList
                  flights={goFlights}
                  sortKey={goSortKey}
                  sortFlights={sortFlights}
                  setSortKey={setGoSortKey}
                  selectedFlight={selectedGoFlight}
                  setSelectedFlight={setSelectedGoFlight}
                  baseDateStr={formatDateToString(startDate)}
                  startDate={startDate}
                  setStartDate={setStartDate}
                />
              </section>

              <section className="w-full">
                <div className="flex items-end justify-between gap-2">
                  <div className="flex items-end gap-2">
                    <h2 className="text-16 font-semibold md:text-20 lg:text-24">
                      오는 편
                    </h2>
                    <p className="mb-2 flex text-12 text-gray-300 md:text-14">
                      제주
                      <img
                        alt="오른쪽 화살표"
                        src="/icons/arrow_right.svg"
                        className="mx-2 h-4 w-4 pt-1"
                      />
                      {getAirportLabel(departure)}
                    </p>
                  </div>

                  <select
                    id="ticket-list-filter"
                    className="mb-2 rounded px-2 py-1 text-sm text-gray-700"
                    value={comeSortKey}
                    onChange={(e) =>
                      setComeSortKey(
                        e.target.value as
                          | 'airline'
                          | 'dep_desc'
                          | 'arr_asc'
                          | 'dep_asc'
                          | 'arr_desc',
                      )
                    }
                  >
                    <option value="arr_asc">출발 빠른 순</option>
                    <option value="arr_desc">출발 느린 순</option>
                    <option value="dep_asc">도착 빠른 순</option>
                    <option value="dep_desc">도착 느린 순</option>
                    <option value="airline">항공사 별</option>
                  </select>
                </div>

                <TicketList
                  flights={returnFlights}
                  sortKey={comeSortKey}
                  sortFlights={sortFlights}
                  setSortKey={setComeSortKey}
                  selectedFlight={selectedReturnFlight}
                  setSelectedFlight={setSelectedReturnFlight}
                  baseDateStr={formatDateToString(endDate)}
                  startDate={endDate}
                  setStartDate={setEndDate}
                />
              </section>

              {/* 데스크탑에서만 보이는 예약 버튼 */}
              <button
                onClick={handleReserve}
                disabled={!selectedGoFlight || !selectedReturnFlight}
                className={`col-start-3 mx-[12px] hidden h-11 w-24 self-start rounded-12 px-4 py-[10px] text-gray-500 lg:block ${
                  !selectedGoFlight || !selectedReturnFlight
                    ? 'cursor-not-allowed bg-gray-50 text-gray-500'
                    : 'bg-primary-500 text-white'
                }`}
              >
                예약 하기
              </button>
            </div>
          )
        )}

        {/* 모바일/태블릿에서 보이는 하단 고정 예약 버튼 */}
        {showInnerButton && (selectedGoFlight || selectedReturnFlight) && (
          <div className="fixed bottom-0 left-0 z-50 flex h-[86px] w-full items-center justify-between border-t border-gray-200 bg-white p-4 lg:hidden">
            <div className="flex flex-col">
              <span className="text-16 font-semibold">
                총 {totalPrice.toLocaleString()}원
              </span>
            </div>
            <button
              onClick={handleReserve}
              disabled={!selectedGoFlight || !selectedReturnFlight}
              className={`h-11 w-24 rounded-12 px-4 py-[10px] ${
                !selectedGoFlight || !selectedReturnFlight
                  ? 'cursor-not-allowed bg-gray-50 text-gray-500'
                  : 'bg-primary-500 text-white'
              }`}
            >
              예약하기
            </button>
          </div>
        )}

        {/* 바텀시트 여백을 위한 공간 */}
        {showInnerButton && (selectedGoFlight || selectedReturnFlight) && (
          <div className="h-20 pb-10 lg:hidden"></div>
        )}

        {!showInnerButton && (
          <footer className="fixed bottom-0 left-0 mt-10 hidden w-full justify-center bg-white md:flex">
            <img
              src="/banner-images/airplane_footer.png"
              alt="푸터 이미지"
              className="h-auto w-auto object-cover"
            />
          </footer>
        )}
      </div>

      {/* 결제창 UI 모달 */}
      <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
        <DialogHeader>
          <DialogTitle className="sr-only">티켓 결제</DialogTitle>
          <DialogDescription className="sr-only">
            티켓 결제 창입니다.
          </DialogDescription>
        </DialogHeader>
        <DialogContent
          className="rounded-12"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <PayUI
            orderName={`${selectedGoFlight?.airlineKorean} 외 1매`}
            value={totalPrice}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FlightSearch;
