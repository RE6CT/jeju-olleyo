'use server';

import { CATEGORY_KR_MAP } from '@/constants/home.constants';
import { getServerClient } from '@/lib/supabase/server';

/**
 *
 * @param urlcategory - params로 받아온 toursite, restaurant, cafe, accomodation
 * krCategory - 위 urlcategory를 수파베이스 컬럼 분류에 맞게 교체.
 *
 */
const fetchGetPlacesByCategory = async (urlcategory: string) => {
  const supabase = await getServerClient();

  const krCategory = CATEGORY_KR_MAP[urlcategory];
  if (!krCategory) throw new Error('유효하지 않은 카테고리입니다.');

  const { data, error } = await supabase
    .from('places')
    .select('*')
    .eq('category', krCategory);

  if (error) throw new Error(error.message);

  return data;
};

export default fetchGetPlacesByCategory;
