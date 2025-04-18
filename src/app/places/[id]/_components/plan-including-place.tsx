'use client';

import { useEffect, useState } from 'react';

import PlanVerticalCard from '@/components/features/card/plan-vertical-card';
import { getBrowserClient } from '@/lib/supabase/client';
import { camelize } from '@/lib/utils/camelize';

const PlanIncludingPlace = ({ placeId }: { placeId: number }) => {
  const [plans, setPlans] = useState<
    {
      planId: number;
      title: string;
      description: string;
      planImg: string;
      travelStartDate: string;
      travelEndDate: string;
      likeCount: number;
      nickname: string;
      isLiked: boolean;
    }[]
  >();

  useEffect(() => {
    const fetchGetPlansByPlaceId = async () => {
      try {
        const supabase = await getBrowserClient();

        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError || !session?.user?.id) {
          console.error('유저 세션 확인 실패');
          return;
        }

        const currentUserId = session.user.id;

        const { data, error } = await supabase.rpc('get_plans_by_place_id', {
          input_place_id: placeId,
          user_id_param: currentUserId,
        });

        if (error) {
          console.error('장소가 포함된 일정 수파베이스 에러:', error);
        }

        if (!data) {
          return <div>해당 장소가 포함된 일정이 아직 없습니다.</div>;
        }

        setPlans(data.map(camelize) as typeof plans);
      } catch {
        console.error('장소가 포함된 일정 불러오기 에러');
      }
    };
    fetchGetPlansByPlaceId();
  }, [placeId]);

  return (
    <>
      <div>
        <div>
          <div className="semibold-24 mb-7 mt-[73px]">
            해당 장소가 포함된 일정
          </div>

          {plans?.length === 0 && (
            <p className="text-sm text-gray-400">
              아직 이 장소가 포함된 일정이 없습니다.
            </p>
          )}

          <div className="grid w-full grid-cols-1 gap-x-[11px] gap-y-9 sm:grid-cols-2 md:grid-cols-3">
            {plans &&
              plans.map((plan) => (
                <PlanVerticalCard key={plan.planId} plan={plan} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlanIncludingPlace;
