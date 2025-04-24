'use client';

import { useGetPlaceBasicInfo } from '@/lib/queries/use-get-place-basic-info';
import PlaceModalView from './place-modal-view';
import useAuth from '@/lib/hooks/use-auth';
import { useGetPlaceDetailInfo } from '@/lib/queries/use-get-place-detail-info';
import { useGetBookmarkCheck } from '@/lib/queries/use-get-bookmark-check';
import { useGetPlans } from '@/lib/queries/use-get-plans';

const PlaceModal = ({
  placeId,
  onAddPlace,
  isBookmarked,
}: {
  placeId: number;
  onAddPlace?: () => void;
  isBookmarked: boolean;
}) => {
  const { user } = useAuth();

  const {
    data: place,
    isPending: placePending,
    error: placeError,
  } = useGetPlaceBasicInfo(placeId);

  const {
    data: detailInfo,
    isPending: detailPending,
    error: detailError,
  } = useGetPlaceDetailInfo(placeId, place?.content_type_id ?? 0);

  // const { data: isBookmarked = false, isPending: bookmarkPending } =
  //   useGetBookmarkCheck(placeId, user?.id ?? '');

  const {
    data: planIncludingPlace,
    isPending: planPending,
    error: planError,
  } = useGetPlans(placeId, user?.id ?? '');

  const loading = placePending || detailPending || planPending;
  const error =
    placeError?.message || detailError?.message || planError?.message;

  if (loading) {
    return (
      <div className="p-6 text-sm text-gray-500">정보를 불러오는 중...</div>
    );
  }

  if (error || !place) {
    return (
      <div className="text-red-500 p-6 text-sm">
        정보 불러오기 실패: {error}
      </div>
    );
  }

  return (
    <PlaceModalView
      place={place}
      detailInfo={detailInfo ?? null}
      onAddPlace={onAddPlace}
      isBookmarked={isBookmarked}
      planIncludingPlace={planIncludingPlace!}
    />
  );
};

export default PlaceModal;
