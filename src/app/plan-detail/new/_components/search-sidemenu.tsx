'use client';

import { Button } from '@/components/ui/button';
import PlaceSidemenuLayout from '../../_components/place-sidemenu-layout';
import { Input } from '@/components/ui/input';
import PlaceCardCategory from '../../_components/place-card-category';
import { CategoryType } from '@/types/category-badge.type';
import fetchGetAllPlaces from '@/lib/apis/search/get-place.api';
import fetchDeleteBookmark from '@/lib/apis/bookmark/delete-bookmark.api';
import { fetchGetAllBookmarksByUserId } from '@/lib/apis/bookmark/get-bookmark.api';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Place } from '@/types/search.type';
import DynamicPagination from '@/components/ui/dynamic-pagination';

const ITEMS_PER_PAGE = 7;
const INITIAL_ITEMS = 3;
const NAVIGATION_BUTTON_WIDTH = 42.4;
const NAVIGATION_BUTTON_GAP = 4;
const DEBOUNCE_TIME = 200;

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
  const [maxVisiblePages, setMaxVisiblePages] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout>(); // 디바운스 타임아웃 참조

  const filteredPlaces = places.filter((place) => {
    const matchesCategory =
      activeFilterTab === '전체' || place.category === activeFilterTab;
    const matchesSearch =
      place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPlaces.length / ITEMS_PER_PAGE);

  // 버튼의 width: 한자리 숫자일 때 27px, 두자리 숫자일 때 33px, 세자리 숫자일 때 39px(예상) + gap 4px
  // 이전, 다음 버튼: 42px
  // 버튼 너비 계산: 숫자 자릿수별 너비 + 패딩(8px) + 갭(4px)
  const getButtonWidth = useMemo(
    () => (numLength: number) => {
      const digitWidth = 6; // 숫자 1자당 약 6px
      return numLength * digitWidth + 21;
    },
    [],
  );

  const calculateMaxVisiblePages = useCallback(() => {
    if (!containerRef.current) return 3;

    const containerWidth = containerRef.current.offsetWidth;

    // 총 페이지 수에 따른 최대 버튼 수 계산
    const maxButtons = Math.floor(
      (containerWidth - NAVIGATION_BUTTON_WIDTH * 2) / // 이전/다음 버튼 공간 제외
        (NAVIGATION_BUTTON_GAP +
          getButtonWidth(Math.min(3, totalPages.toString().length))), // gap 포함 + 최대 3자리수까지 고려
    );
    return Math.max(1, maxButtons);
  }, [getButtonWidth, totalPages]);

  const updateMaxVisiblePages = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = setTimeout(() => {
      setMaxVisiblePages(calculateMaxVisiblePages());
    }, DEBOUNCE_TIME); // 200ms 디바운스 -> resize 이벤트가 빈번하게 일어나 계산이 너무 자주 일어나지 않도록 구현
  }, [calculateMaxVisiblePages]);

  useEffect(() => {
    // 초기 계산
    setMaxVisiblePages(calculateMaxVisiblePages());

    window.addEventListener('resize', updateMaxVisiblePages);

    return () => {
      window.removeEventListener('resize', updateMaxVisiblePages);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [calculateMaxVisiblePages, updateMaxVisiblePages]);

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
      <div className="space-y-2" ref={containerRef}>
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
              <DynamicPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                maxVisiblePages={maxVisiblePages}
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
