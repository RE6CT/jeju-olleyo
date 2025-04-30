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
  selectedButton,
}: {
  selectedDay: number | null;
  onAddPlace: (place: Place) => void;
  selectedButton?: 'search' | 'bookmark';
}) => {
  const [activeBookmarkTab, setActiveBookmarkTab] =
    useState<CategoryType>('전체');
  const [activeSearchTab, setActiveSearchTab] = useState<CategoryType>('전체');

  return (
    <div className="h-fit space-y-4 md:w-[212px] lg:w-[280px]">
      {(!selectedButton || selectedButton === 'bookmark') && (
        <div className="px-5 md:rounded-[12px] md:border md:border-gray-200 md:bg-gray-50 md:px-[15px] md:pb-[15px] lg:px-5 lg:pb-5">
          <BookmarkSidemenu
            filterTabs={CATEGORIES}
            activeFilterTab={activeBookmarkTab}
            onFilterTabChange={setActiveBookmarkTab}
            onAddPlace={onAddPlace}
            selectedDay={selectedDay}
          />
        </div>
      )}
      {(!selectedButton || selectedButton === 'search') && (
        <div className="px-5 md:rounded-[12px] md:border md:border-gray-200 md:bg-gray-50 md:py-5">
          <SearchSidemenu
            filterTabs={CATEGORIES}
            activeFilterTab={activeSearchTab}
            onFilterTabChange={setActiveSearchTab}
            onAddPlace={onAddPlace}
            selectedDay={selectedDay}
          />
        </div>
      )}
    </div>
  );
};

export default PlaceSidemenu;
