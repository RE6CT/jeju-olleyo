import { ReactNode } from 'react';

import CategoryTabs from '@/components/features/home/home-category-tap';

const CategoryLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full max-w-[1024px]">
      <CategoryTabs />
      <main>{children}</main>
    </div>
  );
};

export default CategoryLayout;
