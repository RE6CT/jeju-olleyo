'use client';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import FlightSearchForm from './_components/FlightSearchForm';
import DateOptions from './_components/DateOptions';
import FlightList from './_components/FlightList';
import {
  getAirportLabel,
  sortFlights,
  SortKey,
  SortOrder,
} from './_utils/ticket-uitls';
import Loading from '../loading';
import { Flight } from './_type/type';
import { DEPARTURE_LIST } from '@/constants/ticket.constants';

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

  // 정렬 상태 관리
  const [sortKey, setSortKey] = useState<SortKey>('airline');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    if (formData.schDate && formData.returnDate && departure) {
      handleSubmit(new Event('submit') as any);
    }
  }, [formData.schDate, formData.returnDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const goDate = formData.schDate.replace(/-/g, '');
    const returnDate = formData.returnDate.replace(/-/g, '');

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
      alert('항공기 정보를 불러오는데 실패했습니다. 다시 시도해 주세요.');
      console.error(error);
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
            <FlightList
              flights={goFlights}
              sortKey={sortKey}
              sortOrder={sortOrder}
              sortFlights={sortFlights}
              setSortKey={setSortKey}
              setSortOrder={setSortOrder}
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
            <FlightList
              flights={returnFlights}
              sortKey={sortKey}
              sortOrder={sortOrder}
              sortFlights={sortFlights}
              setSortKey={setSortKey}
              setSortOrder={setSortOrder}
            />
          </section>
        </div>
      )}
    </div>
  );
}
