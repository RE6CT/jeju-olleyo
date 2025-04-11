import { Suspense } from 'react';
import Loading from '@/app/loading';
import MainCarouselContainer from '@/components/features/home/home-main-carousel-container';
import CategoryTabs from '@/components/features/home/home-category-tap';
import WeatherSection from '@/components/features/home/home-weather-container';

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* 카테고리 탭 영역 */}
      <section className="sticky top-0 z-40 w-full">
        <Suspense fallback={<Loading />}>
          <CategoryTabs />
        </Suspense>
      </section>

      {/* 캐러셀 영역 */}
      <section>
        <MainCarouselContainer />
      </section>

      {/* 날씨 섹션 */}
      <section className="mt-12">
        <WeatherSection />
      </section>
    </div>
  );
};

export default Home;
