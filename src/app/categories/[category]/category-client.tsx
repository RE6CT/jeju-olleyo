'use client';

import ErrorMessage from '@/app/error';
import Loading from '@/app/loading';
import fetchGetPlacesByCategory from '@/lib/apis/search/get-place-by-categories.api';
import fetchGetAllPlaces from '@/lib/apis/search/get-place.api';
import { useQuery } from '@tanstack/react-query';

const CategoryClient = ({ category }: { category: string }) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['places', category],
  });

  if (isPending) return <Loading />;
  if (isError) return <ErrorMessage message="장소 불러오기 오류 발생" />;

  return (
    <>
      {(data as any[])?.map((place) => <div key={place.id}>{place.title}</div>)}
    </>
  );
};

export default CategoryClient;
