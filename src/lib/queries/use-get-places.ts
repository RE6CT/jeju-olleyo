'use client';

import { useQuery } from '@tanstack/react-query';
import fetchGetAllPlaces from '../apis/search/get-place.api';
import fetchGetPlacesByCategory from '../apis/search/get-place-by-categories.api';

export const useGetPlacesByCategoryQuery = (category: string) => {
  const isAll = category === 'all';

  return useQuery({
    queryKey: ['places', category],
    queryFn: isAll
      ? fetchGetAllPlaces
      : () => fetchGetPlacesByCategory(category),
    enabled: false,
  });
};
