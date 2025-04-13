'use client';

import { Button } from '@/components/ui/button';
import PlaceSidemenuLayout from '../../_components/place-sidemenu-layout';
import { Input } from '@/components/ui/input';

const SearchSidemenu = ({
  filterTabs,
  activeFilterTab,
  onFilterTabChange,
}: {
  filterTabs: string[];
  activeFilterTab: string;
  onFilterTabChange: (tab: string) => void;
}) => {
  const searchBar = (
    <div className="rounded-[12px] bg-gray-100 px-3 py-2">
      <div className="flex items-center gap-[12px]">
        <img src="/icons/search.svg" alt="검색" className="h-5 w-5" />
        <Input
          type="text"
          placeholder="장소를 검색해 추가하세요"
          className="w-full border-none bg-transparent text-14 font-medium leading-[150%] text-[#698EA1] placeholder:text-gray-400 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );

  return (
    <PlaceSidemenuLayout
      isBookmarkSection={false}
      filterTabs={filterTabs}
      activeFilterTab={activeFilterTab}
      onFilterTabChange={onFilterTabChange}
      topContent={searchBar}
    >
      {/* 검색 결과 */}
      <div className="mt-4 flex items-center justify-center rounded-[8px] border border-dashed border-gray-200 py-4 text-14 text-gray-300">
        장소가 존재하지 않습니다
      </div>
    </PlaceSidemenuLayout>
  );
};

export default SearchSidemenu;
