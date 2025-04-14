'use client';

import Image from 'next/image';
import { CategoryType } from '@/types/category-badge.type';
import { Button } from '@/components/ui/button';
import BookmarkIcon from '@/components/commons/bookmark-icon';

const PLACE_IMAGE_SIZE = {
  width: 40,
  height: 40,
};
const ADD_PLACE_ICON_SIZE = {
  width: 20,
  height: 20,
};

const handleImageLoadError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const target = e.target as HTMLImageElement;
  target.parentElement?.classList.add('bg-gray-200');
  target.style.display = 'none';
};

const PlaceCardCategory = ({
  title,
  imageUrl,
  category,
  isBookmarked = false,
  isSearchSection = false,
  onBookmarkToggle,
  onAddPlace,
  placeId,
  userId,
}: {
  title: string;
  imageUrl: string;
  category: CategoryType;
  isBookmarked: boolean;
  isSearchSection?: boolean;
  onBookmarkToggle?: () => void;
  onAddPlace?: () => void;
  placeId?: number;
  userId?: string;
}) => {
  return (
    <div className="flex w-full items-center justify-between py-3">
      <div className="flex gap-3">
        {/* 장소 이미지 */}
        <div
          className={`h-[40px] w-[40px] overflow-hidden rounded-[4px] ${!imageUrl && 'bg-gray-200'}`}
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt=""
              width={PLACE_IMAGE_SIZE.width}
              height={PLACE_IMAGE_SIZE.height}
              className="h-full w-full object-cover"
              onError={handleImageLoadError}
            />
          )}
        </div>

        {/* 장소 정보 */}
        <div className="flex flex-col gap-1">
          <span className="line-clamp-1 text-14 font-semibold text-gray-900">
            {title}
          </span>
          <span className="text-12 text-gray-600">{category}</span>
        </div>
      </div>

      {/* 버튼 영역 */}
      <div className="flex items-center gap-1">
        {onBookmarkToggle && (
          <BookmarkIcon
            isBookmarked={isBookmarked}
            onToggle={onBookmarkToggle}
          />
        )}
        {(isSearchSection || !onBookmarkToggle) && onAddPlace && (
          <Button
            variant="ghost"
            size="icon"
            className="flex h-6 w-6 items-center justify-center rounded-[12px] bg-gray-100 p-0 hover:bg-gray-100"
            onClick={onAddPlace}
          >
            <Image
              src="/icons/add.svg"
              alt="일정에 추가"
              width={ADD_PLACE_ICON_SIZE.width}
              height={ADD_PLACE_ICON_SIZE.height}
              className="text-gray-300"
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PlaceCardCategory;
