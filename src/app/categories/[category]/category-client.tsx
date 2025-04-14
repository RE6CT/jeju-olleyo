'use client';

import ErrorMessage from '@/app/error';
import Loading from '@/app/loading';
import { CATEGORY_KR_MAP } from '@/constants/home.constants';
import { useQuery } from '@tanstack/react-query';

const CategoryClient = ({ category }: { category: string }) => {
  const krCategory = CATEGORY_KR_MAP[category];
  const { data, isPending, isError } = useQuery({
    queryKey: ['places', krCategory],
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
