'use client';

import Image from 'next/image';
import { useMemo } from 'react';

import CategoryBadge from '@/components/commons/category-badge';
import { cn } from '@/lib/utils';
import { CategoryType } from '@/types/category.type';
import { getDefaultPlanOrPlaceImage } from '@/lib/utils/get-default-plan-image';

const PLACE_IMAGE_SIZE = {
  width: 92,
  height: 92,
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
  placeId,
  title,
  address,
  distance,
  duration,
  imageUrl,
  isLastItem = false,
  onDelete,
  isReadOnly = false,
  isDragging = false,
}: {
  index: number;
  dayNumber: number;
  category: string;
  placeId: number;
  title: string;
  address: string;
  distance?: number;
  duration?: number;
  imageUrl?: string;
  isLastItem?: boolean;
  onDelete?: () => void;
  isReadOnly?: boolean;
  isDragging?: boolean;
}) => {
  const dayColorSet = dayNumber % 2 === 1 ? COLORS.ODD : COLORS.EVEN;
  const defaultImage = useMemo(() => getDefaultPlanOrPlaceImage(placeId), []);
  const displayImageUrl = imageUrl || defaultImage;

  return (
    <div
      className={cn(
        'flex gap-3 md:w-[498px] lg:w-[640px]',
        !isReadOnly && 'cursor-grab active:cursor-grabbing',
        isDragging && 'opacity-50',
      )}
    >
      {/* 원형으로 인덱스 표시 */}
      <div
        className={`regular-12 flex h-6 w-6 flex-col items-center justify-center gap-[10px] rounded-[12px] ${dayColorSet.bg} px-2 text-white`}
      >
        {index}
      </div>

      {/* 카드 본문 */}
      <div className="flex w-full items-center gap-[15px] rounded-lg border border-gray-100 bg-white p-[8.72px] shadow-[0px_2px_4px_1px_rgba(0,0,0,0.10)] transition-shadow duration-200 hover:shadow-[0px_4px_8px_2px_rgba(0,0,0,0.15)] md:gap-5 md:p-3">
        {/* 장소 이미지 */}
        <div
          className={`h-[72px] w-[72px] shrink-0 overflow-hidden rounded-lg bg-gray-100 md:h-[92px] md:w-[92px]`}
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
        <div className="flex flex-1 shrink-0 flex-col items-start justify-start md:h-[92px] md:gap-1">
          <div className="w-fit">
            <CategoryBadge
              category={category as CategoryType}
              badgeType="card"
              variant="primary"
              className={cn(
                'inline-flex h-[15px] items-center justify-center rounded-[10px] border-[0.5px] px-2 py-[2px] text-[8px] font-normal md:h-[20px] md:text-sm',
                dayColorSet.border,
                dayColorSet.text,
              )}
            />
          </div>
          <div className="flex w-full flex-col">
            <span className="semibold-12 md:semibold-16 text-gray-900">
              {title}
            </span>
            <span className="text-9 text-gray-400">{address}</span>
          </div>
          {!isLastItem && (
            <div className="text-9 mt-auto flex items-center gap-[2.91px] md:gap-1">
              <div
                className={`text-8 md:regular-12 flex aspect-square h-[15px] w-[15px] shrink-0 flex-col items-center justify-center gap-[10px] rounded-[12px] md:h-[20px] md:w-[20px] ${dayColorSet.bg} text-white md:p-[3px_9px]`}
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
              <span className="text-gray-400">
                {duration !== undefined ? `${duration}분` : '0분'}
              </span>
            </div>
          )}
        </div>

        {/* 삭제 버튼 */}
        {!isReadOnly && onDelete && (
          <button className="shrink-0 self-start p-1" onClick={onDelete}>
            <Image
              src="/icons/close.svg"
              alt="삭제"
              width={BUTTON_SIZE.width}
              height={BUTTON_SIZE.height}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default PlaceCard;
