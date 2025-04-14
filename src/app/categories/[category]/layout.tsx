import CategoryTabs from '@/components/features/home/home-category-tap';
import { ReactNode } from 'react';

const CategoryLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <CategoryTabs />
      <main>{children}</main>
    </div>
  );
};

export default CategoryLayout;
