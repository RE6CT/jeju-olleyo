import fetchGetPlacesByCategory from '@/lib/apis/search/get-place-by-categories.api';
import fetchGetAllPlaces from '@/lib/apis/search/get-place.api';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import CategoryClient from './category-client';
import { usePrefetchPlacesByCategory } from '@/lib/queries/use-prefetch-places';

const CategoryPage = async ({ params }: { params: { category: string } }) => {
  const queryClient = new QueryClient();

  const urlCategory = params.category;

  await usePrefetchPlacesByCategory(queryClient, urlCategory);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="flex flex-col gap-6 p-10">
        <CategoryClient category={urlCategory} />
      </section>
    </HydrationBoundary>
  );
};

export default CategoryPage;
