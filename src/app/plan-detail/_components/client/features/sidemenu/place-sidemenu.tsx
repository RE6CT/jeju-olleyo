'use client';

import { useState } from 'react';

import { CategoryType } from '@/types/category.type';
import { Place } from '@/types/search.type';

import BookmarkSidemenu from './bookmark-sidemenu';
import SearchSidemenu from './search-sidemenu';

const CATEGORIES: CategoryType[] = ['전체', '명소', '맛집', '카페', '숙박'];

const PlaceSidemenu = ({
  selectedDay,
  onAddPlace,
}: {
  selectedDay: number | null;
  onAddPlace: (place: Place) => void;
}) => {
  const [activeBookmarkTab, setActiveBookmarkTab] =
    useState<CategoryType>('전체');
  const [activeSearchTab, setActiveSearchTab] = useState<CategoryType>('전체');

  return (
    <div className="sticky top-8 h-fit w-[280px] space-y-4">
      {/* 북마크 섹션 */}
      <div className="rounded-[12px] border border-gray-200 px-5">
        <BookmarkSidemenu
          filterTabs={CATEGORIES}
          activeFilterTab={activeBookmarkTab}
          onFilterTabChange={setActiveBookmarkTab}
          onAddPlace={onAddPlace}
          selectedDay={selectedDay}
        />
      </div>

      {/* 검색 섹션 */}
      <div className="rounded-[12px] border border-gray-200 p-5">
        <SearchSidemenu
          filterTabs={CATEGORIES}
          activeFilterTab={activeSearchTab}
          onFilterTabChange={setActiveSearchTab}
          onAddPlace={onAddPlace}
          selectedDay={selectedDay}
        />
      </div>
    </div>
  );
};

export default PlaceSidemenu;
