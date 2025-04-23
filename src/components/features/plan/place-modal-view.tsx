'use client';

import CategoryBadge from '@/components/commons/category-badge';
import PlaceImage from '@/components/commons/place-image';
import { Button } from '@/components/ui/button';
import { Place } from '@/types/place.type';
import { DetailIntroRaw } from '@/types/korea-tour.type';
import { CategoryType } from '@/types/category.type';
import PlanIncludingPlace from '@/app/places/[id]/_components/server/plan-including-place';

const PlaceModalView = ({
  place,
  detailInfo,
}: {
  place: Place;
  detailInfo: DetailIntroRaw | null;
}) => {
  const isHotel = place.content_type_id === 32;

  const rawSummary =
    isHotel && detailInfo
      ? detailInfo.openTime || '체크인/아웃 시간 정보 없음'
      : detailInfo
        ? `${detailInfo.openTime || '운영 시간 정보 없음'}${
            detailInfo.closeDay ? ` (휴무: ${detailInfo.closeDay})` : ''
          }`
        : '정보 없음';

  const openSummary = rawSummary.replace(/<br\s*\/?>/gi, '\n');

  return (
    <div className="max-h-[80vh] space-y-4 overflow-y-auto overflow-x-hidden p-4">
      <div className="relative aspect-square">
        <PlaceImage image={place.image} title={place.title} />
      </div>

      <div className="flex items-start justify-between">
        <div>
          <CategoryBadge
            category={place.category as CategoryType}
            badgeType="modal"
          />
          <h2 className="mt-2 text-lg font-semibold">{place.title}</h2>
          <p className="text-sm text-muted-foreground">{place.address}</p>
        </div>
        <div>북마크 영역</div>
      </div>

      <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-gray-500">
        <li>
          {isHotel ? '체크인/체크아웃' : '운영시간'}: {openSummary}
        </li>
        <li>{detailInfo?.phone || '전화번호 미제공'}</li>
      </ul>

      <Button className="mt-4 w-full">내 일정에 추가하기</Button>

      <div>
        <PlanIncludingPlace placeId={place.place_id} />
      </div>
    </div>
  );
};

export default PlaceModalView;
