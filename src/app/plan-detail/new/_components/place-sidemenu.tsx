'use client';

import { useState } from 'react';
import BookmarkSidemenu from './bookmark-sidemenu';
import SearchSidemenu from './search-sidemenu';

const FILTER_TABS = ['전체', '명소', '숙박', '맛집', '기타'];

const PlaceSidemenu = () => {
  const [activeBookmarkTab, setActiveBookmarkTab] = useState(FILTER_TABS[0]);
  const [activeSearchTab, setActiveSearchTab] = useState(FILTER_TABS[0]);

  return (
    <div className="w-[320px] space-y-6">
      {/* 북마크 섹션 */}
      <div className="rounded-[12px] border border-gray-200 p-5">
        <BookmarkSidemenu
          filterTabs={FILTER_TABS}
          activeFilterTab={activeBookmarkTab}
          onFilterTabChange={setActiveBookmarkTab}
        />
      </div>

      {/* 검색 섹션 */}
      <div className="rounded-[12px] border border-gray-200 p-5">
        <SearchSidemenu
          filterTabs={FILTER_TABS}
          activeFilterTab={activeSearchTab}
          onFilterTabChange={setActiveSearchTab}
        />
      </div>
    </div>
  );
};

export default PlaceSidemenu;
