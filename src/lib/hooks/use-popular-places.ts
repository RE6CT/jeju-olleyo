import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

import { getPopularPlaces } from '@/lib/apis/home/home.popular.api';
import { Place } from '@/types/home.popular-place.type';
import { useBookmarkStore } from '@/zustand/bookmark.store';

import useAuth from './use-auth';

/**
 * 인기 장소 데이터를 가져오고 북마크 상태를 적용하는 커스텀 훅
 * UI 깜빡임 방지를 위한 데이터 캐싱 및 이전 데이터 유지 기능 포함
 *
 * @param category - 가져올 장소의 카테고리
 * @returns 북마크 상태가 적용된 인기 장소 데이터와 로딩 상태
 */
export const usePopularPlaces = (category: string = '전체') => {
  const isBookmarked = useBookmarkStore((state) => state.isBookmarked);
  const [previousData, setPreviousData] = useState<Place[]>([]);
  const { user } = useAuth();

  // React Query를 사용한 데이터 패칭
  const { data, isLoading, error } = useQuery({
    queryKey: ['popularPlaces', category, user?.id],
    queryFn: () => getPopularPlaces(category, user?.id),
    // 데이터가 stale 상태가 되더라도 즉시 리페칭하지 않도록 설정
    staleTime: 1000 * 60 * 5, // 5분
    // 캐시 시간 설정
    gcTime: 1000 * 60 * 10, // 10분
    // 화면 포커스 시 자동 리페칭 방지
    refetchOnWindowFocus: false,
  });

  // 데이터가 로드되면 이전 데이터 업데이트
  useEffect(() => {
    if (data && !isLoading) {
      setPreviousData(data);
    }
  }, [data, isLoading]);

  // 로컬 북마크 상태 적용
  const placesWithBookmarks = data
    ? data.map((place) => ({
        ...place,
        isBookmarked: user ? place.isBookmarked : isBookmarked(place.id),
      }))
    : previousData.length > 0
      ? previousData.map((place) => ({
          ...place,
          isBookmarked: user ? place.isBookmarked : isBookmarked(place.id),
        }))
      : [];

  return {
    places: placesWithBookmarks,
    isLoading,
    error,
    // 첫 로딩인지 여부 추가 (스켈레톤 UI 표시 여부 결정에 사용)
    isFirstLoading: isLoading && previousData.length === 0,
  };
};
