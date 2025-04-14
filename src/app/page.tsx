import { Suspense } from 'react';
import MainCarouselContainer from '@/components/features/home/home-main-carousel-container';
import CategoryTabs from '@/components/features/home/home-category-tap';
import WeatherSection from '@/components/features/home/home-weather-section';
import Loading from '@/app/loading';
import JejuBanner from '@/components/features/banner/jeju-banner';
import { PATH } from '@/constants/path.constants';
import PopularSchedules from '@/components/features/home/home-popular-schedules';

/**
 * 홈 페이지 컴포넌트
 * SSG로 정적 렌더링을 통해 초기 로드 성능 최적화
 */
export const dynamic = 'force-static';
export const revalidate = 86400; // 24시간마다 재검증

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 카테고리 탭 영역 */}
      <section>
        <CategoryTabs />
      </section>

      {/* 캐러셀 영역 */}
      <section>
        <MainCarouselContainer />
      </section>

      {/* 날씨 섹션 */}
      <section className="mt-8">
        <Suspense fallback={<Loading />}>
          <WeatherSection />
        </Suspense>
      </section>

      {/* 인기 일정 섹션 */}
      <section>
        <PopularSchedules />
      </section>

      {/* 내 일정 만들러 가기 배너 섹션*/}
      <section className="mt-8">
        <JejuBanner
          imageUrl="/banner-images/plan-banner.svg"
          title="나만의 제주 여행 계획하기"
          buttonText="내 일정 만들러 가기"
          buttonUrl={PATH.PLAN_NEW}
        />
      </section>
    </div>
  );
};

export default Home;
