'use client';

import CategoryBadge from '@/components/commons/category-badge';
import PlaceImage from '@/components/commons/place-image';
import { Place } from '@/types/place.type';
import { DetailIntroRaw } from '@/types/korea-tour.type';
import { CategoryType } from '@/types/category.type';
import BookmarkButton from '../like/bookmark-button';
import TimeIcon from '@/components/icons/time-icon';
import PhoneIcon from '@/components/icons/phone-icon';
import AddIcon from '@/components/icons/add-icon';
import { PlaceModal } from '@/types/place-modal.type';
// import PlanVerticalCard from '../card/plan-vertical-card';

const PlaceModalView = ({
  place,
  detailInfo,
  onAddPlace,
  isBookmarked,
  planIncludingPlace,
}: {
  place: Place;
  detailInfo: DetailIntroRaw | null;
  onAddPlace?: () => void;
  isBookmarked: boolean;
  planIncludingPlace: PlaceModal[];
}) => {
  const isHotel = place.content_type_id === 32;

  const rawSummary =
    isHotel && detailInfo
      ? detailInfo.openTime || '체크인/아웃시간 미제공'
      : detailInfo
        ? `${detailInfo.openTime || '운영시간 미제공'}${
            detailInfo.closeDay ? ` (휴무: ${detailInfo.closeDay})` : ''
          }`
        : '정보 없음';

  const openSummary = rawSummary.replace(/<br\s*\/?>/gi, '\n');

  return (
    <div className="max-h-[80vh] w-full space-y-4 overflow-y-auto overflow-x-hidden p-4">
      <div className="relative aspect-square">
        <PlaceImage image={place.image} title={place.title} />
      </div>
      <CategoryBadge
        className="semibold-16 px-4 py-2"
        category={place.category as CategoryType}
        badgeType="modal"
      />
      <div className="flex w-full flex-col">
        <div className="mt-2 flex w-full items-center justify-between">
          <div className="bold-28">{place.title}</div>
          <BookmarkButton
            className="h-[44px] w-[42px]"
            isBookmarked={isBookmarked}
            placeId={place.place_id}
          />
        </div>

        <p className="semibold-20">{place.address}</p>
      </div>

      <div className="medium-18 mt-2 space-y-1 text-gray-300">
        <div className="flex items-center gap-[6px]">
          <TimeIcon size={20} fill="gray-300" />
          {isHotel ? '체크인/체크아웃' : ''}
          {openSummary}
        </div>
        <div className="medium-18 flex items-center gap-[6px]">
          <PhoneIcon size={20} fill="gray-300" />
          {detailInfo?.phone || '전화번호 미제공'}
        </div>
      </div>

      <button
        onClick={onAddPlace}
        className="semibold-22 mt-7 flex w-full items-center justify-center gap-[6px] rounded-12 border-2 border-primary-500 text-primary-500"
      >
        내 일정에 추가하기 <AddIcon size={20} fill="primary-500" />
      </button>

      {/* <div>
        <div className="semibold-24 mb-7 mt-10">해당 장소가 포함된 일정</div>

        {planIncludingPlace?.length === 0 && (
          <p className="text-sm text-gray-400">
            아직 이 장소가 포함된 일정이 없습니다.
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          {planIncludingPlace
            ?.slice(0, 4)
            .map((plan) => <PlanVerticalCard key={plan.planId} plan={plan} />)}
        </div>
      </div> */}
    </div>
  );
};

export default PlaceModalView;
