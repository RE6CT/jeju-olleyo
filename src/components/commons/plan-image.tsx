'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { getPlanImageWithFallback } from '@/lib/utils/get-image-with-fallback';
import { PlaceImageProps } from '@/types/common.type';

/**
 * 일정 이미지 컴포넌트 - 최적화 버전
 * @param image - 일정 이미지
 * @param title - 일정의 타이틀 (alt 속성용)
 * @param className - 커스텀 클래스 속성 넣고 싶은 경우 추가 (필수 X)
 * @param isPriority - 우선순위 이미지 여부 (true일 경우 priority 속성 적용)
 * - 반응형 고려하여 부모 컨테이너가 aspect-square를 갖도록 설계
 *
 * @example
 * <PlanImage image={plan.planImg} title={plan.title} isPriority={true} />
 */
const PlanImage = ({
  image,
  title,
  className = '',
  isPriority = false,
  ...props
}: PlaceImageProps & { isPriority?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // null 여부 판단해서 디폴트 이미지 추가
  const planImage = getPlanImageWithFallback(image);

  // 이미지 로드 완료 핸들러
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // 이미지 로드 실패 핸들러
  const handleImageError = () => {
    setIsLoading(false);
    setError(true);
    // 기본 이미지로 대체
    if (containerRef.current) {
      const img = containerRef.current.querySelector('img');
      if (img) {
        img.src = '/images/default_plan_image.svg';
        img.onerror = null; // 무한 루프 방지
      }
    }
  };

  return (
    <div ref={containerRef}>
      <Image
        src={planImage}
        alt={title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-cover transition-opacity duration-300 ${className} ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        priority={isPriority}
        loading={isPriority ? undefined : 'lazy'}
        placeholder="blur"
        blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI0YzRjRGNiIvPjwvc3ZnPg=="
        onLoad={handleImageLoad}
        onError={handleImageError}
        quality={process.env.NODE_ENV === 'development' ? 60 : 75}
        fetchPriority={isPriority ? 'high' : 'auto'}
        unoptimized
        {...props}
      />
    </div>
  );
};

export default PlanImage;
