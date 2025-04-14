'use client';

import { useState } from 'react';
import BookmarkSidemenu from './bookmark-sidemenu';
import SearchSidemenu from './search-sidemenu';
import { CategoryType } from '@/types/category-badge.type';

const PlaceSidemenu = ({ userId }: { userId: string }) => {
  const [activeBookmarkTab, setActiveBookmarkTab] =
    useState<CategoryType>('전체');
  const [activeSearchTab, setActiveSearchTab] = useState<CategoryType>('전체');

  return (
    <div className="w-[320px] space-y-6">
      {/* 북마크 섹션 */}
      <div className="rounded-[12px] border border-gray-200 p-5">
        <BookmarkSidemenu
          userId={userId}
          filterTabs={
            ['전체', '명소', '맛집', '카페', '숙박'] as CategoryType[]
          }
          activeFilterTab={activeBookmarkTab}
          onFilterTabChange={setActiveBookmarkTab}
        />
      </div>

      {/* 검색 섹션 */}
      <div className="rounded-[12px] border border-gray-200 p-5">
        <SearchSidemenu
          filterTabs={
            ['전체', '명소', '맛집', '카페', '숙박'] as CategoryType[]
          }
          activeFilterTab={activeSearchTab}
          onFilterTabChange={setActiveSearchTab}
        />
      </div>
    </div>
  );
};

export default PlaceSidemenu;
