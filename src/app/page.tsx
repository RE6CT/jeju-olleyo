import { Suspense } from 'react';

import Loading from '@/app/loading';
import JejuBanner from '@/components/features/banner/jeju-banner';
import CategoryTabs from '@/components/features/home/home-category-tap';
import MainCarouselContainer from '@/components/features/home/home-main-carousel-container';
import PopularPlaces from '@/components/features/home/home-popular-places';
import PopularSchedules from '@/components/features/home/home-popular-schedules';
import WeatherSection from '@/components/features/home/home-weather-section';
import { PATH } from '@/constants/path.constants';

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
      <section className="mt-[58px]">
        <Suspense fallback={<Loading />}>
          <WeatherSection />
        </Suspense>
      </section>

      {/* 인기 일정 섹션 */}
      <section>
        <Suspense fallback={<Loading />}>
          <PopularSchedules />
        </Suspense>
      </section>

      {/* 인기 장소 섹션 */}
      <section>
        <Suspense fallback={<Loading />}>
          <PopularPlaces />
        </Suspense>
      </section>

      {/* 내 일정 만들러 가기 배너 섹션*/}
      <section>
        <JejuBanner
          imageUrl="/banner-images/plan-banner.jpg"
          title="나만의 제주 여행 계획하기"
          buttonText="내 일정 만들러 가기"
          buttonUrl={PATH.PLAN_NEW}
        />
      </section>
    </div>
  );
};

export default Home;
