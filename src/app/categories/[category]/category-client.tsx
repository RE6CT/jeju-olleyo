'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import ErrorMessage from '@/app/error';
import Loading from '@/app/loading';
import Banner from '@/app/search/_components/banner';
import PlaceCard from '@/components/features/card/place-card';
import { useBookmarkQuery } from '@/lib/hooks/use-bookmark-query';
import { useGetPlacesByCategoryInfiniteQuery } from '@/lib/queries/use-get-places';
import { CategoryParamType } from '@/types/category.type';

/** 서버에서 가져온 데이터를 표시하는 클라이언트 컴포넌트 (카테고리 리스트)) */
const CategoryClient = ({
  category,
  userId,
}: {
  category: CategoryParamType;
  userId: string | null;
}) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useGetPlacesByCategoryInfiniteQuery(category);
  const { ref, inView } = useInView();
  const { isBookmarked } = useBookmarkQuery(userId);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isPending) return <Loading />;
  if (isError) return <ErrorMessage message="장소 불러오기 오류 발생" />;

  // 데이터 평탄화
  const allPlaces = data?.pages?.flatMap((page) => page?.data ?? []) ?? [];

  return (
    <>
      {/* 카드 그리드로 바로 표시 */}
      <div className="grid grid-cols-2 gap-[11px] sm:grid-cols-3 md:grid-cols-4">
        {allPlaces.map((place, index) => (
          <>
            <PlaceCard
              key={place.id}
              placeId={place.placeId}
              image={place.image}
              title={place.title}
              isLiked={isBookmarked(place.placeId)}
              isDragging={false}
            />
            {/* 8번째 아이템 이후에 배너 삽입 (첫 페이지의 마지막) */}
            {index % 8 === 7 && (
              <div className="col-span-full my-4 flex w-full items-center justify-center">
                <Banner key={`banner-${index}`} />
                {/* 배너 컴포넌트 또는 광고를 여기에 삽입 */}
              </div>
            )}
          </>
        ))}
      </div>

      {/* 로딩 인디케이터 및 다음 페이지 로드 트리거 */}
      <div
        ref={ref}
        className="flex h-[50px] w-full items-center justify-center"
      ></div>
    </>
  );
};

export default CategoryClient;
