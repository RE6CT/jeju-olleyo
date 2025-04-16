'use client';

import Image from 'next/image';
import CategoryBadge from '@/components/commons/category-badge';
import { CategoryType } from '@/types/category-badge.type';
import { cn } from '@/lib/utils';
import { DEFAULT_IMAGES } from '@/constants/plan.constants';

const PLACE_IMAGE_SIZE = {
  width: 120,
  height: 120,
};

const getRandomDefaultImage = () => {
  const randomIndex = Math.floor(Math.random() * DEFAULT_IMAGES.length);
  return DEFAULT_IMAGES[randomIndex];
};

const BUTTON_SIZE = {
  width: 24,
  height: 24,
};
const ICON_SIZE = {
  width: 20,
  height: 20,
};

const COLORS = {
  ODD: {
    bg: 'bg-primary-500',
    border: 'border-primary-500',
    text: 'text-primary-500',
  },
  EVEN: {
    bg: 'bg-secondary-300',
    border: 'border-secondary-300',
    text: 'text-secondary-300',
  },
} as const;

const PlaceCard = ({
  index,
  dayNumber,
  category,
  title,
  address,
  distance,
  duration,
  imageUrl,
  isLastItem = false,
  onDelete,
}: {
  index: number;
  dayNumber: number;
  category: string;
  title: string;
  address: string;
  distance?: number;
  duration?: number;
  imageUrl?: string;
  isLastItem?: boolean;
  onDelete?: () => void;
}) => {
  const dayColorSet = dayNumber % 2 === 1 ? COLORS.ODD : COLORS.EVEN;
  const displayImageUrl = imageUrl || getRandomDefaultImage();

  return (
    <div className="flex w-full cursor-grab gap-3 active:cursor-grabbing">
      {/* 원형으로 인덱스 표시 */}
      <div
        className={`regular-12 flex h-6 w-6 flex-col items-center justify-center gap-[10px] rounded-[12px] ${dayColorSet.bg} px-2 text-white`}
      >
        {index}
      </div>

      {/* 카드 본문 */}
      <div className="flex w-full items-center gap-5 rounded-lg border border-gray-100 bg-white p-4 shadow-[0px_2px_4px_1px_rgba(0,0,0,0.10)] transition-shadow duration-200 hover:shadow-[0px_4px_8px_2px_rgba(0,0,0,0.15)]">
        {/* 장소 이미지 */}
        <div
          className={`h-[${PLACE_IMAGE_SIZE.height}px] w-[${PLACE_IMAGE_SIZE.width}px] shrink-0 overflow-hidden rounded-lg bg-gray-100`}
        >
          <Image
            src={displayImageUrl}
            alt={title}
            width={PLACE_IMAGE_SIZE.width}
            height={PLACE_IMAGE_SIZE.height}
            className="h-full w-full object-cover"
          />
        </div>

        {/* 장소 정보 */}
        <div className="flex flex-1 shrink-0 flex-col items-start gap-2">
          <div className="w-fit">
            <CategoryBadge
              category={category as CategoryType}
              badgeType="card"
              variant="primary"
              className={cn(
                'inline-flex h-[20px] items-center justify-center rounded-[10px] border-[0.5px] px-2 text-10 font-normal',
                dayColorSet.border,
                dayColorSet.text,
              )}
            />
          </div>
          <div className="flex w-full flex-col">
            <span className="semibold-20 font-[600] text-gray-900">
              {title}
            </span>
            <span className="regular-16 font-[400] text-gray-400">
              {address}
            </span>
          </div>
          {!isLastItem && (
            <div className="flex items-center gap-1 text-12">
              <div
                className={`regular-12 flex aspect-square h-[20px] w-[20px] shrink-0 flex-col items-center justify-center gap-[10px] rounded-[12px] ${dayColorSet.bg} p-[3px_9px] text-white`}
              >
                {index + 1}
              </div>
              <div className="flex">
                <span className="text-gray-400">까지</span>
                {'\u00A0'}
                <span className={dayColorSet.text}>
                  {distance !== undefined
                    ? distance < 1000
                      ? `${distance}m`
                      : `${(distance / 1000).toFixed(2)}km`
                    : '0m'}
                </span>
              </div>
              <Image
                src="/icons/car.svg"
                alt="차량 아이콘"
                width={ICON_SIZE.width}
                height={ICON_SIZE.height}
                className="text-gray-400"
              />
              <span className="text-gray-400">{duration}분</span>
            </div>
          )}
        </div>

        {/* 삭제 버튼 */}
        <button className="shrink-0 self-start p-1" onClick={onDelete}>
          <Image
            src="/icons/close.svg"
            alt="삭제"
            width={BUTTON_SIZE.width}
            height={BUTTON_SIZE.height}
          />
        </button>
      </div>
    </div>
  );
};

export default PlaceCard;
