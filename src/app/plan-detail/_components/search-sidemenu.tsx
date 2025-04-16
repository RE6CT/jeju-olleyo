'use client';

import { Button } from '@/components/ui/button';
import PlaceSidemenuLayout from './place-sidemenu-layout';
import { Input } from '@/components/ui/input';
import PlaceCardCategory from './place-card-category';
import { CategoryType } from '@/types/category-badge.type';
import fetchGetAllPlaces from '@/lib/apis/search/get-place.api';
import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Place } from '@/types/search.type';
import DynamicPagination from '@/components/ui/dynamic-pagination';
import { useBookmarkQuery } from '@/lib/hooks/use-bookmark-query';
import { motion, AnimatePresence } from 'framer-motion';
import DaySelectRequiredModal from './day-select-required-modal';

const ITEMS_PER_PAGE = 7;
const INITIAL_ITEMS = 5;
const NAVIGATION_BUTTON_WIDTH = 42.4;
const NAVIGATION_BUTTON_GAP = 4;
const DEBOUNCE_TIME = 200;

const SearchSidemenu = ({
  filterTabs,
  activeFilterTab,
  onFilterTabChange,
  userId,
  onAddPlace,
  selectedDay,
}: {
  filterTabs: CategoryType[];
  activeFilterTab: CategoryType;
  onFilterTabChange: (tab: CategoryType) => void;
  userId: string;
  onAddPlace: (place: Place) => void;
  selectedDay: number | null;
}) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxVisiblePages, setMaxVisiblePages] = useState(3);
  const [isDaySelectModalOpen, setIsDaySelectModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();
  const [scrollPosition, setScrollPosition] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const { isBookmarked, toggleBookmark } = useBookmarkQuery(userId);

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
        const placesResponse = await fetchGetAllPlaces();
        setPlaces(placesResponse || []);
      } catch (error) {
        console.error('데이터를 가져오는데 실패했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userId]);

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

  const handleAddPlace = (place: Place) => {
    if (selectedDay === null) {
      setIsDaySelectModalOpen(true);
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
                  <PlaceCardCategory
                    title={place.title}
                    category={place.category as CategoryType}
                    imageUrl={place.image || ''}
                    isBookmarked={isBookmarked(place.placeId)}
                    isSearchSection
                    onBookmarkToggle={() => handleBookmarkToggle(place.placeId)}
                    onAddPlace={() => handleAddPlace(place)}
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
