'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';

import ErrorMessage from '@/components/features/alert/error-message';
import { Button } from '@/components/ui/button';
import DynamicPagination from '@/components/ui/dynamic-pagination';
import { CategoryType } from '@/types/category.type';
import { Place } from '@/types/search.type';
import { CATEGORY_EN_MAP } from '@/constants/home.constants';

import PlaceCardSidemenu from '../card/place-card-sidemenu';
import PlaceSidemenuLayout from './place-sidemenu-layout';
import DaySelectRequiredModal from '../modal/day-select-required-modal';
import { useGetDataCount } from '@/lib/queries/use-get-data-count';
import { useCurrentUser } from '@/lib/queries/auth-queries';
import { useBookmarkQuery } from '@/lib/queries/use-bookmark-query';

const ITEMS_PER_PAGE = 7;
const INITIAL_ITEMS = 3;
const NAVIGATION_BUTTON_WIDTH = 42.4;
const NAVIGATION_BUTTON_GAP = 12;
const BUTTON_WIDTH = 24;
const DEBOUNCE_TIME = 200;

/**
 * 북마크된 장소들을 사이드메뉴에 표시하는 컴포넌트
 *
 * @param userId - 현재 로그인한 사용자의 ID
 * @param filterTabs - 카테고리 필터 탭 목록
 * @param activeFilterTab - 현재 선택된 필터 탭
 * @param onFilterTabChange - 필터 탭 변경 핸들러
 * @param onAddPlace - 장소 추가 핸들러
 * @param selectedDay - 선택된 날짜
 */
const BookmarkSidemenu = ({
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
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxVisiblePages, setMaxVisiblePages] = useState(3);
  const [isDaySelectModalOpen, setIsDaySelectModalOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();
  const listRef = useRef<HTMLDivElement>(null);

  const { data: user } = useCurrentUser();
  const userId = user?.id || undefined;

  const { data: countData, isLoading: isCountLoading } =
    useGetDataCount(userId);

  const { bookmarks, toggleBookmark, isBookmarked, isLoading, error } =
    useBookmarkQuery(userId || null);

  const calculateMaxVisiblePages = useCallback(() => {
    if (!containerRef.current || !countData) return 3;

    const containerWidth = containerRef.current.offsetWidth;

    const maxButtons = Math.floor(
      (containerWidth - NAVIGATION_BUTTON_WIDTH * 2) /
        (NAVIGATION_BUTTON_GAP + BUTTON_WIDTH),
    );
    return Math.max(1, maxButtons);
  }, [countData, activeFilterTab]);

  const updateMaxVisiblePages = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = setTimeout(() => {
      setMaxVisiblePages(calculateMaxVisiblePages());
    }, DEBOUNCE_TIME);
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

  // 필터 탭이 변경될 때 페이지를 1로 리셋
  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilterTab]);

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
    if (!isExpanded) {
      setCurrentPage(1);
    }
  };

  const bookmarkCount =
    countData?.bookmarkCount[
      CATEGORY_EN_MAP[activeFilterTab] as keyof typeof countData.bookmarkCount
    ];

  const totalPages = bookmarkCount
    ? Math.ceil(bookmarkCount / ITEMS_PER_PAGE)
    : 0;

  if (!userId) return null;

  if (error) {
    return (
      <ErrorMessage
        title={'북마크 데이터를 불러오는데 실패했습니다.'}
        description={
          error instanceof Error
            ? error.message
            : '알 수 없는 오류가 발생했습니다.'
        }
      />
    );
  }

  return (
    <PlaceSidemenuLayout
      isBookmarkSection
      filterTabs={filterTabs}
      activeFilterTab={activeFilterTab}
      onFilterTabChange={onFilterTabChange}
      isExpanded={isExpanded}
      onToggleExpand={toggleExpand}
    >
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-2 overflow-hidden"
            ref={containerRef}
          >
            {isCountLoading ? (
              <div className="flex items-center justify-center py-4 text-gray-500">
                불러오는 중...
              </div>
            ) : !bookmarks || bookmarks.length === 0 ? (
              <div className="flex items-center justify-center py-4 text-gray-500">
                {activeFilterTab === '전체'
                  ? '북마크한 장소 정보가 없습니다.'
                  : `북마크한 ${activeFilterTab} 정보가 없습니다.`}
              </div>
            ) : (
              <div ref={listRef} className="overflow-y-auto">
                <AnimatePresence initial={false}>
                  {bookmarks.map((place) => (
                    <motion.div
                      key={place.placeId}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <PlaceCardSidemenu
                        title={place.title}
                        category={place.category as CategoryType}
                        imageUrl={place.image}
                        isBookmarked={isBookmarked(place.placeId)}
                        toggleBookmark={() => toggleBookmark(place.placeId)}
                        onAddPlace={() => handleAddPlace(place)}
                        placeId={place.placeId}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
                {!isExpanded && (
                  <Button
                    className="flex h-[36px] w-full flex-shrink-0 items-center justify-center gap-1 rounded-xl border border-secondary-300 bg-gray-50 text-sm font-normal text-secondary-300 transition-colors hover:bg-gray-100"
                    onClick={toggleExpand}
                  >
                    더보기
                  </Button>
                )}
                {isExpanded && (
                  <DynamicPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    maxVisiblePages={maxVisiblePages}
                  />
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <DaySelectRequiredModal
        isOpen={isDaySelectModalOpen}
        onClose={() => setIsDaySelectModalOpen(false)}
      />
    </PlaceSidemenuLayout>
  );
};

export default BookmarkSidemenu;
