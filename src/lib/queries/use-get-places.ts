'use client';

import { useQuery } from '@tanstack/react-query';
import fetchGetAllPlaces from '../apis/search/get-place.api';
import fetchGetPlacesByCategory from '../apis/search/get-place-by-categories.api';

/**
 *
 * @param category - 전체 / 명소, 맛집, 카페, 숙박 적용 함수 로직 분리
 *
 */
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
