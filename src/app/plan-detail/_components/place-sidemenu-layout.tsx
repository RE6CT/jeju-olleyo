'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import CategoryFilterTabs from '@/components/commons/category-filter-tabs';
import { CategoryType } from '@/types/category-badge.type';

const PlaceSidemenuLayout = ({
  isBookmarkSection,
  filterTabs,
  activeFilterTab,
  onFilterTabChange,
  children,
  topContent,
  isExpanded = true,
}: {
  isBookmarkSection: boolean;
  filterTabs: CategoryType[];
  activeFilterTab: CategoryType;
  onFilterTabChange: (tab: CategoryType) => void;
  children: ReactNode;
  topContent?: ReactNode;
  isExpanded?: boolean;
}) => {
  return (
    <div className="w-full space-y-4">
      {/* 섹션 제목 */}
      {isBookmarkSection && (
        <div className="flex items-center justify-between">
          <span className="text-14 font-bold text-gray-900">
            내가 북마크한 장소
          </span>
        </div>
      )}

      {/* 상단 컨텐츠 영역 (검색바 등) */}
      {topContent}

      {/* 필터 */}
      <CategoryFilterTabs
        tabs={filterTabs}
        defaultTab={activeFilterTab}
        onTabChange={onFilterTabChange}
        tabsGapClass="gap-[8px]"
        tabPaddingClass="px-3"
      />

      {/* 컨텐츠 영역 */}
      {children}
    </div>
  );
};

export default PlaceSidemenuLayout;
