'use client';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import { DEPARTURE_LIST } from '@/constants/ticket.constants';
import useAlertStore from '@/zustand/alert.store';

import { Flight, FlightResponseItem } from '../../types/air-ticket-type';
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
  const didMount = useRef(false);
  const { open } = useAlertStore();
  const { data: user } = useCurrentUser();

  const dateAlert = () => {
    open({
      type: 'warning',
      title: 'WARNING!',
      message: '돌아오는 날짜는 가는 날짜보다 빠를 수 없습니다.',
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
  const handleReserve = async () => {
    const supabase = getBrowserClient();

    if (!user) return alert('로그인이 필요합니다!');

    const flightsToSave = [selectedGoFlight, selectedReturnFlight].filter(
      (flight): flight is Flight => flight !== null,
    );

    for (const flight of flightsToSave) {
      const isGoFlight = flight === selectedGoFlight;
      const baseDate = isGoFlight ? startDate : endDate;

      if (!baseDate) continue;

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
        // price: flight!.price || null,
      });
      if (error) {
        console.error(error.message);
        alert('예약 중 오류가 발생했습니다!');
      }
    }
    alert('항공권이 예약되었습니다!');
    setSelectedGoFlight(null);
    setSelectedReturnFlight(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      dateAlert();
      return;
    }
    setLoading(true);
    setShowInnerButton(true);
    const goDate: string = formatDateToString(startDate);
    const returnDate: string = formatDateToString(endDate);
    if (returnDate < goDate) {
      setLoading(false);
      dateAlert();
      return;
    }

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

      const mapFlights = (items: FlightResponseItem[]): Flight[] =>
        items.map((item) => ({
          airlineKorean: item.airlineKorean,
          flightId: item.domesticNum,
          depPlandTime: item.domesticStartTime,
          arrPlandTime: item.domesticArrivalTime,
        }));

      setGoFlights(mapFlights(goRes.data.items || []));
      setReturnFlights(mapFlights(returnRes.data.items || []));
    } catch {
      ErrorAlert();
    } finally {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   if (!didMount.current) {
  //     didMount.current = true;
  //     return;
  //   }

  //   if (formData.schDate && formData.returnDate && departure) {
  //     // handleSubmit(new Event('submit') as any);
  //   }
  // }, [formData.schDate, formData.returnDate, departure, handleSubmit]);

  return (
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
          <div className="mx-7 grid max-w-4xl gap-6 px-9 py-8 md:grid-cols-[1fr_1fr_auto]">
            <section>
              <div className="flex items-end justify-between gap-2">
                <div className="flex items-end gap-2">
                  <h2 className="text-24 font-semibold">가는편</h2>
                  <p className="mb-2 flex text-14 text-gray-300">
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

            <section>
              <div className="flex items-end justify-between gap-2">
                <div className="flex items-end gap-2">
                  <h2 className="text-24 font-semibold">오는편</h2>
                  <p className="mb-2 flex text-14 text-gray-300">
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
            <button
              onClick={handleReserve}
              disabled={!selectedGoFlight || !selectedReturnFlight}
              className={`col-start-3 mx-[12px] h-11 w-24 self-start rounded-12 px-4 py-[10px] text-gray-500 ${
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
      {!showInnerButton && (
        <footer className="mt-10 flex justify-center">
          <img
            src="/banner-images/airplane_footer.png"
            alt="푸터 이미지"
            className="h-auto w-auto object-cover"
          />
        </footer>
      )}
    </div>
  );
};

export default FlightSearch;
