'use client';

import { useSearchParams } from 'next/navigation';
import Banner from './_components/banner';
import useSearch from '@/lib/hooks/use-search';
import Loading from '../loading';
import EmptyResult from './_components/empty-result';
import { useState } from 'react';
import PlaceCard from '@/components/features/card/place-card';

// TODO : 디자이너님 배너 제작 후 배너 삽입 예정

const CATEGORIES = ['전체', '명소', '숙박', '맛집', '카페'];

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const { results, loading } = useSearch(query);

  const [activeCategory, setActiveCategory] = useState<string>('전체');

  if (loading) {
    return <Loading />;
  }

  const filteredResults =
    activeCategory === '전체'
      ? results
      : results.filter((place) => place.category === activeCategory);

  return (
    <div className="px-4">
      <div className="mb-6 text-2xl font-bold">'{query}'의 검색 결과</div>
      <div className="mb-[17px] mt-5 space-x-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`rounded-md px-4 py-2 ${
              activeCategory === cat
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredResults.length === 0 ? (
        <EmptyResult />
      ) : (
        (() => {
          const grouped: JSX.Element[] = [];

          for (let i = 0; i < filteredResults.length; i += 8) {
            const slice = filteredResults.slice(i, i + 8);

            grouped.push(
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {slice.map((place) => (
                  <PlaceCard
                    key={place.id}
                    className="m-[11px] h-[230px] w-[230px]"
                    placeId={place.id}
                    image={place.image}
                    title={place.title}
                    isLiked
                  />
                ))}
              </div>,
            );

            // 8개마다 배너 삽입
            if (i + 8 < results.length) {
              grouped.push(
                <div className="mt-4">
                  <Banner key={`banner-${i}`} />
                </div>,
              );
            }
          }

          return grouped;
        })()
      )}
    </div>
  );
};

export default SearchResultsPage;
