import { useQuery } from '@tanstack/react-query';
import { getPopularPlaces } from '@/lib/apis/home/home.popular.api';
import { useBookmarkStore } from '@/zustand/home.place.store';
import { Place } from '@/types/home.popular-place.type';
import { useState, useEffect } from 'react';

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

  // React Query를 사용한 데이터 패칭
  const { data, isLoading, error } = useQuery({
    queryKey: ['popularPlaces', category],
    queryFn: () => getPopularPlaces(category),
    // 데이터가 stale 상태가 되더라도 즉시 리페칭하지 않도록 설정
    staleTime: 1000 * 60 * 5, // 5분
    // 캐시 시간 설정
    gcTime: 1000 * 60 * 10, // 10분
    // 화면 포커스 시 자동 리페칭 방지
    refetchOnWindowFocus: false,
    // 이전 데이터 유지
    placeholderData: previousData.length > 0 ? previousData : undefined,
  });

  // 데이터가 로드되면 이전 데이터 업데이트
  useEffect(() => {
    if (data && !isLoading) {
      setPreviousData(
        data.map((place) => ({
          ...place,
          isBookmarked: false,
          name: place.title,
          bookmarkCount: 0,
        })),
      );
    }
  }, [data, isLoading]);

  // 북마크 상태 적용
  const placesWithBookmarks = data
    ? data.map((place) => ({
        ...place,
        isBookmarked: isBookmarked(place.id as any),
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

export default usePopularPlaces;
