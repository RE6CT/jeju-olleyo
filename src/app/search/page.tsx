'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getBrowserClient } from '@/lib/supabase/client';
import Banner from './_components/banner';
// TODO : 카드 컴포넌트 머지 후 div 요소 교체 필요!

type Place = {
  id: number;
  place_id: number;
  title: string;
  address: string;
  category: string;
  content_type_id: number;
  image: string | null;
  lat: number;
  lng: number;
};

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const [results, setResults] = useState<Place[]>([]);

  useEffect(() => {
    const fetchGetSearchByInput = async () => {
      if (!query) return;

      const supabase = await getBrowserClient();
      const { data, error } = await supabase
        .from('places')
        .select('*')
        .or(`title.like.%${query}%,address.like.%${query}%`);

      if (error) {
        console.error(error);
        return;
      }

      setResults(data ?? []);
    };

    fetchGetSearchByInput();
  }, [query]);

  return (
    <div className="px-4 pt-20">
      <div className="mb-6 text-2xl font-bold">'{query}'의 검색 결과</div>

      {(() => {
        const grouped: JSX.Element[] = [];
        for (let i = 0; i < results.length; i += 8) {
          const slice = results.slice(i, i + 8);
          grouped.push(
            <ul key={`group-${i}`} className="mb-6 grid grid-cols-4 gap-4">
              {slice.map((place) => (
                <li
                  key={place.place_id}
                  className="flex flex-col items-center rounded-md p-2 text-center"
                >
                  <img
                    src={place.image}
                    alt={place.title}
                    className="mb-2 h-48 w-48 rounded-md object-cover"
                  />

                  <div className="text-sm font-semibold">{place.title}</div>
                </li>
              ))}
            </ul>,
          );

          // 8개마다 배너 삽입 (마지막 그룹 다음에는 제외)
          if (i + 8 < results.length) {
            grouped.push(
              <div key={`banner-${i}`}>
                <Banner />
              </div>,
            );
          }
        }
        return grouped;
      })()}
    </div>
  );
};

export default SearchResultsPage;
