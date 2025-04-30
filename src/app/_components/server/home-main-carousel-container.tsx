import dynamic from 'next/dynamic';
import carouselData from '@/data/carousel-data.json';

// 스켈레톤 UI 컴포넌트 가져오기 (클라이언트 컴포넌트지만 바로 임포트 가능)
import CarouselSkeleton from '@/app/_components/client/carousel-skeleton';

/**
 * 클라이언트 컴포넌트를 SSR 없이 동적으로 불러옴
 * - loading 속성에 스켈레톤 UI 적용
 * - ssr: false로 서버에서 렌더링하지 않음
 */
const MainCarousel = dynamic(
  () => import('@/app/_components/client/home-main-carousel'),
  {
    ssr: false,
    loading: () => <CarouselSkeleton />,
  },
);

/**
 * MainCarousel을 위한 서버 컴포넌트 래퍼
 * SSR을 비활성화하여 하이드레이션 깜빡임 문제 해결 및 스켈레톤 UI 적용
 */
const MainCarouselWrapper = () => {
  return <MainCarousel imageList={carouselData} initialIsMobile={false} />;
};

export default MainCarouselWrapper;
