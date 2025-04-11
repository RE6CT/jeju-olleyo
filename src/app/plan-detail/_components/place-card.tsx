'use client';

import Image from 'next/image';
import CategoryBadge from '@/components/commons/category-badge';

const PLACE_IMAGE_SIZE = {
  width: 120,
  height: 120,
};
const BUTTON_SIZE = {
  width: 24,
  height: 24,
};
const ICON_SIZE = {
  width: 20,
  height: 20,
};

const PlaceCard = ({
  index,
  title,
  address,
  distance,
  duration,
  imageUrl = '/images/default-place.jpg',
}: {
  index: number;
  title: string;
  address: string;
  distance?: number;
  duration?: number;
  imageUrl?: string;
}) => {
  return (
    <div className="flex flex-col gap-3">
      {/* 원형으로 인덱스 표시 */}
      <div className="flex h-6 w-6 -translate-y-1/2 flex-col items-center justify-center gap-[10px] rounded-[12px] bg-primary-500 px-2 text-10 font-regular leading-[150%] text-white">
        {index}
      </div>

      {/* 카드 본문 */}
      <div className="flex items-center gap-5 rounded-lg border border-gray-100 bg-white p-4 shadow-[0px_2px_4px_1px_rgba(0,0,0,0.10)]">
        {/* 장소 이미지 */}
        <div className={`overflow-hidden`}>
          <Image
            src={imageUrl}
            alt={title}
            width={PLACE_IMAGE_SIZE.width}
            height={PLACE_IMAGE_SIZE.height}
            className="h-full w-full object-cover"
          />
        </div>

        {/* 장소 정보 */}
        <div className="flex flex-1 flex-col gap-1">
          {/* TODO: 예시 코드 - 삭제 예정 */}
          <CategoryBadge
            category="카페" // 추후 상수로 관리
            badgeType="card"
            variant="primary"
            className="text-10 leading-[150%]"
          />
          <div className="flex flex-col">
            <span className="font-pretendard text-20 font-semibold leading-[150%] text-gray-900">
              {title}
            </span>
            <span className="font-pretendard text-16 font-regular leading-[150%] text-gray-400">
              {address}
            </span>
          </div>
          <div className="flex items-center gap-1 text-12">
            <div className="flex aspect-square h-[20px] w-[20px] shrink-0 flex-col items-center justify-center gap-[10px] rounded-[12px] bg-primary-500 p-[3px_9px] text-10 font-regular leading-[150%] text-white">
              {index + 1}
            </div>
            <div className="flex">
              <span className="text-gray-400">까지 </span>
              <span className="text-primary-500">{distance}m</span>
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
        </div>

        {/* 삭제 버튼 */}
        <button className="self-start p-1">
          <Image
            src="/icons/cancel.svg"
            alt="삭제"
            width={BUTTON_SIZE.width}
            height={BUTTON_SIZE.height}
            className="text-gray-300"
          />
        </button>
      </div>
    </div>
  );
};

export default PlaceCard;
