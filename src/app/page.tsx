import { Suspense } from 'react';
import Loading from '@/app/loading';
import MainCarouselContainer from '@/components/features/home/home-main-carousel-container';
import CategoryTabs from '@/components/features/home/home-category-tap';
import WeatherSection from '@/components/features/home/home-weather-section';

export const revalidate = 86400;

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 카테고리 탭 영역 */}
      <section>
        <Suspense fallback={<Loading />}>
          <CategoryTabs />
        </Suspense>
      </section>

      {/* 캐러셀 영역 */}
      <section>
        <MainCarouselContainer />
      </section>

      {/* 날씨 섹션 */}
      <section className="mt-4 sm:mt-6 md:mt-8">
        <WeatherSection />
      </section>
    </div>
  );
};

export default Home;
