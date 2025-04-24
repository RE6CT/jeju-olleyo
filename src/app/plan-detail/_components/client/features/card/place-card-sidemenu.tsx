'use client';

import Image from 'next/image';
import { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { CategoryType } from '@/types/category.type';
import BookmarkButton from '@/components/features/like/bookmark-button';

const PLACE_IMAGE_SIZE = {
  width: 40,
  height: 40,
};
const ADD_PLACE_ICON_SIZE = {
  width: 20,
  height: 20,
};

const DEFAULT_IMAGES = [
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/plan-images/default/plan_default_1.png`,
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/plan-images/default/plan_default_2.png`,
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/plan-images/default/plan_default_3.png`,
  `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/plan-images/default/plan_default_4.png`,
];

const getRandomDefaultImage = () => {
  const randomIndex = Math.floor(Math.random() * DEFAULT_IMAGES.length);
  return DEFAULT_IMAGES[randomIndex];
};

const handleImageLoadError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  const target = e.target as HTMLImageElement;
  target.parentElement?.classList.add('bg-gray-200');
  target.style.display = 'none';
};

const PlaceCardSidemenu = ({
  title,
  placeId,
  imageUrl,
  category,
  isBookmarked = false,
  onAddPlace,
}: {
  title: string;
  placeId: number;
  imageUrl: string;
  category: CategoryType;
  isBookmarked: boolean;
  onAddPlace?: () => void;
}) => {
  const defaultImage = useMemo(() => getRandomDefaultImage(), []);
  const displayImageUrl = imageUrl || defaultImage;

  return (
    <div className="flex w-[240px] items-center justify-between py-3">
      <div className="flex gap-3">
        {/* 장소 이미지 */}
        <div
          className={`h-[40px] w-[40px] overflow-hidden rounded-[4px] ${!imageUrl && 'bg-gray-200'}`}
        >
          <Image
            src={displayImageUrl}
            alt=""
            width={PLACE_IMAGE_SIZE.width}
            height={PLACE_IMAGE_SIZE.height}
            className="h-full w-full object-cover"
            onError={handleImageLoadError}
          />
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
        <BookmarkButton
          isBookmarked={isBookmarked}
          placeId={placeId}
          className="h-6 w-6"
        />
        {onAddPlace && (
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

export default PlaceCardSidemenu;
