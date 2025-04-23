'use client';

import { useEffect, useState } from 'react';
import { Place } from '@/types/place.type';
import { DetailIntroRaw } from '@/types/korea-tour.type';
import { getBrowserClient } from '@/lib/supabase/client';
import PlaceModalView from './place-modal-view';

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
          `/api/korea-tour/detail?contentId=${placeId}&contentTypeId=${contentTypeId}`,
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
  }, [placeId, contentTypeId]);

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

  return <PlaceModalView place={place} detailInfo={detailInfo} />;
};

export default PlaceModal;
