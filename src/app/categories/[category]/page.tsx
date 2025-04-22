import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { prefetchPlacesByCategory } from '@/lib/queries/use-get-places';
import { CategoryParamType } from '@/types/category.type';

import CategoryClient from './category-client';

/** 서버에서 초기 데이터를 로드하는 서버 컴포넌트 페이지 */
const CategoryPage = async ({
  params,
}: {
  params: { category: CategoryParamType };
}) => {
  const queryClient = new QueryClient();

  const urlCategory = params.category;
  await prefetchPlacesByCategory(queryClient, urlCategory);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex flex-col items-center justify-center p-9">
        <CategoryClient category={urlCategory} />
      </section>
    </HydrationBoundary>
  );
};

export default CategoryPage;
