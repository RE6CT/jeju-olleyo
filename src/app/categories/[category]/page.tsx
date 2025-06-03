import { CategoryParamType } from '@/types/category.type';

import CategoryClient from '../_components/_client/category-client';
import { Metadata } from 'next';
import { CATEGORY_KR_MAP } from '@/constants/home.constants';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { prefetchPlacesByCategory } from '@/lib/queries/use-get-places';

export async function generateMetadata({
  params,
}: {
  params: { category: CategoryParamType };
}): Promise<Metadata> {
  const { category } = params;

  const title = CATEGORY_KR_MAP[category];

  const description = '제주도 여행지의 다양한 정보를 확인해보세요.';

  return {
    title: `제주도 여행지 정보 - ${title}`,
    description,
    openGraph: {
      title: `제주도 여행지 정보 - ${title}`,
      description,
    },
  };
}

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
      <div className="flex flex-col items-center justify-center bg-white p-4 md:p-7 lg:p-9">
        <CategoryClient category={urlCategory} />
      </div>
    </HydrationBoundary>
  );
};

export default CategoryPage;
