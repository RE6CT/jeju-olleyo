import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import CategoryClient from './category-client';
import { CategoryParamType } from '@/types/category.type';
import { usePrefetchPlacesByCategory } from '@/lib/queries/use-get-places';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';

/** 서버에서 초기 데이터를 로드하는 서버 컴포넌트 페이지 */
const CategoryPage = async ({
  params,
}: {
  params: { category: CategoryParamType };
}) => {
  const queryClient = new QueryClient();
  const { user } = await fetchGetCurrentUser();

  const urlCategory = params.category;

  await usePrefetchPlacesByCategory(queryClient, urlCategory);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex flex-col items-center justify-center p-9">
        <CategoryClient category={urlCategory} userId={user?.id || null} />
      </section>
    </HydrationBoundary>
  );
};

export default CategoryPage;
