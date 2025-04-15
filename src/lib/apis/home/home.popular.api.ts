import { getBrowserClient } from '@/lib/supabase/client';
import { camelize } from '@/lib/utils/camelize';
import { CATEGORY_KR_MAP } from '@/constants/home.constants';
import { Place } from '@/types/home.popular-place.type';

/**
 * 전체 일정을 가져오는 함수
 * @param userId - 사용자의 userId
 * @param limit - 개수 제한
 * @returns 좋아요 여부가 포함된 전체 일정 목록
 */
export const fetchAllPlans = async (userId: string | null, limit?: number) => {
  const supabase = getBrowserClient();

  let query = supabase.rpc('get_plans', {
    user_id_param: userId,
  });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return data.map(camelize);
};

/**
 *
 * @param urlcategory - params로 받아온 toursite, restaurant, cafe, accomodation
 * krCategory - 위 urlcategory를 수파베이스 컬럼 분류에 맞게 교체.
 *
 */
const fetchGetPlacesByCategory = async (urlcategory: string) => {
  try {
    const supabase = getBrowserClient();

    const krCategory = CATEGORY_KR_MAP[urlcategory];
    if (!krCategory) throw new Error('유효하지 않은 카테고리입니다.');

    const { data, error } = await supabase
      .from('places')
      .select('*')
      .eq('category', krCategory);

    if (error) throw new Error(error.message);

    return data;
  } catch (error) {
    console.error('Error fetching places by category:', error);
    throw error;
  }
};

export default fetchGetPlacesByCategory;

/**
 * 인기 장소 목록을 카테고리별로 가져오는 함수
 * @param category - 가져올 장소의 카테고리 (전체 선택 시 모든 카테고리 반환)
 * @returns 인기 장소 목록
 */
export const getPopularPlaces = async (category: string = '전체') => {
  try {
    const supabase = getBrowserClient();
    let query = supabase.from('places').select('*').limit(10);

    if (category !== '전체') {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      console.error(`Error fetching places for category "${category}":`, error);
      return [];
    }

    return data;
  } catch (error) {
    console.error(
      `Unexpected error fetching places for category "${category}":`,
      error,
    );
    return [];
  }
};
