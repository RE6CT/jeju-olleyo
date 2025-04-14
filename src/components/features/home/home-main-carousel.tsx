'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

import NavigationButton from '@/components/features/home/home-navigation-button';
import { ProgressIndicator } from '@/components/features/home/home-progress';
import { useCarouselProgress } from '@/lib/hooks/use-carousel-progress';
import { MAIN_CAROUSEL_OPTIONS } from '@/constants/home.constants';
import { MainCarouselProps } from '@/types/home.carousel.type';

const MainCarousel = ({ imageList }: MainCarouselProps) => {
  // 호버 상태 관리
  const [isHovered, setIsHovered] = useState(false);
  // 로드 상태 관리
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  // embla-carousel 설정 (자동 재생이 호버 시 멈추도록 Autoplay 옵션 사용)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: MAIN_CAROUSEL_OPTIONS.AUTO_ROLLING_TIME,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    }),
  ]);

  // 호버 상태(isHovered)를 useCarouselProgress에 전달
  const { currentIndex, totalCount, progressWidth } = useCarouselProgress(
    emblaApi ?? null,
    MAIN_CAROUSEL_OPTIONS.AUTO_ROLLING_TIME,
    isHovered, // 프로그래스 바 업데이트 일시정지 여부
  );

  return (
    <div
      className="relative overflow-hidden"
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
      <div className="overflow-hidden" ref={emblaRef}>
        {/* 이미지가 없거나 못불러왔을시 대체 화면 */}
        <div className="flex">
          {(!imageList || imageList.length === 0) && (
            <div
              className="relative min-w-full"
              style={{
                paddingTop: `${(MAIN_CAROUSEL_OPTIONS.HEIGHT / MAIN_CAROUSEL_OPTIONS.WIDTH) * 100}%`,
              }}
            >
              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                <p className="text-gray-500">이미지가 없습니다.</p>
              </div>
            </div>
          )}
          {/* 캐러셀 이미지 */}
          {imageList?.map((image) => (
            <div
              className="relative min-w-full"
              key={image.id}
              style={{
                paddingTop: `${(MAIN_CAROUSEL_OPTIONS.HEIGHT / MAIN_CAROUSEL_OPTIONS.WIDTH) * 100}%`,
              }}
            >
              <Link
                href={image.link_url || '#'}
                className="block h-full w-full"
                aria-label={`${image.title || '슬라이드'} 상세 보기`}
              >
                <Image
                  src={image.image_url}
                  alt={image.title || '슬라이드 이미지'}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                  onLoad={handleImageLoad}
                />
                {!imagesLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                    <p className="text-gray-500">이미지 로딩 중...</p>
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* 화살표 버튼 */}
      <NavigationButton
        direction="left"
        onClick={() => emblaApi?.scrollPrev()}
      />
      <NavigationButton
        direction="right"
        onClick={() => emblaApi?.scrollNext()}
      />

      {/* 페이지 번호 및 프로그래스 바 */}
      <ProgressIndicator
        current={currentIndex + 1}
        total={totalCount}
        progress={progressWidth}
      />
    </div>
  );
};

export default MainCarousel;
