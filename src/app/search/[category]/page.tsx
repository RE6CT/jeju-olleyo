'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { CategoryParamType, CategoryType } from '@/types/category.type';

import { useGetPlacesBySearchQuery } from '@/lib/queries/use-get-places';
import Banner from '../_components/banner';
import PlaceCard from '@/components/features/card/place-card';
import EmptyResult from '../_components/empty-result';
import CategoryFilterTabs from '@/components/commons/category-filter-tabs';
import ErrorMessage from '@/app/error';
import { PATH } from '@/constants/path.constants';
import { CATEGORY_KR_MAP } from '@/constants/home.constants';
import useInfiniteScroll from '@/lib/hooks/use-infinite-scroll';
import PlaceListSkeleton from '@/components/commons/place-list-skeleton';

const TAB_LIST: Record<CategoryType, CategoryParamType> = {
  전체: 'all',
  명소: 'toursite',
  숙박: 'accommodation',
  맛집: 'restaurant',
  카페: 'cafe',
};

const SearchResultsPage = ({
  params,
}: {
  params: { category: CategoryParamType };
}) => {
  const searchParams = useSearchParams();
  const urlCategory = params.category;
  const query = searchParams.get('query') ?? '';
  const router = useRouter();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useGetPlacesBySearchQuery(urlCategory, query);

  // useInView 대신 커스텀 훅 사용
  const observerRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  useEffect(() => {
    if (!query.trim()) {
      router.replace('/categories/all');
    }
  }, [query, router]);

  /**
   * 탭을 눌렀을 때 실행되는 이벤트 핸들러
   * @param tab - 탭 이름
   */
  const onFilterTabChange = (tab: CategoryType) => {
    router.push(`${PATH.SEARCH}/${TAB_LIST[tab]}?query=${query}`);
  };

  if (isError) return <ErrorMessage message="장소 불러오기 오류 발생" />;

  // 데이터 평탄화
  const places = data?.pages?.flatMap((page) => page?.data ?? []) ?? [];

  return (
    <div className="px-4">
      <div className="semibold-20 md:semibold-24 lg:semibold-28 mb-[11px] md:mb-4 lg:mb-5">{`'${query}'의 검색 결과`}</div>

      <div className="mb-[17px] mt-5 h-[40px] w-full max-w-[388px]">
        <CategoryFilterTabs
          tabs={Object.keys(TAB_LIST) as CategoryType[]}
          defaultTab={CATEGORY_KR_MAP[urlCategory] as CategoryType}
          onTabChange={onFilterTabChange}
          tabsGapClass="gap-2 md:gap-3"
          tabPaddingClass="p-[0.66px] md:px-5 md:py-2"
          tabFontClass="text-[11px] md:semibold-16"
        />
      </div>

      {places.length === 0 && !isPending ? (
        <EmptyResult />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-[11px] sm:grid-cols-3 md:grid-cols-4">
            {isPending ? (
              <PlaceListSkeleton count={16} />
            ) : (
              <>
                {places.map((place, idx) => (
                  <div key={place.placeId} className="contents">
                    <PlaceCard
                      placeId={place.placeId}
                      image={place.image}
                      title={place.title}
                      isBookmarked={place.isBookmarked}
                    />
                    {idx === 7 && (
                      <div className="col-span-full my-4 flex w-full items-center justify-center">
                        <Banner key={`banner-${idx}`} />
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
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
