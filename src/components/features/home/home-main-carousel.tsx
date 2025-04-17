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

/**
 * 메인 캐러셀 컴포넌트
 * @param imageList - 캐러셀에 표시할 이미지 목록
 */
const MainCarousel = ({ imageList }: MainCarouselProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({
      delay: MAIN_CAROUSEL_OPTIONS.AUTO_ROLLING_TIME,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    }),
  ]);

  const { currentIndex, totalCount, progressWidth } = useCarouselProgress(
    emblaApi ?? null,
    MAIN_CAROUSEL_OPTIONS.AUTO_ROLLING_TIME,
    isHovered,
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
        <div className="flex">
          {(!imageList || imageList.length === 0) && (
            <div className="relative h-[340px] max-h-[340px] min-w-full lg:h-[340px]">
              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                <p className="text-gray-500">이미지가 없습니다.</p>
              </div>
            </div>
          )}
          {imageList?.map((image, index) => (
            <div
              className="relative h-0 min-w-full"
              key={image.id}
              style={{
                paddingTop: 'calc(340 / 1024 * 100%)', // 1024px 너비에서 340px 높이 비율 유지
                maxHeight: '340px',
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
                  priority={index === 0} // 첫번째 이미지는 우선 로딩
                  sizes="100vw"
                  className="object-cover"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <NavigationButton
        direction="left"
        onClick={() => emblaApi?.scrollPrev()}
      />
      <NavigationButton
        direction="right"
        onClick={() => emblaApi?.scrollNext()}
      />

      <ProgressIndicator
        current={currentIndex + 1}
        total={totalCount}
        progress={progressWidth}
      />
    </div>
  );
};

export default MainCarousel;
