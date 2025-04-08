import CategoryTabs from '@/components/features/home/category-tap';
import { Suspense } from 'react';

/**
 * 메인 홈 페이지 컴포넌트
 */
const Home = () => {
  return (
    <main className="container mx-auto p-4">
      <Suspense
        fallback={
          <div className="h-12 animate-pulse rounded-lg bg-gray-100"></div>
        }
      >
        <CategoryTabs className="mb-12" />
      </Suspense>
    </main>
  );
};

export default Home;
