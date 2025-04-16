import { CATEGORY_KR_MAP } from '@/constants/home.constants';
import { getBrowserClient } from '@/lib/supabase/client';
import { camelize } from '@/lib/utils/camelize';
import { CategoryParamType } from '@/types/category.type';

/**
 * 카테고리별로 장소 데이터를 가져오는 함수
 * @param urlcategory - params로 받아온 all, toursite, restaurant, cafe, accommodation
 * krCategory - 위 urlcategory를 수파베이스 컬럼 분류에 맞게 교체
 */
export const fetchGetPlacesByCategory = async (
  urlCategory: CategoryParamType,
  pageParam = 0,
) => {
  const supabase = await getBrowserClient();
  const pageSize = 16; // 한 페이지에 표시할 아이템 수
  const start = pageParam * pageSize;
  const end = start + pageSize - 1;

  const krCategory = CATEGORY_KR_MAP[urlCategory];
  if (!krCategory) throw new Error('유효하지 않은 카테고리입니다.');

  // 카테고리 all 아닐 경우 특정 카테고리만 가져오기
  let query = supabase
    .from('places')
    .select('*', { count: 'exact' })
    .range(start, end);
  if (urlCategory !== 'all') {
    query = query.eq('category', krCategory);
  }

  const { data, error, count } = await query;

  if (error) throw new Error(error.message);

  return { data: camelize(data), count };
};
