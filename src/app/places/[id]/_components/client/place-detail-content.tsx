'use client';

import BookmarkButton from '@/components/features/like/bookmark-button';
import CategoryBadge from '@/components/commons/category-badge';
import PlaceImage from '@/components/commons/place-image';
import PlaceLocation from './place-location';
import { CategoryType } from '@/types/category.type';
import { Place } from '@/types/search.type';
import { DetailIntroRaw } from '@/types/korea-tour.type';
import PhoneIcon from '@/components/icons/phone-icon';
import TimeIcon from '@/components/icons/time-icon';
import LocationIcon from '@/components/icons/location-icon';

const PlaceDetailContent = ({
  place,
  detailJson,
  isBookmarked,
}: {
  place: Place;
  detailJson: DetailIntroRaw;
  isBookmarked: boolean;
}) => {
  const placeId = place.placeId;
  const isHotel = place.contentTypeId === 32;

  const rawSummary = isHotel
    ? detailJson
      ? `${detailJson.openTime || '체크인/아웃 시간 정보 없음'}`
      : '정보 없음'
    : detailJson
      ? `${detailJson.openTime || '운영 시간 정보 없음'}${
          detailJson.closeDay ? ` (휴무: ${detailJson.closeDay})` : ''
        }`
      : '정보 없음';

  const openSummary = rawSummary.replace(/<br\s*\/?>/gi, '\n');

  return (
    <div className="mt-[73px] flex flex-col items-center justify-center px-9">
      <div className="flex gap-8">
        <div className="relative aspect-square w-[479px] bg-no-repeat object-cover">
          <PlaceImage image={place.image} title={place.title} />
        </div>

        <div className="flex flex-col justify-start space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <CategoryBadge
              category={place.category as CategoryType}
              badgeType="modal"
            />
          </div>

          <div className="mb-[10px] mt-[10px] flex items-center gap-2">
            <div className="bold-28 text-xl">{place.title}</div>
            <div className="ml-auto">
              <BookmarkButton isBookmarked={isBookmarked} placeId={placeId} />
            </div>
          </div>

          <div className="mt-2 space-y-[9.5px] text-gray-300">
            <div className="medium-18 flex gap-[6px]">
              <TimeIcon size={20} fill="gray-300" />
              {isHotel ? '체크인/체크아웃' : ''}
              {openSummary}
            </div>
            <div className="medium-18 flex items-center gap-[6px]">
              <PhoneIcon size={20} fill="gray-300" />
              {detailJson?.phone || '전화번호 미제공'}
            </div>
          </div>

          <div className="semibold-18 mt-[11px] text-gray-300">
            <div className="medium-18 flex items-center gap-[6px]">
              <LocationIcon size={20} fill="gray-300" />
              {place.address}
            </div>
          </div>

          {/* 지도영역 */}
          <div className="mb-auto">
            <PlaceLocation
              lat={place.lat}
              lng={place.lng}
              title={place.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceDetailContent;
