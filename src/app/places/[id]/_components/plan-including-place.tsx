'use client';

import { getBrowserClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

const PlanIncludingPlace = ({ placeId }: { placeId: number }) => {
  const [plans, setPlans] = useState<
    {
      plan_id: number;
      title: string;
      description: string;
      plan_img: string;
      travel_start_date: string;
      travel_end_date: string;
      like_count: number;
    }[]
  >();

  useEffect(() => {
    const fetchGetPlansByPlaceId = async () => {
      try {
        const supabase = await getBrowserClient();

        const { data, error } = await supabase.rpc('get_plans_by_place_id', {
          input_place_id: placeId,
        });

        if (error) {
          console.error('장소가 포함된 일정 수파베이스 에러:', error);
        }

        if (!data) {
          return <div>해당 장소가 포함된 일정이 아직 없습니다.</div>;
        }
        setPlans(data);
      } catch (err) {
        console.error('장소가 포함된 일정 불러오기 에러');
      }
    };
  }, []);

  return (
    <>
      <div>해당 장소가 포함된 일정</div>
    </>
  );
};

export default PlanIncludingPlace;
