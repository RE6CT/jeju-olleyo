'use client';

import { useCallback, useState, useEffect } from 'react';
import PlaceSidemenuLayout from '../../_components/place-sidemenu-layout';
import PlaceCardCategory from '../../_components/place-card-category';
import {
  fetchGetAllBookmarksByUserId,
  fetchGetBookmarkByIdQuery,
} from '@/lib/apis/bookmark/get-bookmark.api';
import fetchAddBookmarkByIdQuery from '@/lib/apis/bookmark/add-bookmark.api';
import fetchDeleteBookmark from '@/lib/apis/bookmark/delete-bookmark.api';
import useAuth from '@/lib/hooks/use-auth';
import { CategoryType } from '@/types/category-badge.type';
import useBookmark from '@/lib/hooks/use-bookmark';
import { getPlaceImageWithFallback } from '@/lib/utils/get-image-with-fallback';
import ErrorMessage from '@/components/ui/error-message';
import { BookmarkedPlace } from '@/types/plan-detail.type';

/**
 * 북마크된 장소들을 사이드메뉴에 표시하는 컴포넌트
 *
 * @param userId - 현재 로그인한 사용자의 ID
 * @param filterTabs - 카테고리 필터 탭 목록
 * @param activeFilterTab - 현재 선택된 필터 탭
 * @param onFilterTabChange - 필터 탭 변경 핸들러
 */
const BookmarkSidemenu = ({
  userId,
  filterTabs,
  activeFilterTab,
  onFilterTabChange,
}: {
  userId: string;
  filterTabs: CategoryType[];
  activeFilterTab: CategoryType;
  onFilterTabChange: (tab: CategoryType) => void;
}) => {
  const [bookmarkedPlaces, setBookmarkedPlaces] = useState<BookmarkedPlace[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 북마크가 최신 상태 유지를 보장하기 때문에, useCallback을 사용하여 메모이제이션
  const fetchBookmarks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchGetAllBookmarksByUserId(userId);

      const transformedData =
        data?.map((item) => ({
          place_id: item.placeId,
          title: item.title,
          category: item.category as CategoryType,
          image: getPlaceImageWithFallback(item.image),
          created_at: item.createdAt,
        })) ?? [];

      setBookmarkedPlaces(transformedData);
    } catch (err) {
      setError('북마크 데이터를 불러오는데 실패했습니다.');
      console.error('북마크 데이터 불러오기 실패:', err);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // 컴포넌트 마운트 시 북마크 데이터 로드
  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  /**
   * 북마크 토글 핸들러 함수
   * 장소의 북마크 상태를 토글하고 북마크 리스트를 업데이트
   *
   * @param placeId - 북마크를 토글할 장소의 ID
   * @throws {Error} 북마크 토글 작업 실패 시 에러를 throw
   */
  const handleBookmarkToggle = async (placeId: number) => {
    try {
      const currentBookmark = await fetchGetBookmarkByIdQuery(placeId, userId);

      if (currentBookmark) {
        await fetchDeleteBookmark(currentBookmark.bookmark_id);
      } else {
        await fetchAddBookmarkByIdQuery(placeId, userId);
      }

      // 북마크 리스트 업데이트
      setBookmarkedPlaces((prevPlaces) =>
        prevPlaces.filter((place) => place.place_id !== placeId),
      );
    } catch (err) {
      setError('북마크 토글에 실패했습니다.');
      console.error('북마크 토글 실패:', err);
    }
  };

  /* 카테고리별 필터링 */
  const filteredPlaces =
    activeFilterTab === '전체'
      ? bookmarkedPlaces
      : bookmarkedPlaces.filter((place) => place.category === activeFilterTab);

  if (error) {
    return (
      <ErrorMessage
        title={'북마크 데이터를 불러오는데 실패했습니다.'}
        description={error}
      />
    );
  }

  return (
    <PlaceSidemenuLayout
      isBookmarkSection
      filterTabs={filterTabs}
      activeFilterTab={activeFilterTab}
      onFilterTabChange={onFilterTabChange}
    >
      {/* 북마크 리스트 */}
      <div className="space-y-2">
        {isLoading ? (
          <div className="flex items-center justify-center py-4 text-gray-500">
            불러오는 중...
          </div>
        ) : filteredPlaces.length === 0 ? (
          <div className="flex items-center justify-center py-4 text-gray-500">
            {activeFilterTab === '전체'
              ? '북마크한 장소가 없습니다.'
              : `북마크한 ${activeFilterTab} 장소가 없습니다.`}
          </div>
        ) : (
          filteredPlaces.map((place) => (
            <PlaceCardCategory
              key={place.place_id}
              title={place.title}
              category={place.category}
              imageUrl={place.image}
              isBookmarked={true}
              onBookmarkToggle={() => handleBookmarkToggle(place.place_id)}
            />
          ))
        )}
      </div>
    </PlaceSidemenuLayout>
  );
};

export default BookmarkSidemenu;
