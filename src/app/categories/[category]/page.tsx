import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import { usePrefetchPlacesByCategory } from '@/lib/queries/use-prefetch-places';
import CategoryClient from './category-client';

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const queryClient = new QueryClient();

  const urlCategory = params.category;

  await usePrefetchPlacesByCategory(queryClient, urlCategory);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex flex-col items-center justify-center gap-[11px] p-9">
        <CategoryClient category={urlCategory} />
      </section>
    </HydrationBoundary>
  );
};

export default CategoryPage;
