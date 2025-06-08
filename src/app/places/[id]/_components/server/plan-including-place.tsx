import { getServerClient } from '@/lib/supabase/server';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import { camelize } from '@/lib/utils/camelize';
import PlanListPreview from '../client/plan-list-preview';

const PlanIncludingPlace = async ({ placeId }: { placeId: number }) => {
  const supabase = await getServerClient();
  const { user } = await fetchGetCurrentUser();

  const { data, error } = await supabase.rpc('get_plans_by_place_id', {
    input_place_id: placeId,
    user_id_param: user?.id as string,
  });

  if (error) {
    console.error('일정 불러오기 에러:', error);
    return <p className="text-sm text-gray-400">일정을 불러오지 못했습니다.</p>;
  }

  const plans = data.map(camelize);

  return (
    <div className="mx-auto w-full max-w-[640px] px-4 md:mx-0 md:max-w-none md:px-0">
      <div className="semibold-20 md:semibold-20 lg:semibold-24 mb-4 md:mb-4 lg:mb-7">
        해당 장소가 포함된 일정
      </div>

      {plans?.length === 0 && (
        <p className="text-sm text-gray-400">
          아직 이 장소가 포함된 일정이 없습니다.
        </p>
      )}

      <div>{plans && <PlanListPreview plans={plans} />}</div>
    </div>
  );
};

export default PlanIncludingPlace;
