'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';

import { Button } from '@/components/ui/button';
import DynamicPagination from '@/components/ui/dynamic-pagination';
import fetchGetAllPlaces from '@/lib/apis/search/get-place.api';
import { useBookmarkQuery } from '@/lib/queries/use-bookmark-query';
import { CategoryType } from '@/types/category.type';
import { Place } from '@/types/search.type';

import DaySelectRequiredModal from '../modal/day-select-required-modal';
import PlaceCardSidemenu from '../card/place-card-sidemenu';
import PlaceSidemenuLayout from './place-sidemenu-layout';
import { useCurrentUser } from '@/lib/queries/auth-queries';

const ITEMS_PER_PAGE = 7;
const INITIAL_ITEMS = 3;
const NAVIGATION_BUTTON_WIDTH = 42.4;
const NAVIGATION_BUTTON_GAP = 12;
const BUTTON_WIDTH = 24;
const DEBOUNCE_TIME = 200;

/**
 * 검색 결과를 표시하는 사이드메뉴 컴포넌트
 *
 * @param userId - 사용자 ID
 * @param filterTabs - 필터 탭 목록
 * @param activeFilterTab - 현재 선택된 필터 탭
 * @param onFilterTabChange - 필터 탭 변경 핸들러
 * @param onAddPlace - 장소 추가 핸들러
 * @param selectedDay - 선택된 날짜
 */
const SearchSidemenu = ({
  filterTabs,
  activeFilterTab,
  onFilterTabChange,
  onAddPlace,
  selectedDay,
}: {
  filterTabs: CategoryType[];
  activeFilterTab: CategoryType;
  onFilterTabChange: (tab: CategoryType) => void;
  onAddPlace: (place: Place) => void;
  selectedDay: number | null;
}) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxVisiblePages, setMaxVisiblePages] = useState(3);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDaySelectModalOpen, setIsDaySelectModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();
  const listRef = useRef<HTMLDivElement>(null);

  const { data: user } = useCurrentUser();
  const userId = user?.id || null;

  const { toggleBookmark, isBookmarked } = useBookmarkQuery(userId);

  const filteredPlaces = places.filter((place) => {
    const matchesCategory =
      activeFilterTab === '전체' || place.category === activeFilterTab;
    const matchesSearch =
      place.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredPlaces.length / ITEMS_PER_PAGE);

  const calculateMaxVisiblePages = useCallback(() => {
    if (!containerRef.current) return 3;

    const containerWidth = containerRef.current.offsetWidth;

    // 총 페이지 수에 따른 최대 버튼 수 계산
    const maxButtons = Math.floor(
      (containerWidth - NAVIGATION_BUTTON_WIDTH * 2) / // 이전/다음 버튼 공간 제외
        (NAVIGATION_BUTTON_GAP + BUTTON_WIDTH), // gap 포함 + 최대 3자리수까지 고려
    );

    return Math.max(1, maxButtons);
  }, [totalPages]);

  const updateMaxVisiblePages = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = setTimeout(() => {
      setMaxVisiblePages(calculateMaxVisiblePages());
    }, DEBOUNCE_TIME); // 200ms 디바운스 -> resize 이벤트가 빈번하게 일어나 계산이 너무 자주 일어나지 않도록 구현
  }, [calculateMaxVisiblePages]);

  useEffect(() => {
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
        const placesResponse = await fetchGetAllPlaces(); // fetchGetPlacesByCategory로 대체하여 페이지네이션 구현
        setPlaces(placesResponse || []);
      } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleAddPlace = (place: Place) => {
    if (selectedDay === null) {
      setIsDaySelectModalOpen(true);
      return;
    }

    // 장소의 위치 정보가 있는지 확인
    if (!place.lat || !place.lng) {
      console.error('장소의 위치 정보가 없습니다:', place);
      return;
    }

    onAddPlace(place);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleBookmarkToggle = async (placeId: number) => {
    try {
      // 현재 스크롤 위치 저장
      if (listRef.current) {
        setScrollPosition(listRef.current.scrollTop);
      }

      await toggleBookmark(placeId);

      // 북마크 상태 변경 후 스크롤 위치 복원
      setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollTop = scrollPosition;
        }
      }, 0);
    } catch (error) {
      console.error('북마크 토글에 실패했습니다:', error);
    }
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
    <div className="w-[240px] rounded-[12px] bg-gray-100 px-3 py-2">
      <div className="flex items-center gap-3">
        <img src="/icons/search.svg" alt="검색" className="h-5 w-5" />
        <input
          type="text"
          placeholder="장소를 검색해 추가하세요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="medium-14 border-none bg-transparent text-gray-500 placeholder:text-gray-400 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
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
      >
        <div className="flex items-center justify-center p-4">
          <p>로딩 중...</p>
        </div>
      </PlaceSidemenuLayout>
    );
  }

  if (!userId) return null;

  return (
    <PlaceSidemenuLayout
      isBookmarkSection={false}
      filterTabs={filterTabs}
      activeFilterTab={activeFilterTab}
      onFilterTabChange={onFilterTabChange}
      topContent={searchBar}
    >
      {/* 검색 결과 */}
      <div className="space-y-2" ref={containerRef}>
        {displayedPlaces.length > 0 ? (
          <div ref={listRef} className="overflow-y-auto">
            <AnimatePresence initial={false}>
              {displayedPlaces.map((place) => (
                <motion.div
                  key={place.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <PlaceCardSidemenu
                    title={place.title}
                    category={place.category as CategoryType}
                    imageUrl={place.image || ''}
                    isBookmarked={isBookmarked(place.placeId)}
                    toggleBookmark={() => handleBookmarkToggle(place.placeId)}
                    onAddPlace={() => handleAddPlace(place)}
                    placeId={place.placeId}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
            {currentPageItems.length > INITIAL_ITEMS && (
              <Button
                className="flex h-[36px] w-full flex-shrink-0 items-center justify-center gap-1 rounded-xl border border-secondary-300 bg-gray-50 text-sm font-normal text-secondary-300 transition-colors hover:bg-gray-100"
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
          </div>
        ) : (
          <div className="flex items-center justify-center p-4">
            <p>검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
      <DaySelectRequiredModal
        isOpen={isDaySelectModalOpen}
        onClose={() => setIsDaySelectModalOpen(false)}
      />
    </PlaceSidemenuLayout>
  );
};

export default SearchSidemenu;
