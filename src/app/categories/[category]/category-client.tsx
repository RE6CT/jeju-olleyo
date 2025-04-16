'use client';

import ErrorMessage from '@/app/error';
import Loading from '@/app/loading';
import { useGetPlacesByCategoryQuery } from '@/lib/queries/use-get-places';

const CategoryClient = ({ category }: { category: string }) => {
  const { data, isPending, isError } = useGetPlacesByCategoryQuery(category);

  if (isPending) return <Loading />;
  if (isError) return <ErrorMessage message="장소 불러오기 오류 발생" />;
  return (
    <>
      {(data as any[])?.map((place) => <div key={place.id}>{place.title}</div>)}
    </>
  );
};

export default CategoryClient;
