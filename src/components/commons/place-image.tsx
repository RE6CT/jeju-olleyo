'use client';

import { PlaceImageProps } from '@/types/common.type';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const PlaceImage = ({
  image,
  title,
  className = '',
  isPriority = false,
}: PlaceImageProps & { isPriority?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const defaultImage = '/images/default_place_image.svg';
  const imageSource = image || defaultImage;

  // 이미지 로드 완료 핸들러
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // 이미지 로드 실패 핸들러
  const handleImageError = () => {
    setIsLoading(false);
    setError(true);
  };

  return (
    <div
      ref={containerRef}
      className={`relative aspect-square overflow-hidden ${className}`}
    >
      <>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="h-6 w-6 animate-pulse rounded-full bg-gray-200"></div>
          </div>
        )}

        {error ? (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <Image
              src={defaultImage}
              alt={`${title} 이미지 로드 실패`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ) : (
          <Image
            src={imageSource}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-opacity duration-300 ${
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
          />
        )}
      </>
    </div>
  );
};

export default PlaceImage;
