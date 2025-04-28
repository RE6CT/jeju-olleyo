'use client';

import ErrorMessage from '@/app/error';
import Banner from '@/app/search/_components/banner';
import PlaceListSkeleton from '@/components/commons/place-list-skeleton';
import PlaceCard from '@/components/features/card/place-card';
import useInfiniteScroll from '@/lib/hooks/use-infinite-scroll';
import { useGetPlacesByCategoryInfiniteQuery } from '@/lib/queries/use-get-places';
import { CategoryParamType, RegionType } from '@/types/category.type';
import CategoryRegionTabs from './category-region-tabs';
import { useRouter, useSearchParams } from 'next/navigation';
import { PATH } from '@/constants/path.constants';
import React from 'react';

/** 서버에서 가져온 데이터를 표시하는 클라이언트 컴포넌트 (카테고리 리스트)) */
const CategoryClient = ({ category }: { category: CategoryParamType }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const region = (searchParams.get('region') || '전체') as RegionType;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useGetPlacesByCategoryInfiniteQuery(category, region);

  // 커스텀 훅 사용
  const observerRef = useInfiniteScroll(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  /**
   * 탭 이동 핸들러
   * @param tab - 현재 탭
   */
  const handleFilterTabChange = (tab: RegionType) => {
    router.push(`${PATH.CATEGORIES}/${category}?region=${tab}`);
  };

  if (isError) return <ErrorMessage message="장소 불러오기 오류 발생" />;

  const allPlaces = data?.pages?.flatMap((page) => page?.data ?? []) ?? [];

  return (
    <div className="flex w-full flex-col gap-5">
      <nav className="ml-auto w-full" aria-label="지역 필터">
        <CategoryRegionTabs
          defaultTab={region}
          onTabChange={handleFilterTabChange}
        />
      </nav>

      {/* 카드 그리드 */}
      <section>
        <ul className="grid list-none grid-cols-2 gap-x-[11px] gap-y-[22px] p-0 sm:grid-cols-3 md:grid-cols-4">
          {isPending ? (
            <PlaceListSkeleton count={16} />
          ) : (
            allPlaces.map((place, index) => (
              <React.Fragment key={place.placeId}>
                <li>
                  <PlaceCard
                    placeId={place.placeId}
                    image={place.image}
                    title={place.title}
                    isBookmarked={place.isBookmarked}
                    isDragging={false}
                  />
                </li>
                {/* 8번째 아이템 이후에 배너 삽입 (첫 페이지의 마지막에만 적용) */}
                {index === 7 && (
                  <li
                    key={`banner-${index}`}
                    className="col-span-full my-2 flex w-full items-center justify-center"
                  >
                    <Banner />
                  </li>
                )}
              </React.Fragment>
            ))
          )}
        </ul>
      </section>

      {/* 로딩 인디케이터 및 다음 페이지 로드 트리거 */}
      <div
        ref={observerRef}
        className="flex h-[50px] w-full items-center justify-center"
        aria-hidden="true"
      ></div>
    </div>
  );
};

export default CategoryClient;
