'use client';

import { useSearchParams } from 'next/navigation';
import { useSearch } from '@/lib/hooks/use-search';
import Banner from './_components/banner';
import PlaceImage from '@/components/commons/place-image';

// TODO : 카드 컴포넌트 머지 후 div 요소 교체 필요 - 링크, 좋아요, 북마크 다 삽입될 예정
// TODO : 디자이너님 배너 제작 후 배너 삽입 예정
// TODO : 검색 중 상태일 때 사용될 수 있는 이미지 있는지 디자이너님께 문의 필요.

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const { results, loading } = useSearch(query);

  if (loading) {
    return <div className="px-4 pt-20 text-gray-500">검색 중입니다...</div>;
  }

  return (
    <div className="px-4 pt-20">
      <div className="mb-6 text-2xl font-bold">'{query}'의 검색 결과</div>

      {results.length === 0 ? (
        <div className="text-gray-500">검색 결과가 없습니다.</div>
      ) : (
        (() => {
          const grouped: JSX.Element[] = [];

          for (let i = 0; i < results.length; i += 8) {
            const slice = results.slice(i, i + 8);

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
