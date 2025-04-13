'use client';

import PlaceSidemenuLayout from '../../_components/place-sidemenu-layout';
import PlaceCardCategory from '../../_components/place-card-category';

// 예시 데이터
const MOCK_PLACES = [
  {
    id: 1,
    title: '대박 카페',
    category: '맛집',
    imageUrl: '/images/default-place.jpg',
    isBookmarked: true,
  },
  {
    id: 2,
    title: '제주 호텔',
    category: '숙소',
    imageUrl: '/images/default-place.jpg',
    isBookmarked: true,
  },
  {
    id: 3,
    title: '한라산',
    category: '명소',
    imageUrl: '/images/default-place.jpg',
    isBookmarked: true,
  },
];

const BookmarkSidemenu = ({
  filterTabs,
  activeFilterTab,
  onFilterTabChange,
}: {
  filterTabs: string[];
  activeFilterTab: string;
  onFilterTabChange: (tab: string) => void;
}) => {
  const handleBookmarkToggle = (id: number) => {
    console.log('북마크 토글:', id);
  };

  return (
    <PlaceSidemenuLayout
      isBookmarkSection
      filterTabs={filterTabs}
      activeFilterTab={activeFilterTab}
      onFilterTabChange={onFilterTabChange}
    >
      {/* 북마크 리스트 */}
      <div className="space-y-2">
        {MOCK_PLACES.map((place) => (
          <PlaceCardCategory
            key={place.id}
            title={place.title}
            category={place.category as any}
            imageUrl={place.imageUrl}
            isBookmarked={place.isBookmarked}
            onBookmarkToggle={() => handleBookmarkToggle(place.id)}
          />
        ))}
      </div>
    </PlaceSidemenuLayout>
  );
};

export default BookmarkSidemenu;
