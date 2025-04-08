import CategoryTabs from '@/components/features/home/category-tap';
import { Suspense } from 'react';
import Loading from '@/app/loading';

/**
 * 메인 홈 페이지 컴포넌트
 */
const Home = () => {
  return (
    <main className="container mx-auto p-4">
      <Suspense fallback={<Loading />}>
        <CategoryTabs className="mb-12" />
      </Suspense>
    </main>
  );
};

export default Home;
