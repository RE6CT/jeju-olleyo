import { Place } from '@/types/search.type';
import { camelize } from '@/lib/utils/camelize';
import { getServerClient } from '@/lib/supabase/server';
import { SERVER_COMPONENT_BASE_URL } from '@/constants/tour.constants';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import PlaceDetailContent from './_components/place-detail-content';
import PlanIncludingPlace from './_components/plan-including-place';
import PlanIncludingPlaceServer from './_components/plan-including-place-server';

const PlaceDetailPage = async ({ params }: { params: { id: string } }) => {
  const supabase = await getServerClient();
  const { user } = await fetchGetCurrentUser();

  const { data, error } = await supabase
    .from('places')
    .select('*')
    .eq('place_id', Number(params.id))
    .single();

  if (error || !data) {
    return <div>장소 기본 정보 불러오기 실패</div>;
  }

  const camelizedData = camelize(data) as Place;
  const placeId = camelizedData.placeId;
  const { contentTypeId } = camelizedData;

  let isBookmarked = false;
  if (user) {
    const { data: bookmarkData } = await supabase
      .from('bookmarks')
      .select('place_id')
      .eq('user_id', user.id)
      .eq('place_id', placeId)
      .single();

    isBookmarked = !!bookmarkData;
  }

  const detailRes = await fetch(
    `${SERVER_COMPONENT_BASE_URL}/api/korea-tour/detail?contentId=${placeId}&contentTypeId=${contentTypeId}`,
  );
  const detailJson = await detailRes.json();

  return (
    <>
      <PlaceDetailContent
        place={camelizedData}
        detailJson={detailJson}
        isBookmarked={isBookmarked}
      />

      {/* 해당 장소가 포함된 일정 영역 */}
      <div className="w-full text-left">
        <PlanIncludingPlaceServer placeId={placeId} />
      </div>
    </>
  );
};

export default PlaceDetailPage;
