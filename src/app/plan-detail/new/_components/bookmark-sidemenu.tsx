'use client';

import { useEffect, useState } from 'react';
import PlaceSidemenuLayout from '../../_components/place-sidemenu-layout';
import PlaceCardCategory from '../../_components/place-card-category';
import { fetchGetAllBookmarksByUserId } from '@/lib/apis/bookmark/get-bookmark.api';
import useAuth from '@/lib/hooks/use-auth';
import { CategoryType } from '@/types/category-badge.type';

interface BookmarkedPlace {
  place_id: number;
  title: string;
  category: CategoryType;
  image: string;
  created_at: string;
}

const BookmarkSidemenu = ({
  userId,
  filterTabs,
  activeFilterTab,
  onFilterTabChange,
}: {
  userId: string;
  filterTabs: string[];
  activeFilterTab: string;
  onFilterTabChange: (tab: string) => void;
}) => {
  const [bookmarkedPlaces, setBookmarkedPlaces] = useState<BookmarkedPlace[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setIsLoading(true);
        const data = await fetchGetAllBookmarksByUserId(userId);
        // API 응답을 컴포넌트에서 사용하는 형식으로 변환
        const transformedData =
          data?.map((item) => ({
            place_id: item.placeId,
            title: item.title,
            category: '관광' as CategoryType, // TODO: API에서 category 정보 받아오기
            image: item.image,
            created_at: item.createdAt,
          })) ?? [];
        setBookmarkedPlaces(transformedData);
      } catch (error) {
        console.error('북마크 데이터 불러오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  /* 북마크 토글 기능 */
  const handleBookmarkToggle = async (id: number) => {
    console.log('북마크 토글:', id);
    // TODO: 북마크 토글 API 구현
  };

  /* 카테고리별 필터링 */
  const filteredPlaces =
    activeFilterTab === '전체'
      ? bookmarkedPlaces
      : bookmarkedPlaces.filter((place) => place.category === activeFilterTab);

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
