import { ReactNode } from 'react';

import CategoryTabs from '@/app/_components/client/home-category-tap';

const CategoryLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full max-w-[1024px]">
      <CategoryTabs />
      <main>{children}</main>
    </div>
  );
};

export default CategoryLayout;
