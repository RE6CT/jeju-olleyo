'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Banner from './_components/banner';
import useSearch from '@/lib/hooks/use-search';
import EmptyResult from './_components/empty-result';
import { useEffect, useState } from 'react';
import CategoryFilterTabs from '@/components/commons/category-filter-tabs';
import { CategoryType } from '@/types/category.type';
import { useBookmarkQuery } from '@/lib/hooks/use-bookmark-query';
import { getBrowserClient } from '@/lib/supabase/client';
import SearchCard from './_components/search-card';
import useInfiniteScroll from '@/lib/hooks/use-infinite-scroll';

const filterTabs: CategoryType[] = ['전체', '명소', '숙박', '맛집', '카페'];

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') ?? '';
  const router = useRouter();

  const [activeFilterTab, setActiveFilterTab] = useState<CategoryType>('전체');
  const [userId, setUserId] = useState<string | null>(null);

  const { results, loading, more, fetchNextPage } = useSearch(query);
  const { isBookmarked, toggleBookmark } = useBookmarkQuery(userId ?? '');

  const observerRef = useInfiniteScroll(() => {
    if (more && !loading) {
      fetchNextPage();
    }
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const supabase = await getBrowserClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user?.id) {
        setUserId(session.user.id);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (!query.trim()) {
      router.replace('/categories/all');
    }
  }, [query, router]);

  const onFilterTabChange = (tab: CategoryType) => {
    setActiveFilterTab(tab);
  };

  const filteredResults =
    activeFilterTab === '전체'
      ? results
      : results.filter((place) => place.category === activeFilterTab);

  return (
    <div className="px-4">
      <div className="mb-6 text-2xl font-bold">'{query}'의 검색 결과</div>

      <div className="mb-[17px] mt-5 h-[40px] w-full max-w-[388px]">
        <CategoryFilterTabs
          tabs={filterTabs}
          defaultTab={activeFilterTab}
          onTabChange={onFilterTabChange}
          tabsGapClass="gap-[10px]"
          tabPaddingClass="px-1 py-1"
        />
      </div>

      {filteredResults.length === 0 && !loading ? (
        <EmptyResult />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-[11px] sm:grid-cols-3 md:grid-cols-4">
            {filteredResults.map((place, idx) => (
              <div key={place.placeId}>
                <SearchCard
                  className="m-[11px] h-[230px] w-[230px]"
                  placeId={place.placeId}
                  image={place.image}
                  title={place.title}
                  isBookmarked={isBookmarked(place.placeId)}
                  onBookmarkToggle={() => {
                    if (userId) toggleBookmark(place.placeId);
                  }}
                />

                {/* 8번째마다 배너 삽입 */}
                {idx % 8 === 7 && (
                  <div className="col-span-full my-4 flex w-full items-center justify-center">
                    <Banner key={`banner-${idx}`} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 무한스크롤 트리거 */}
          <div
            ref={observerRef}
            className="flex h-[50px] w-full items-center justify-center"
          />
        </>
      )}
    </div>
  );
};
export default SearchResultsPage;
