'use client';

import { useRouter } from 'next/navigation';
import { memo } from 'react';

import PlaceImage from '@/components/commons/place-image';
import { PlaceCardProps } from '@/types/card.type';
import BookmarkButton from '../like/bookmark-button';

/**
 * 장소 카드 컴포넌트
 * @param placeId - 장소의 id
 * @param image - 이미지 값
 * @param title - 장소 이름
 * @param isBookmarked - 좋아요 여부
 * @param isDragging - 드래그 중인지 여부
 * @param className - 추가 스타일 클래스
 */
const PlaceCard = ({
  placeId,
  image,
  title,
  isBookmarked,
  className,
  isDragging = false,
}: PlaceCardProps) => {
  const router = useRouter();

  /** 링크 이동 핸들러 */
  const handleCardClick = () => {
    // 드래그 중이 아닐 때만 페이지 이동
    if (!isDragging) {
      router.push(`/places/${placeId}`);
    }
  };

  return (
    <article
      onClick={handleCardClick}
      draggable="false"
      className={`${className} cursor-pointer transition-all`}
    >
      <div className="relative flex flex-col gap-2">
        <figure className="relative aspect-square">
          <PlaceImage
            image={image}
            title={title}
            className="pointer-events-none rounded-12"
          />
        </figure>
        <h4 className="medium-16 truncate px-2">{title}</h4>
        {/* 북마크 버튼 */}
        <BookmarkButton
          isBookmarked={isBookmarked}
          placeId={placeId}
          className="absolute right-2 top-2"
        />
      </div>
    </article>
  );
};

// 성능 최적화를 위한 메모이제이션 - 불필요한 리렌더링 방지
export default memo(PlaceCard);
