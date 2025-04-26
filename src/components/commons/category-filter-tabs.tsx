'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';
import { CategoryType } from '@/types/category.type';

const CategoryFilterTabs = ({
  tabs,
  defaultTab = '전체',
  onTabChange,
  tabsGapClass = 'gap-[10px]',
  tabPaddingClass = 'px-2',
  tabFontClass = 'medium-12',
}: {
  tabs: CategoryType[];
  onTabChange: (tab: CategoryType) => void;
  defaultTab?: CategoryType;
  tabsGapClass?: string;
  tabPaddingClass?: string;
  tabFontClass?: string;
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
            'flex flex-1 items-center justify-center whitespace-nowrap rounded-[28px] py-1 transition-all',
            tabFontClass,
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
