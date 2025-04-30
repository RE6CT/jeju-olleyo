'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import NavigationButton from '@/app/_components/server/home-navigation-button';
import { ProgressIndicator } from '@/app/_components/server/home-progress';
import { MAIN_CAROUSEL_OPTIONS } from '@/constants/home.constants';
import { useCarouselProgress } from '@/lib/hooks/use-carousel-progress';
import { MainCarouselProps } from '@/types/home.carousel.type';

/**
 * 메인 캐러셀 컴포넌트
 * @param imageList - 캐러셀에 표시할 이미지 목록
 */
const MainCarousel = ({ imageList }: MainCarouselProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 768px 미만인지 확인하는 함수
  const checkIfMobile = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    // 초기 로드 시 확인
    checkIfMobile();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener('resize', checkIfMobile);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // 자동 재생 옵션 설정
  const autoplayOptions = {
    delay: MAIN_CAROUSEL_OPTIONS.AUTO_ROLLING_TIME,
    stopOnMouseEnter: true,
    stopOnInteraction: false,
    rootNode: (emblaRoot: HTMLElement) => emblaRoot.parentElement,
  };

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay(autoplayOptions)],
  );

  const { currentIndex, totalCount, progressWidth } = useCarouselProgress(
    emblaApi ?? null,
    MAIN_CAROUSEL_OPTIONS.AUTO_ROLLING_TIME,
    isHovered,
  );

  return (
    <div
      className="relative mx-4 overflow-hidden md:mx-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') emblaApi?.scrollPrev();
        if (e.key === 'ArrowRight') emblaApi?.scrollNext();
      }}
      tabIndex={0}
      role="region"
      aria-label="이미지 캐러셀"
    >
      <div
        className="mx-auto overflow-hidden rounded-lg border-[0.6px] border-solid border-white md:mx-0 md:rounded-none md:border-0"
        ref={emblaRef}
        style={{
          maxWidth: isMobile ? '343px' : '100%',
        }}
      >
        <div className="flex">
          {(!imageList || imageList.length === 0) && (
            <div className="relative h-[170px] w-full md:h-0 md:pb-[33.2%]">
              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                <p className="text-gray-500">이미지가 없습니다.</p>
              </div>
            </div>
          )}
          {imageList?.map((image, index) => (
            <div
              className="relative min-w-full"
              key={image.id}
              style={
                isMobile
                  ? { height: '170px' }
                  : { height: 0, paddingBottom: 'calc(340 / 1024 * 100%)' }
              }
            >
              <Link
                href={image.link_url || '#'}
                className="block h-full w-full"
                aria-label={`${image.title || '슬라이드'} 상세 보기`}
              >
                <Image
                  src={
                    isMobile && image.mobile_image_url
                      ? image.mobile_image_url
                      : image.image_url
                  }
                  alt={image.title || '슬라이드 이미지'}
                  fill
                  priority={index === 0} // 첫번째 이미지는 우선 로딩
                  sizes={isMobile ? '343px' : '100vw'}
                  className="object-cover"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 네비게이션 버튼 (768px 미만에서는 NavigationButton 내부에서 hidden 처리) */}
      <NavigationButton
        direction="left"
        onClick={() => emblaApi?.scrollPrev()}
      />
      <NavigationButton
        direction="right"
        onClick={() => emblaApi?.scrollNext()}
      />

      {/* 프로그레스 인디케이터 (768px 미만에서는 ProgressIndicator 내부에서 다르게 스타일링) */}
      <ProgressIndicator
        current={currentIndex + 1}
        total={totalCount}
        progress={progressWidth}
      />
    </div>
  );
};

export default MainCarousel;
