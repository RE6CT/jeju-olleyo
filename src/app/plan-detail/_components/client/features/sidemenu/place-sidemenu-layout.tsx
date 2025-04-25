'use client';

import { ReactNode } from 'react';
import { ChevronUp } from 'lucide-react';

import CategoryFilterTabs from '@/components/commons/category-filter-tabs';
import { CategoryType } from '@/types/category.type';

const PlaceSidemenuLayout = ({
  isBookmarkSection,
  filterTabs,
  activeFilterTab,
  onFilterTabChange,
  children,
  topContent,
  isExpanded,
  onToggleExpand,
}: {
  isBookmarkSection: boolean;
  filterTabs: CategoryType[];
  activeFilterTab: CategoryType;
  onFilterTabChange: (tab: CategoryType) => void;
  children: ReactNode;
  topContent?: ReactNode;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
}) => {
  return (
    <div className="w-[240px] space-y-4">
      {/* 섹션 제목 */}
      {isBookmarkSection && (
        <div className="flex items-center justify-center gap-2 self-stretch px-4 py-3">
          <span className="text-16 font-semibold">내가 북마크한 장소</span>
          {onToggleExpand && (
            <button
              onClick={onToggleExpand}
              className="rounded-full p-1 transition-all hover:bg-gray-100"
            >
              <ChevronUp
                className={`h-4 w-4 transform transition-transform ${
                  isExpanded ? '' : 'rotate-180'
                }`}
              />
            </button>
          )}
        </div>
      )}

      {!isExpanded && (
        <>
          {/* 상단 컨텐츠 영역 (검색바 등) */}
          {topContent}
        </>
      )}

      {(isExpanded === undefined || isExpanded === true) && (
        <>
          {/* 필터 */}
          <CategoryFilterTabs
            tabs={filterTabs}
            defaultTab={activeFilterTab}
            onTabChange={onFilterTabChange}
            tabsGapClass="gap-[10px]"
            tabPaddingClass="px-2"
          />
        </>
      )}

      {/* 컨텐츠 영역 */}
      {children}
    </div>
  );
};

export default PlaceSidemenuLayout;
