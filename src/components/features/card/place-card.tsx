'use client';

import { useRouter } from 'next/navigation';
import { memo } from 'react';

import PlaceImage from '@/components/commons/place-image';
import { useBookmarkMutation } from '@/lib/mutations/use-bookmark-mutation';
import { PlaceCardProps } from '@/types/card.type';

/**
 * 장소 카드 컴포넌트
 * @param placeId - 장소의 id
 * @param image - 이미지 값
 * @param title - 장소 이름
 * @param isLiked - 좋아요 여부
 * @param isDragging - 드래그 중인지 여부
 * @param className - 추가 스타일 클래스
 */
const PlaceCard = ({
  placeId,
  image,
  title,
  isLiked,
  className,
  isDragging = false,
}: PlaceCardProps) => {
  const router = useRouter();
  const { toggleBookmark, isLoading } = useBookmarkMutation();

  const handleCardClick = () => {
    // 드래그 중이 아닐 때만 페이지 이동
    if (!isDragging) {
      router.push(`/places/${placeId}`);
    }
  };

  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 부모 요소의 onClick 이벤트 방지
    if (!isLoading) {
      toggleBookmark(placeId, isLiked);
    }
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
        </div>
        <h4 className="medium-16 truncate px-2">{title}</h4>
        {/* 북마크 버튼 */}
        <button
          className="absolute right-3 top-3 rounded-12 bg-white/10"
          onClick={handleBookmarkClick}
          disabled={isLoading}
        >
          <svg
            width="44"
            height="42"
            viewBox="0 0 44 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transition-all duration-300 ${isLoading ? 'opacity-50' : ''}`}
          >
            <path
              d="M13.4293 35C13.1839 34.9992 12.9428 34.9295 12.7293 34.7978C12.5087 34.6627 12.325 34.4662 12.197 34.2284C12.0689 33.9906 12.0013 33.7201 12.0008 33.4444V10.6244C11.9815 9.6916 12.3006 8.78805 12.8888 8.10961C13.477 7.43117 14.2871 7.0325 15.1434 7H28.8566C29.7129 7.0325 30.523 7.43117 31.1112 8.10961C31.6994 8.78805 32.0185 9.6916 31.9992 10.6244V33.4444C31.9977 33.7159 31.931 33.9822 31.8057 34.2169C31.6804 34.4516 31.5008 34.6465 31.2849 34.7822C31.0678 34.9188 30.8215 34.9906 30.5707 34.9906C30.32 34.9906 30.0736 34.9188 29.8565 34.7822L21.7572 29.7889L14.1435 34.7667C13.9286 34.9119 13.6821 34.9925 13.4293 35Z"
              className={`${isLiked ? 'fill-primary-500' : 'fill-gray-200'}`}
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

// 성능 최적화를 위한 메모이제이션 - 불필요한 리렌더링 방지
export default memo(PlaceCard);
