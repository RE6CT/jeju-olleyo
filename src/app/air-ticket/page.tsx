'use client';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import { DEPARTURE_LIST } from '@/constants/ticket.constants';
import useAlertStore from '@/zustand/alert.store';

import { Flight, FlightResponseItem } from '../../types/air-ticket-type';
import Loading from '../loading';

import DateOptions from './_components/date-options';
import TicketList from './_components/ticket-list';
import TicketSearchForm from './_components/ticket-search-form';
import {
  formatDateToString,
  getAirportLabel,
  sortFlights,
  SortKey,
} from './_utils/ticket-uitls';

export default function FlightSearch() {
  const [formData, setFormData] = useState({
    schDate: '',
    returnDate: '',
    schArrvCityCode: 'CJU',
  });
  const [departure, setDeparture] = useState('');
  const [goFlights, setGoFlights] = useState<Flight[]>([]);
  const [returnFlights, setReturnFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const [goSortKey, setGoSortKey] = useState<SortKey>('airline');

  const [comeSortKey, setComeSortKey] = useState<SortKey>('airline');
  const [showInnerButton, setShowInnerButton] = useState(false);
  const didMount = useRef(false);
  const { open } = useAlertStore();

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
            schArrvCityCode: formData.schArrvCityCode,
          },
        }),
        axios.get('/api/flight', {
          params: {
            schDate: returnDate,
            schDeptCityCode: formData.schArrvCityCode,
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
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    if (formData.schDate && formData.returnDate && departure) {
      // handleSubmit(new Event('submit') as any);
    }
  }, [formData.schDate, formData.returnDate, departure, handleSubmit]);

  return (
    <div className="mx-auto max-w-5xl p-6">
      <TicketSearchForm
        departureList={DEPARTURE_LIST}
        departure={departure}
        setDeparture={setDeparture}
        handleSubmit={handleSubmit}
        // formData={formData}
        showInnerButton={showInnerButton}
        setShowInnerButton={setShowInnerButton}
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />

      {loading ? (
        <Loading />
      ) : (
        departure && (
          <div className="mx-7 grid max-w-4xl gap-6 px-9 py-8 md:grid-cols-[1fr_1fr_auto]">
            <section>
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
              <DateOptions
                baseDateStr={formatDateToString(startDate)}
                field="schDate"
                formData={formData}
                setFormData={setFormData}
              />
              <TicketList
                flights={goFlights}
                sortKey={goSortKey}
                sortFlights={sortFlights}
                setSortKey={setGoSortKey}
              />
            </section>

            <section>
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
              <DateOptions
                baseDateStr={formatDateToString(endDate)}
                field="returnDate"
                formData={formData}
                setFormData={setFormData}
              />
              <TicketList
                flights={returnFlights}
                sortKey={comeSortKey}
                sortFlights={sortFlights}
                setSortKey={setComeSortKey}
              />
            </section>
            <button className="col-start-3 h-11 w-24 self-start rounded-12 bg-primary-500 px-4 py-[10px] text-white">
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
}
