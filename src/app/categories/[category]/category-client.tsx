'use client';

import ErrorMessage from '@/app/error';
import Loading from '@/app/loading';
import PlaceCard from '@/components/features/card/place-card';
import { useGetPlacesByCategoryQuery } from '@/lib/queries/use-get-places';
import Banner from '@/app/search/_components/banner';
import { Place } from '@/types/search.type';

const CategoryClient = ({ category }: { category: string }) => {
  const {
    data: places,
    isPending,
    isError,
  } = useGetPlacesByCategoryQuery(category);

  if (isPending) return <Loading />;
  if (isError) return <ErrorMessage message="장소 불러오기 오류 발생" />;

  const grouped: JSX.Element[] = [];

  for (let i = 0; i < places.length; i += 8) {
    const slice = places.slice(i, i + 8);

    // 카드 8개 묶음
    grouped.push(
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {slice.map((place) => (
          <PlaceCard
            key={place.id}
            className="m-[11px] h-[230px] w-[230px]"
            placeId={place.place_id}
            image={place.image}
            title={place.title}
            isLiked={false}
            isDragging={false}
          />
        ))}
      </div>,
    );

    // 배너 삽입
    if (i + 8 < places.length) {
      grouped.push(<Banner key={`banner-${i}`} />);
    }
  }

  return <>{grouped}</>;
};

export default CategoryClient;
