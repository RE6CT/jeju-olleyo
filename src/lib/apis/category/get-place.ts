import { CATEGORY_KR_MAP } from '@/constants/home.constants';
import { getBrowserClient } from '@/lib/supabase/client';
import { camelize } from '@/lib/utils/camelize';
import { CategoryParamType } from '@/types/category.type';
import { getCurrentSession } from '../auth/auth-browser.api';

/**
 * 카테고리별로 장소 데이터를 가져오는 함수
 * @param urlcategory - params로 받아온 all, toursite, restaurant, cafe, accommodation
 * @param pageParam - 시작 페이지
 * krCategory - 위 urlcategory를 수파베이스 컬럼 분류에 맞게 교체
 */
export const fetchGetPlacesByCategory = async (
  urlCategory: CategoryParamType,
  pageParam = 0,
  searchQuery?: string,
) => {
  const supabase = await getBrowserClient();
  const pageSize = 16; // 한 페이지에 표시할 아이템 수
  const start = pageParam * pageSize;
  const end = start + pageSize - 1;

  console.log('searchQuery ➡️', searchQuery);

  // 유저 정보 가져오기
  const { user: sessionUser } = await getCurrentSession();
  const userId = sessionUser?.id;

  const krCategory = CATEGORY_KR_MAP[urlCategory];
  if (!krCategory) throw new Error('유효하지 않은 카테고리입니다.');

  // 데이터 개수 가져오기
  let countQuery = supabase.from('places').select('*', { count: 'exact' });

  // 데이터 가져오기
  let dataQuery = supabase
    .rpc(
      'get_all_places',
      { user_id_param: userId ?? null },
      { count: 'exact' },
    )
    .range(start, end);

  if (urlCategory !== 'all') {
    dataQuery = dataQuery.eq('category', krCategory);
    countQuery = countQuery.eq('category', krCategory);
  }

  if (searchQuery) {
    dataQuery = dataQuery.or(
      `title.ilike.%${searchQuery}%,address.ilike.%${searchQuery}%`,
    );
    countQuery = countQuery.or(
      `title.ilike.%${searchQuery}%,address.ilike.%${searchQuery}%`,
    );
  }

  const [{ error: countError, count }, { error: dataError, data }] =
    await Promise.all([countQuery, dataQuery]);

  if (countError) throw new Error(countError.message);
  if (dataError) throw new Error(dataError.message);

  return { data: camelize(data), count };
};
