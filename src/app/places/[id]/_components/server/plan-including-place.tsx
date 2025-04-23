import PlanVerticalCard from '@/components/features/card/plan-vertical-card';
import { getServerClient } from '@/lib/supabase/server';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import { camelize } from '@/lib/utils/camelize';

const PlanIncludingPlace = async ({ placeId }: { placeId: number }) => {
  const supabase = await getServerClient();
  const { user } = await fetchGetCurrentUser();

  if (!user) {
    return <p className="text-sm text-gray-400">로그인이 필요합니다.</p>;
  }

  const { data, error } = await supabase.rpc('get_plans_by_place_id', {
    input_place_id: placeId,
    user_id_param: user.id,
  });

  if (error) {
    console.error('일정 불러오기 에러:', error);
    return <p className="text-sm text-gray-400">일정을 불러오지 못했습니다.</p>;
  }

  const plans = data.map(camelize);

  return (
    <div>
      <div className="semibold-24 mb-7 mt-[73px]">해당 장소가 포함된 일정</div>

      {plans?.length === 0 && (
        <p className="text-sm text-gray-400">
          아직 이 장소가 포함된 일정이 없습니다.
        </p>
      )}

      <div className="grid w-full grid-cols-1 gap-x-[11px] gap-y-9 sm:grid-cols-2 md:grid-cols-3">
        {plans &&
          plans
            .slice(0, 6)
            .map((plan) => <PlanVerticalCard key={plan.planId} plan={plan} />)}
      </div>
    </div>
  );
};

export default PlanIncludingPlace;
