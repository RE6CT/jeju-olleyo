'use client';

import { useEffect, useState } from 'react';
import CategoryBadge from '@/components/commons/category-badge';
import PlaceImage from '@/components/commons/place-image';
import { CategoryType } from '@/types/category.type';
import { Button } from '@/components/ui/button';
import { Place } from '@/types/place.type';
import { DetailIntroRaw } from '@/types/korea-tour.type';
import { getBrowserClient } from '@/lib/supabase/client';
import PlanIncludingPlace from '@/app/places/[id]/_components/plan-including-place';

// TODO : 온클릭 함수도 용준씨 컴포넌트에서 프랍으로 내려주기
// TODO : 북마크 버튼 넣기

const PlaceModal = ({
  placeId,
  contentTypeId,
}: {
  placeId: number;
  contentTypeId: number;
}) => {
  const [place, setPlace] = useState<Place | null>(null);
  const [detailInfo, setDetailInfo] = useState<DetailIntroRaw | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = await getBrowserClient();

        const { data: placeData, error: placeError } = await supabase
          .from('places')
          .select('*')
          .eq('place_id', placeId)
          .single();

        if (placeError || !placeData) throw new Error('장소 정보 없음');

        setPlace(placeData);

        const detailRes = await fetch(
          `/api/korea-tour/detail?contentId=${placeData.place_id}&contentTypeId=${placeData.content_type_id}`,
        );

        if (!detailRes.ok) throw new Error('상세정보 fetch 실패');

        const detailJson = await detailRes.json();
        setDetailInfo(detailJson);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [placeId]);

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
        <PlanIncludingPlace placeId={placeId} />
      </div>
    </div>
  );
};

export default PlaceModal;
