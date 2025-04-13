'use client';

import PlaceSidemenuLayout from '../../_components/place-sidemenu-layout';

interface BookmarkSidemenuProps {
  filterTabs: string[];
  activeFilterTab: string;
  onFilterTabChange: (tab: string) => void;
}

const BookmarkSidemenu = ({
  filterTabs,
  activeFilterTab,
  onFilterTabChange,
}: BookmarkSidemenuProps) => {
  return (
    <PlaceSidemenuLayout
      isBookmarkSection
      filterTabs={filterTabs}
      activeFilterTab={activeFilterTab}
      onFilterTabChange={onFilterTabChange}
    >
      {/* 북마크 리스트 */}
      <div className="mt-4 flex items-center justify-center rounded-[8px] border border-dashed border-gray-200 py-4 text-14 text-gray-300">
        장소가 존재하지 않습니다
      </div>
    </PlaceSidemenuLayout>
  );
};

export default BookmarkSidemenu;
