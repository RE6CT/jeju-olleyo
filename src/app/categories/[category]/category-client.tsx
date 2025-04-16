'use client';

import { useEffect } from 'react';
import ErrorMessage from '@/app/error';
import Loading from '@/app/loading';
import PlaceCard from '@/components/features/card/place-card';
import { useGetPlacesByCategoryInfiniteQuery } from '@/lib/queries/use-get-places';
import { useInView } from 'react-intersection-observer';
import { CategoryParamType } from '@/types/category.type';

/** 서버에서 가져온 데이터를 표시하는 클라이언트 컴포넌트 (카테고리 리스트)) */
const CategoryClient = ({ category }: { category: CategoryParamType }) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
  } = useGetPlacesByCategoryInfiniteQuery(category);

  const { ref, inView } = useInView();

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {allPlaces.map((place) => (
          <PlaceCard
            key={place.id}
            className="m-[11px] h-[230px] w-[230px]"
            placeId={place.id}
            image={place.image}
            title={place.title}
            isLiked={false}
            isDragging={false}
          />
        ))}
      </div>

      {/* 로딩 인디케이터 및 다음 페이지 로드 트리거 */}
      <div ref={ref} className="flex h-20 w-full items-center justify-center">
        {isFetchingNextPage ? (
          <p>더 불러오는 중...</p>
        ) : hasNextPage ? (
          <p>스크롤하여 더 불러오기</p>
        ) : (
          <p>모든 장소를 불러왔습니다</p>
        )}
      </div>
    </>
  );
};

export default CategoryClient;
