import { getBrowserClient } from '@/lib/supabase/client';
import { camelize } from '@/lib/utils/camelize';
import { CATEGORY_KR_MAP } from '@/constants/home.constants';
import { Place, PlaceWithLiked } from '@/types/home.popular-place.type';

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
export const fetchGetPlacesByCategory = async (urlcategory: string) => {
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

/**
 * 인기 장소 목록을 가져오는 함수
 * @param category - 장소 카테고리 (기본값: '전체')
 * @param userId - 현재 로그인한 사용자의 ID (선택적)
 * @returns 장소 목록 데이터
 */
/**
 * 인기 장소 목록을 가져오는 함수
 * @param category - 장소 카테고리 (기본값: '전체')
 * @param userId - 현재 로그인한 사용자의 ID (선택적)
 * @returns 장소 목록 데이터
 */
export const getPopularPlaces = async (
  category: string = '전체',
  userId?: string,
): Promise<Place[]> => {
  try {
    // 함수 인자를 명시적으로 타입 지정
    const params: {
      user_id_param: string | null;
      category_param: string;
    } = {
      user_id_param: userId || null,
      category_param: category,
    };

    const supabase = getBrowserClient();
    const { data, error } = await supabase.rpc('get_places', params);

    if (error) {
      console.error('인기 장소를 가져오는데 실패했습니다:', error);
      return [];
    }

    // 응답 데이터를 any로 처리하고 명시적으로 매핑
    return (data as any[]).map((place) => ({
      id: place.place_id,
      title: place.title,
      image: place.image,
      address: place.address,
      category: place.category,
      isBookmarked: place.is_liked,
    }));
  } catch (err) {
    console.error('데이터 처리 중 오류:', err);
    return [];
  }
};

/**
 * 북마크 추가 함수
 * @param placeId - 북마크할 장소 ID
 * @param userId - 사용자 ID
 * @returns 성공 여부와 에러 객체
 */
export const addBookmark = async (placeId: number, userId: string) => {
  const supabase = getBrowserClient();
  const { data, error } = await supabase
    .from('bookmarks')
    .insert([{ place_id: placeId, user_id: userId }]);

  return { success: !error, data, error };
};

/**
 * 북마크 삭제 함수
 * @param placeId - 북마크 삭제할 장소 ID
 * @param userId - 사용자 ID
 * @returns 성공 여부와 에러 객체
 */
export const removeBookmark = async (placeId: number, userId: string) => {
  const supabase = getBrowserClient();
  const { data, error } = await supabase
    .from('bookmarks')
    .delete()
    .eq('place_id', placeId)
    .eq('user_id', userId);

  return { success: !error, data, error };
};
