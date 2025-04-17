'use client';

import PlaceImage from '@/components/commons/place-image';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import BookmarkIcon from '@/components/commons/bookmark-icon';

/**
 * 장소 카드 컴포넌트
 * @param placeId - 장소의 id
 * @param image - 이미지 값
 * @param title - 장소 이름
 * @param isLiked - 좋아요 여부
 * @param className - 추가 스타일 클래스
 */
const SearchCard = ({
  placeId,
  image,
  title,
  className,
  isBookmarked,
  onBookmarkToggle,
}: {
  placeId: number;
  image: string | null;
  title: string;
  className?: string;
  isBookmarked: boolean;
  onBookmarkToggle: () => void;
}) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/places/${placeId}`);
  };

  return (
    <div
      onClick={handleCardClick}
      draggable="false"
      className={`${className} transition-all`}
    >
      <div className="relative flex flex-col gap-2">
        <div className="relative aspect-square">
          <PlaceImage
            image={image}
            title={title}
            className="pointer-events-none rounded-12"
          />
          {/* 북마크 버튼 */}
          <div className="absolute right-3 top-3 z-10">
            <BookmarkIcon
              isBookmarked={isBookmarked}
              onToggle={() => {
                onBookmarkToggle();
              }}
            />
          </div>
        </div>
        <h4 className="medium-16 truncate px-2">{title}</h4>
      </div>
    </div>
  );
};

// 성능 최적화를 위한 메모이제이션 - 불필요한 리렌더링 방지
export default memo(SearchCard);
