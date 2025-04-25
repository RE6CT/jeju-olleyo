import { Place } from '@/types/search.type';
import { camelize } from '@/lib/utils/camelize';
import { getServerClient } from '@/lib/supabase/server';
import { SERVER_COMPONENT_BASE_URL } from '@/constants/tour.constants';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import PlaceDetailContent from './_components/client/place-detail-content';
import PlanIncludingPlace from './_components/server/plan-including-place';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const supabase = getServerClient();

  const { data, error } = await supabase
    .from('places')
    .select('title')
    .eq('place_id', Number(params.id))
    .single();

  if (error || !data) {
    return {
      title: '장소 정보 없음',
      description: '요청한 장소 정보를 불러올 수 없습니다.',
    };
  }

  const description = `${data.title}의 운영 시간, 전화번호, 주소, 위치 등을 확인해보세요.`;

  return {
    title: `제주도 여행지 상세정보 - ${data.title}`,
    description,
    openGraph: {
      title: `제주도 여행지 상세정보 - ${data.title}`,
      description,
    },
    keywords: [
      '제주도',
      data.title,
      '명소',
      '제주도 명소',
      '맛집',
      '제주도 맛집',
      '호텔',
      '제주도 호텔',
      '카페',
      '제주도 카페',
    ],
  };
}

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
      {/* 장소 정보 영역 */}
      <PlaceDetailContent
        place={camelizedData}
        detailJson={detailJson}
        isBookmarked={isBookmarked}
      />

      {/* 해당 장소가 포함된 일정 영역 */}
      <div className="mt-[73px] flex flex-col items-center justify-center px-9">
        <div className="w-full text-left">
          <PlanIncludingPlace placeId={placeId} />
        </div>
      </div>
    </>
  );
};

export default PlaceDetailPage;
