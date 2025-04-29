'use client';

import { useRouter } from 'next/navigation';
import { memo } from 'react';

import PlaceImage from '@/components/commons/place-image';
import { PlaceCardProps } from '@/types/card.type';
import BookmarkButton from '../like/bookmark-button';

/**
 * 장소 카드 컴포넌트
 */
const PlaceCard = ({
  placeId,
  image,
  title,
  isBookmarked,
  className = '',
}: PlaceCardProps) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/places/${placeId}`);
  };

  return (
    <article
      onClick={handleCardClick}
      className={`group flex cursor-pointer flex-col ${className}`}
    >
      {/* 이미지 박스 */}
      <div className="relative aspect-square w-full overflow-hidden rounded-12">
        <PlaceImage
          image={image}
          title={title}
          className="h-full w-full object-cover"
        />
        {/* 북마크 버튼 */}
        <div className="absolute right-2 top-2">
          <BookmarkButton isBookmarked={isBookmarked} placeId={placeId} />
        </div>
      </div>

      {/* 제목 (반응형 폰트) */}
      <h4 className="medium-12 md:medium-16 mt-2 truncate px-1 font-medium text-gray-900">
        {title}
      </h4>
    </article>
  );
};

export default memo(PlaceCard);
