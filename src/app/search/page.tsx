'use client';

import { useSearchParams } from 'next/navigation';
import Banner from './_components/banner';
import PlaceImage from '@/components/commons/place-image';
import useSearch from '@/lib/hooks/use-search';
import Loading from '../loading';
import EmptyResult from './_components/empty-result';
import { useState } from 'react';

// TODO : 카드 컴포넌트 머지 후 div 요소 교체 필요 - 링크, 좋아요, 북마크 다 삽입될 예정
// TODO : 디자이너님 배너 제작 후 배너 삽입 예정
// TODO : 검색 중 상태일 때 사용될 수 있는 이미지 있는지 디자이너님께 문의 필요.

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
              <ul key={`group-${i}`} className="mb-6 grid grid-cols-4 gap-4">
                {slice.map((place) => (
                  <li key={place.place_id}>
                    <div className="relative aspect-square">
                      <PlaceImage image={place.image} title={place.title} />
                    </div>
                    <div className="text-sm font-semibold">{place.title}</div>
                  </li>
                ))}
              </ul>,
            );

            // 8개마다 배너 삽입
            if (i + 8 < results.length) {
              grouped.push(
                <div key={`banner-${i}`}>
                  <Banner />
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
