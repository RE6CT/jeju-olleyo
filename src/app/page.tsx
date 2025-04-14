import { Suspense } from 'react';
import MainCarouselContainer from '@/components/features/home/home-main-carousel-container';
import CategoryTabs from '@/components/features/home/home-category-tap';
import WeatherSection from '@/components/features/home/home-weather-section';
import Loading from '@/app/loading';

/**
 * 홈 페이지 컴포넌트
 *
 */
export const revalidate = 86400; // 24시간마다 재검증

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

      {/* 날씨 섹션 - 서버 컴포넌트로 변경하여 초기 로딩 성능 최적화 */}
      <section className="mt-4 sm:mt-6 md:mt-8">
        <Suspense fallback={<Loading />}>
          <WeatherSection />
        </Suspense>
      </section>
    </div>
  );
};

export default Home;
