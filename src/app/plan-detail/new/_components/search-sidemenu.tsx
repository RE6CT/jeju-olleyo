'use client';

import { Button } from '@/components/ui/button';
import PlaceSidemenuLayout from '../../_components/place-sidemenu-layout';
import { Input } from '@/components/ui/input';
import PlaceCardCategory from '../../_components/place-card-category';
import { CategoryType } from '@/types/category-badge.type';
import fetchGetAllPlaces from '@/lib/apis/search/get-place.api';
import fetchDeleteBookmark from '@/lib/apis/bookmark/delete-bookmark.api';
import { fetchGetAllBookmarksByUserId } from '@/lib/apis/bookmark/get-bookmark.api';
import { useEffect, useState } from 'react';
import { Place } from '@/types/search.type';
import Pagination from '@/components/ui/pagination';

const ITEMS_PER_PAGE = 7;
const INITIAL_ITEMS = 3;

const SearchSidemenu = ({
  filterTabs,
  activeFilterTab,
  onFilterTabChange,
  userId,
}: {
  filterTabs: CategoryType[];
  activeFilterTab: CategoryType;
  onFilterTabChange: (tab: CategoryType) => void;
  userId: string;
}) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [bookmarkedPlaces, setBookmarkedPlaces] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('데이터 로딩 시작');
        const [placesResponse, bookmarksResponse] = await Promise.all([
          fetchGetAllPlaces(),
          fetchGetAllBookmarksByUserId(userId),
        ]);

        setPlaces(placesResponse || []);
        setBookmarkedPlaces(
          bookmarksResponse?.map((bookmark) => bookmark.placeId) ?? [],
        );
      } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleBookmarkToggle = async (id: number) => {
    try {
      if (bookmarkedPlaces.includes(id)) {
        await fetchDeleteBookmark(id);
        setBookmarkedPlaces((prev) => prev.filter((placeId) => placeId !== id));
      } else {
        // TODO: 북마크 추가 API 구현 필요
        console.log('북마크 추가:', id);
      }
    } catch (error) {
      console.error('북마크 토글에 실패했습니다:', error);
    }
  };

  const handleAddPlace = (id: number) => {
    console.log('장소 추가:', id);
  };

  const filteredPlaces = places.filter((place) => {
    const matchesCategory =
      activeFilterTab === '전체' || place.category === activeFilterTab;
    const matchesSearch =
      place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPlaces.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // 현재 페이지의 아이템들을 가져옴
  const currentPageItems = filteredPlaces.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // 접힌 상태일 때는 현재 페이지 아이템 중 처음 3개만, 펼친 상태일 때는 모든 아이템이 보이도록 현재 페이지 아이템을 가져옴
  const displayedPlaces = isExpanded
    ? currentPageItems
    : currentPageItems.slice(0, INITIAL_ITEMS);

  const searchBar = (
    <div className="rounded-[12px] bg-gray-100 px-3 py-2">
      <div className="flex items-center gap-[12px]">
        <img src="/icons/search.svg" alt="검색" className="h-5 w-5" />
        <Input
          type="text"
          placeholder="장소를 검색해 추가하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border-none bg-transparent text-14 font-medium leading-[150%] text-[#698EA1] placeholder:text-gray-400 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );

  if (isLoading) {
    return (
      <PlaceSidemenuLayout
        isBookmarkSection={false}
        filterTabs={filterTabs}
        activeFilterTab={activeFilterTab}
        onFilterTabChange={onFilterTabChange}
        topContent={searchBar}
        isExpanded={false}
      >
        <div className="flex items-center justify-center p-4">
          <p>로딩 중...</p>
        </div>
      </PlaceSidemenuLayout>
    );
  }

  return (
    <PlaceSidemenuLayout
      isBookmarkSection={false}
      filterTabs={filterTabs}
      activeFilterTab={activeFilterTab}
      onFilterTabChange={onFilterTabChange}
      topContent={searchBar}
      isExpanded={isExpanded}
    >
      {/* 검색 결과 */}
      <div className="space-y-2">
        {displayedPlaces.length > 0 ? (
          <>
            {displayedPlaces.map((place) => (
              <PlaceCardCategory
                key={place.id}
                title={place.title}
                category={place.category as CategoryType}
                imageUrl={place.image || ''}
                isBookmarked={bookmarkedPlaces.includes(place.id)}
                isSearchSection
                onBookmarkToggle={() => handleBookmarkToggle(place.id)}
                onAddPlace={() => handleAddPlace(place.id)}
              />
            ))}
            {currentPageItems.length > INITIAL_ITEMS && (
              <Button
                variant="ghost"
                className="w-full text-gray-500"
                onClick={toggleExpand}
              >
                {isExpanded ? '접기' : '더보기'}
              </Button>
            )}
            {isExpanded && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="flex items-center justify-center p-4">
            <p>검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </PlaceSidemenuLayout>
  );
};

export default SearchSidemenu;
