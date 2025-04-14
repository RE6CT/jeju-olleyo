'use client';

import { Button } from '@/components/ui/button';
import PlaceSidemenuLayout from '../../_components/place-sidemenu-layout';
import { Input } from '@/components/ui/input';
import PlaceCardCategory from '../../_components/place-card-category';

// 예시 데이터
const MOCK_PLACES = [
  {
    id: 1,
    title: '제주 해변 카페',
    address: '제주시 해변로 123-45',
    category: '맛집',
    imageUrl: '/images/default_place_image.svg',
    isBookmarked: false,
  },
  {
    id: 2,
    title: '제주 리조트',
    address: '제주시 중문관광로 567-89',
    category: '숙소',
    imageUrl: '/images/default_place_image.svg',
    isBookmarked: true,
  },
  {
    id: 3,
    title: '성산일출봉',
    address: '서귀포시 성산읍 123',
    category: '명소',
    imageUrl: '/logo/color_logo.svg',
    isBookmarked: false,
  },
];

const SearchSidemenu = ({
  filterTabs,
  activeFilterTab,
  onFilterTabChange,
}: {
  filterTabs: string[];
  activeFilterTab: string;
  onFilterTabChange: (tab: string) => void;
}) => {
  const handleBookmarkToggle = (id: number) => {
    //console.log('북마크 토글:', id);
  };

  const handleAddPlace = (id: number) => {
    //console.log('장소 추가:', id);
  };

  const searchBar = (
    <div className="rounded-[12px] bg-gray-100 px-3 py-2">
      <div className="flex items-center gap-[12px]">
        <img src="/icons/search.svg" alt="검색" className="h-5 w-5" />
        <Input
          type="text"
          placeholder="장소를 검색해 추가하세요"
          className="w-full border-none bg-transparent text-14 font-medium leading-[150%] text-[#698EA1] placeholder:text-gray-400 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );

  return (
    <PlaceSidemenuLayout
      isBookmarkSection={false}
      filterTabs={filterTabs}
      activeFilterTab={activeFilterTab}
      onFilterTabChange={onFilterTabChange}
      topContent={searchBar}
    >
      {/* 검색 결과 */}
      <div className="space-y-2">
        {MOCK_PLACES.map((place) => (
          <PlaceCardCategory
            key={place.id}
            title={place.title}
            category={place.category as any}
            imageUrl={place.imageUrl}
            isBookmarked={place.isBookmarked}
            isSearchSection
            onBookmarkToggle={() => handleBookmarkToggle(place.id)}
            onAddPlace={() => handleAddPlace(place.id)}
          />
        ))}
      </div>
    </PlaceSidemenuLayout>
  );
};

export default SearchSidemenu;
