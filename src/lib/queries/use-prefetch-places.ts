import { QueryClient } from '@tanstack/react-query';
import fetchGetAllPlaces from '../apis/search/get-place.api';
import fetchGetPlacesByCategory from '../apis/search/get-place-by-categories.api';

export const usePrefetchPlacesByCategory = async (
  queryClient: QueryClient,
  category: string,
) => {
  const isAll = category === 'all';

  await queryClient.prefetchQuery({
    queryKey: ['places', category],
    queryFn: isAll
      ? fetchGetAllPlaces
      : () => fetchGetPlacesByCategory(category),
  });
};
