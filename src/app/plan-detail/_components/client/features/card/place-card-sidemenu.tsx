'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { CategoryType } from '@/types/category.type';
import BookmarkButton from '@/components/commons/bookmark-button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import PlaceModal from '@/components/features/plan/place-modal';
import { getDefaultPlanOrPlaceImage } from '@/lib/utils/get-default-plan-image';

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
  const defaultImage = useMemo(() => getDefaultPlanOrPlaceImage(placeId), []);
  const displayImageUrl = imageUrl || defaultImage;

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <div className="flex w-[240px] items-center justify-between md:w-[182px] lg:w-[240px]">
        <div className="flex items-center gap-3">
          {/* 장소 이미지 */}
          <div
            className={`relative h-[40px] w-[40px] min-w-[40px] overflow-hidden rounded-[4px] md:h-[30px] md:w-[30px] md:min-w-[30px] lg:h-[40px] lg:w-[40px] lg:min-w-[40px] ${!imageUrl && 'bg-gray-200'}`}
          >
            <Image
              src={displayImageUrl}
              alt=""
              fill
              sizes="(max-width: 768px) 30px, 40px"
              className="absolute inset-0 object-cover"
              onError={handleImageLoadError}
            />
          </div>

          {/* 장소 정보 */}
          <div className="flex flex-col" onClick={() => setIsDialogOpen(true)}>
            <span className="line-clamp-1 text-14 font-semibold text-gray-900">
              {title}
            </span>
            <span className="text-12 text-gray-600">{category}</span>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex items-center gap-2">
          <BookmarkButton placeId={placeId} className="h-6 w-6" />
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
          <PlaceModal
            placeId={placeId}
            onAddPlace={onAddPlace}
            isBookmarked={isBookmarked}
            onClose={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlaceCardSidemenu;
