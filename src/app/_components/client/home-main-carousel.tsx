'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';

import NavigationButton from '@/app/_components/server/home-navigation-button';
import { ProgressIndicator } from '@/app/_components/server/home-progress';
import { MAIN_CAROUSEL_OPTIONS } from '@/constants/home.constants';
import { useCarouselProgress } from '@/lib/hooks/use-carousel-progress';
import { EnhancedMainCarouselProps } from '@/types/home.carousel.type';

/**
 * 메인 캐러셀 컴포넌트 - 하이드레이션 깜빡임 해결 및 CSS 기반 이미지 전환
 * @param imageList - 캐러셀에 표시할 이미지 목록
 */
const MainCarousel = ({ imageList }: EnhancedMainCarouselProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 화면 크기 감지 함수
  const checkDeviceSize = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // 마운트 시점에 한 번만 실행
  useEffect(() => {
    // 마운트 표시
    setIsMounted(true);

    // 초기 크기 체크
    checkDeviceSize();

    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', checkDeviceSize);

    return () => {
      window.removeEventListener('resize', checkDeviceSize);
    };
  }, [checkDeviceSize]);

  // 자동 재생 옵션
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

  // 클라이언트 사이드 렌더링 완료 전에는 아무것도 표시하지 않음
  // (이 부분은 이제 스켈레톤 UI로 대체되므로 빈 div를 반환하지 않음)
  if (!isMounted) {
    return null;
  }

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
                {/* 모바일 이미지와 데스크탑 이미지 모두 로드하되,
                    모바일 이미지는 CSS로 조건부 표시/숨김 처리 */}
                {image.mobile_image_url && (
                  <Image
                    src={image.mobile_image_url}
                    alt={image.title || '슬라이드 이미지 (모바일)'}
                    fill
                    priority={index < 2}
                    sizes="343px"
                    className={`object-cover ${isMobile ? 'block' : 'hidden'}`}
                    unoptimized={true}
                    loading={index < 2 ? 'eager' : 'lazy'}
                  />
                )}
                <Image
                  src={image.image_url}
                  alt={image.title || '슬라이드 이미지'}
                  fill
                  priority={index < 2}
                  sizes={isMobile ? '343px' : '100vw'}
                  className={`object-cover ${isMobile && image.mobile_image_url ? 'hidden' : 'block'}`}
                  unoptimized={true}
                  loading={index < 2 ? 'eager' : 'lazy'}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 네비게이션 버튼 */}
      <NavigationButton
        direction="left"
        onClick={() => emblaApi?.scrollPrev()}
      />
      <NavigationButton
        direction="right"
        onClick={() => emblaApi?.scrollNext()}
      />

      {/* 프로그레스 인디케이터 */}
      <ProgressIndicator
        current={currentIndex + 1}
        total={totalCount}
        progress={progressWidth}
      />
    </div>
  );
};

export default MainCarousel;
