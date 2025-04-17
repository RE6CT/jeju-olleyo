'use client';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import FlightSearchForm from './_components/ticket-search-form';
import DateOptions from './_components/date-options';
import FlightList from './_components/ticket-list';
import {
  getAirportLabel,
  sortFlights,
  SortKey,
  SortOrder,
} from './_utils/ticket-uitls';
import Loading from '../loading';
import { Flight } from '../../types/air-ticket-type';
import { DEPARTURE_LIST } from '@/constants/ticket.constants';
import useAlertStore from '@/zustand/alert.store';
import TicketList from './_components/ticket-list';

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

  const [goSortKey, setGoSortKey] = useState<SortKey>('airline');
  const [goSortOrder, setGoSortOrder] = useState<SortOrder>('asc');

  const [comeSortKey, setComeSortKey] = useState<SortKey>('airline');
  const [comeSortOrder, setComeSortOrder] = useState<SortOrder>('asc');

  const didMount = useRef(false);
  const { open } = useAlertStore();
  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    if (formData.schDate && formData.returnDate && departure) {
      handleSubmit(new Event('submit') as any);
    }
  }, [formData.schDate, formData.returnDate]);

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
    setLoading(true);

    const goDate = formData.schDate.replace(/-/g, '');
    const returnDate = formData.returnDate.replace(/-/g, '');

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

      const mapFlights = (items: any[]): Flight[] =>
        items.map((item) => ({
          airlineKorean: item.airlineKorean,
          flightId: item.domesticNum,
          depPlandTime: item.domesticStartTime,
          arrPlandTime: item.domesticArrivalTime,
        }));

      setGoFlights(mapFlights(goRes.data.items || []));
      setReturnFlights(mapFlights(returnRes.data.items || []));
    } catch (error) {
      ErrorAlert();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-6">
      <FlightSearchForm
        departureList={DEPARTURE_LIST}
        departure={departure}
        setDeparture={setDeparture}
        formData={formData}
        handleChange={(e) =>
          setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
        }
        handleSubmit={handleSubmit}
      />

      {loading ? (
        <Loading />
      ) : (
        departure && (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <section>
              <h2 className="mb-2 text-lg font-semibold">가는편</h2>
              <p>{getAirportLabel(departure)} ➡ 제주</p>
              <DateOptions
                baseDateStr={formData.schDate}
                field="schDate"
                formData={formData}
                setFormData={setFormData}
              />
              <TicketList
                flights={goFlights}
                sortKey={goSortKey}
                sortOrder={goSortOrder}
                sortFlights={sortFlights}
                setSortKey={setGoSortKey}
                setSortOrder={setGoSortOrder}
              />
            </section>

            <section>
              <h2 className="mb-2 text-lg font-semibold">오는편</h2>
              <p>제주 ➡ {getAirportLabel(departure)}</p>
              <DateOptions
                baseDateStr={formData.returnDate}
                field="returnDate"
                formData={formData}
                setFormData={setFormData}
              />
              <TicketList
                flights={returnFlights}
                sortKey={comeSortKey}
                sortOrder={comeSortOrder}
                sortFlights={sortFlights}
                setSortKey={setComeSortKey}
                setSortOrder={setComeSortOrder}
              />
            </section>
          </div>
        )
      )}
    </div>
  );
}
