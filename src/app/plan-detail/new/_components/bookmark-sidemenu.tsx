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
import { useBookmarkQuery } from '@/lib/hooks/use-bookmark-query';

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isBookmarked, toggleBookmark, bookmarks } = useBookmarkQuery(userId);

  const handleBookmarkToggle = async (place_id: number) => {
    try {
      await toggleBookmark(place_id);
    } catch (error) {
      setError('북마크를 업데이트하는 데 실패했습니다.');
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, [bookmarks]);

  /* 카테고리별 필터링 */
  const filteredPlaces = bookmarks
    ? activeFilterTab === '전체'
      ? bookmarks
      : bookmarks.filter((place) => place.category === activeFilterTab)
    : [];

  if (error) {
    return (
      <ErrorMessage
        title={'북마크 데이터를 불러오는데 실패했습니다.'}
        description={error}
      />
    );
  }

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
              key={place.placeId}
              title={place.title}
              category={place.category as CategoryType}
              imageUrl={place.image}
              isBookmarked={isBookmarked(place.placeId)}
              placeId={place.placeId}
              userId={userId}
              onBookmarkToggle={() => handleBookmarkToggle(place.placeId)}
            />
          ))
        )}
      </div>
    </PlaceSidemenuLayout>
  );
};

export default BookmarkSidemenu;
