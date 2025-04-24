'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { CategoryType } from '@/types/category.type';
import BookmarkIcon from '@/components/commons/bookmark-icon';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import PlaceModal from '@/components/features/plan/place-modal';

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
  imageUrl,
  category,
  isBookmarked = false,
  toggleBookmark,
  onAddPlace,
  placeId,
}: {
  title: string;
  imageUrl: string;
  category: CategoryType;
  isBookmarked: boolean;
  toggleBookmark: () => void;
  onAddPlace?: () => void;
  placeId: number;
}) => {
  const defaultImage = useMemo(() => getRandomDefaultImage(), []);
  const displayImageUrl = imageUrl || defaultImage;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  console.log('타이틀', title);
  console.log('카테고리', category);
  console.log('프랍으로 내려준 플레이스아이디', placeId);

  return (
    <>
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
          <div
            className="flex flex-col gap-1"
            onClick={() => setIsDialogOpen(true)}
          >
            <span className="line-clamp-1 text-14 font-semibold text-gray-900">
              {title}
            </span>
            <span className="text-12 text-gray-600">{category}</span>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex items-center gap-2">
          <BookmarkIcon
            isBookmarked={isBookmarked}
            onToggle={toggleBookmark}
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
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTitle className="sr-only">장소 상세 정보</DialogTitle>
        <DialogContent>
          <PlaceModal placeId={placeId} onAddPlace={onAddPlace} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlaceCardSidemenu;
