'use client';

import Image from 'next/image';

import BookmarkIcon from '@/components/commons/bookmark-icon';
import { Button } from '@/components/ui/button';
import { CategoryType } from '@/types/category.type';

const handleImageLoadError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const target = e.target as HTMLImageElement;
  target.parentElement?.classList.add('bg-gray-200');
  target.style.display = 'none';
};

const SideMenuPlaceCard = ({
  title,
  imageUrl,
  category,
  isBookmarked = false,
  isSearchSection = false,
  onBookmarkToggle,
  onAddPlace,
}: {
  title: string;
  imageUrl: string;
  category: CategoryType;
  isBookmarked: boolean;
  isSearchSection?: boolean;
  onBookmarkToggle: () => void;
  onAddPlace?: () => void;
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
              width={40}
              height={40}
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
      <div className="flex items-center gap-2">
        {onBookmarkToggle && (
          <BookmarkIcon
            isBookmarked={isBookmarked}
            onToggle={onBookmarkToggle}
            size={30}
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
              width={24}
              height={24}
              className="text-gray-300"
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SideMenuPlaceCard;
