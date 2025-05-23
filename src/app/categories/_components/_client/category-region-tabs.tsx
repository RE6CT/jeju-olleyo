'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { RegionType } from '@/types/category.type';

const tabs: RegionType[] = ['전체', '제주시', '서귀포시'];

/**
 * 지역별 필터링 탭
 * @param defaultTab - 디폴트 탭
 * @param onTabChange - 탭이 바뀔 때 실행할 핸들러
 */
const CategoryRegionTabs = ({
  defaultTab = '전체',
  onTabChange,
}: {
  onTabChange: (tab: RegionType) => void;
  defaultTab?: string;
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  /**
   * 탭 클릭 핸들러
   * @param tab - 선택한 탭
   */
  const handleTabClick = (tab: RegionType) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <ul
      className="flex w-fit list-none items-center gap-2 p-0 md:gap-3"
      role="tablist"
    >
      {tabs.map((tab) => (
        <li key={tab} role="presentation">
          <button
            onClick={() => handleTabClick(tab)}
            className={cn(
              'medium-12 md:semibold-16 flex flex-1 items-center justify-center gap-[10px] whitespace-nowrap rounded-[28px] px-3 py-1 transition-all md:px-5 md:py-2',
              activeTab === tab
                ? 'border border-primary-500 bg-primary-100 text-primary-800'
                : 'border-[0.6px] border-gray-600 text-gray-600 hover:text-gray-900',
            )}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`tabpanel-${tab}`}
            id={`tab-${tab}`}
          >
            {tab}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default CategoryRegionTabs;
