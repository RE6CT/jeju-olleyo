'use client';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { FlightSearchForm } from './_components/FlightSearchForm';
import { DateOptions } from './_components/DateOptions';
import { FlightList } from './_components/FlightList';
import { getAirportLabel } from './_utils/ticket-uitls';
import Loading from '../loading';

interface Flight {
  airlineKorean: string;
  flightId: string;
  depPlandTime: string;
  arrPlandTime: string;
}

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

  const departureList = [
    { label: '서울', value: 'SEL' },
    { label: '부산', value: 'PUS' },
    { label: '김포', value: 'GMP' },
    { label: '인천', value: 'ICN' },
    { label: '광주', value: 'KWJ' },
    { label: '무안', value: 'MWX' },
    { label: '군산', value: 'KUV' },
    { label: '대구', value: 'TAE' },
    { label: '진주', value: 'HIN' },
    { label: '여수', value: 'RSU' },
    { label: '울산', value: 'USN' },
    { label: '원주', value: 'WJU' },
    { label: '청주', value: 'CJJ' },
    { label: '포항', value: 'KPO' },
    { label: '양양', value: 'YNY' },
  ];
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

      const mapFlights = (items: any[]) =>
        items.map((item) => ({
          airlineKorean: item.airlineKorean,
          flightId: item.domesticNum,
          depPlandTime: item.domesticStartTime,
          arrPlandTime: item.domesticArrivalTime,
        }));

      setGoFlights(mapFlights(goRes.data.items || []));
      setReturnFlights(mapFlights(returnRes.data.items || []));
    } catch (error) {
      alert('운항 정보를 불러오는 데 실패했습니다.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto max-w-7xl p-6">
      <FlightSearchForm
        departureList={departureList}
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
            <p>{getAirportLabel(departure)} ➡ 제주</p>
            <DateOptions
              baseDateStr={formData.schDate}
              field="schDate"
              formData={formData}
              setFormData={setFormData}
            />
            <h2 className="mb-2 text-lg font-semibold">가는편</h2>
            <FlightList
              flights={goFlights}
              sortKey="airline"
              sortOrder="asc"
              sortFlights={(flights) => flights}
              setSortKey={() => {}}
              setSortOrder={() => {}}
            />
          </section>
          <section>
            <p>제주 ➡ {getAirportLabel(departure)}</p>
            <DateOptions
              baseDateStr={formData.returnDate}
              field="returnDate"
              formData={formData}
              setFormData={setFormData}
            />
            <h2 className="mb-2 text-lg font-semibold">오는편</h2>
            <FlightList
              flights={returnFlights}
              sortKey="airline"
              sortOrder="asc"
              sortFlights={(flights) => flights}
              setSortKey={() => {}}
              setSortOrder={() => {}}
            />
          </section>
        </div>
      )}
    </div>
  );
}
