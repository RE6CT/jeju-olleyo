'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import PlaceSidemenuLayout from './place-sidemenu-layout';
import PlaceCardCategory from './place-card-category';
import { CategoryType } from '@/types/category-badge.type';
import ErrorMessage from '@/components/ui/error-message';
import { useBookmarkQuery } from '@/lib/hooks/use-bookmark-query';
import DynamicPagination from '@/components/ui/dynamic-pagination';

const ITEMS_PER_PAGE = 7;
const INITIAL_ITEMS = 3;
const NAVIGATION_BUTTON_WIDTH = 42.4;
const NAVIGATION_BUTTON_GAP = 4;
const DEBOUNCE_TIME = 200;

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
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxVisiblePages, setMaxVisiblePages] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);
  const resizeTimeoutRef = useRef<NodeJS.Timeout>();

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
    }, DEBOUNCE_TIME);
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
      <div className="space-y-2" ref={containerRef}>
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
          <>
            {displayedPlaces.map((place) => (
              <PlaceCardCategory
                key={place.placeId}
                title={place.title}
                category={place.category as CategoryType}
                imageUrl={place.image}
                isBookmarked={isBookmarked(place.placeId)}
                onBookmarkToggle={() => handleBookmarkToggle(place.placeId)}
              />
            ))}
            {currentPageItems.length > INITIAL_ITEMS && (
              <button
                className="w-full text-gray-500 hover:text-gray-700"
                onClick={toggleExpand}
              >
                {isExpanded ? '접기' : '더보기'}
              </button>
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
        )}
      </div>
    </PlaceSidemenuLayout>
  );
};

export default BookmarkSidemenu;
