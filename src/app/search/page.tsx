'use client';

import { useSearchParams } from 'next/navigation';
import Banner from './_components/banner';
import useSearch from '@/lib/hooks/use-search';
import Loading from '../loading';
import EmptyResult from './_components/empty-result';
import { useState } from 'react';
import PlaceCard from '@/components/features/card/place-card';
import CategoryFilterTabs from '@/components/commons/category-filter-tabs';
import { CategoryType } from '@/types/category-badge.type';

const filterTabs: CategoryType[] = ['전체', '명소', '숙박', '맛집', '카페'];

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const { results, loading } = useSearch(query);

  const [activeFilterTab, setActiveFilterTab] = useState<CategoryType>('전체');

  const onFilterTabChange = (tab: CategoryType) => {
    setActiveFilterTab(tab);
  };

  if (loading) {
    return <Loading />;
  }

  const filteredResults =
    activeFilterTab === '전체'
      ? results
      : results.filter((place) => place.category === activeFilterTab);

  return (
    <div className="px-4">
      <div className="mb-6 text-2xl font-bold">'{query}'의 검색 결과</div>
      <div className="mb-[17px] mt-5 h-[40px] w-[388px]">
        <CategoryFilterTabs
          tabs={filterTabs}
          defaultTab={activeFilterTab}
          onTabChange={onFilterTabChange}
          tabsGapClass="gap-[10px]"
          tabPaddingClass="px-1 py-1"
        />
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
                    isLiked={false}
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
