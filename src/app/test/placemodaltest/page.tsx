'use client';

import PlaceModal from '@/components/features/plan/place-modal';
import { getBrowserClient } from '@/lib/supabase/client';
import { useState, useEffect } from 'react';

type Place = {
  address: string;
  category: string;
  content_type_id: number;
  id: number;
  image: string | null;
  lat: number;
  lng: number;
  place_id: number;
  title: string;
};

const TestPage = () => {
  const [place, setPlace] = useState<Place | null>(null);
  const [detailInfo, setDetailInfo] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = getBrowserClient();
        const { data, error } = await supabase
          .from('places')
          .select('*')
          .eq('place_id', 2850913)
          .single();

        if (error || !data) {
          setError('장소 불러오기 실패');
          return;
        }

        setPlace(data);

        const contentId = data.place_id;
        const contentTypeId = data.content_type_id;

        const detailRes = await fetch(
          `/api/korea-tour/detail?contentId=${contentId}&contentTypeId=${contentTypeId}`,
        );

        const detailJson = await detailRes.json();

        if (!detailRes.ok) {
          setError('상세 정보 로딩 실패');
          return;
        }

        setDetailInfo(detailJson);
      } catch (e: any) {
        setError(e.message || '알 수 없는 오류');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div>
        플레이스모달테스트
        <div>
          {error && <div>{error}</div>}
          {place && <PlaceModal place={place} detailInfo={detailInfo} />}
        </div>
      </div>
    </>
  );
};

export default TestPage;
