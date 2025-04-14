import fetchGetPlacesByCategory from '@/lib/apis/search/get-place-by-categories.api';
import fetchGetAllPlaces from '@/lib/apis/search/get-place.api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import CategoryClient from './category-client';
import { CATEGORY_KR_MAP } from '@/constants/home.constants';

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const queryClient = new QueryClient();

  const urlCategory = params.category;
  const krCategory = CATEGORY_KR_MAP[urlCategory];

  if (!krCategory) {
    throw new Error('유효하지 않은 카테고리입니다.');
  }

  await queryClient.prefetchQuery({
    queryKey: ['places', krCategory],
    queryFn:
      krCategory === '전체'
        ? fetchGetAllPlaces
        : () => fetchGetPlacesByCategory(krCategory),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex flex-col gap-6 p-10">
        <CategoryClient category={krCategory} />
      </section>
    </HydrationBoundary>
  );
};

export default CategoryPage;
