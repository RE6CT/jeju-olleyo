'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { CategoryType } from '@/types/category-badge.type';

const CategoryFilterTabs = ({
  tabs,
  defaultTab,
  onTabChange,
  tabsGapClass = 'gap-[10px]',
  tabPaddingClass = 'px-2',
}: {
  tabs: CategoryType[];
  defaultTab: CategoryType;
  onTabChange: (tab: CategoryType) => void;
  tabsGapClass?: string;
  tabPaddingClass?: string;
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (tab: CategoryType) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className={cn('flex items-center', tabsGapClass)}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => handleTabClick(tab)}
          className={cn(
            'medium-12 flex flex-1 items-center justify-center gap-[10px] rounded-[28px] py-1 transition-all',
            tabPaddingClass,
            activeTab === tab
              ? 'border border-primary-500 bg-primary-100 text-primary-800'
              : 'border-[0.6px] border-gray-600 text-gray-600 hover:text-gray-900',
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilterTabs;
