'use server';

import { getServerClient } from '@/lib/supabase/server';
import { camelize } from '@/lib/utils/camelize';
import { CategoryType } from '@/types/category.type';
import { UserBookmark } from '@/types/mypage.type';

/**
 * 장소에 대한 사용자의 북마크 여부 확인
 * @param place 장소 ID
 * @param userId 사용자 ID
 */
export const fetchGetBookmarkByIdQuery = async (
  placeId: number,
  userId: string,
) => {
  const supabase = await getServerClient();

  const { data, error } = await supabase
    .from('bookmarks')
    .select('bookmark_id')
    .eq('place_id', placeId)
    .eq('user_id', userId)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data;
};

/**
 * 사용자의 북마크 목록을 가져오는 함수
 * @param userId - 사용자 ID
 * @returns 사용자의 북마크 목록 또는 null
 */
export const fetchGetAllBookmarksByUserId = async (
  userId: string,
  page: number = 1,
  pageSize: number = 9,
  category?: CategoryType | undefined,
): Promise<UserBookmark[] | null> => {
  const supabase = await getServerClient();

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize - 1;

  let query = supabase
    .rpc('get_user_bookmarks', {
      user_id_param: userId,
    })
    .range(startIndex, endIndex);

  if (category && category !== '전체') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) throw new Error(error.message);

  const camelizedData: UserBookmark[] | null = data ? camelize(data) : null;
  return camelizedData;
};

/**
 * 사용자의 북마크 목록 개수를 가져오는 함수
 * @param userId - 사용자 ID
 * @param category - 장소의 카테고리
 * @returns 사용자의 북마크 목록 개수
 */
export const fetchGetAllBookmarksCount = async (
  userId: string,
  category?: CategoryType | undefined,
) => {
  const supabase = await getServerClient();

  let query = supabase.rpc('get_user_bookmarks', {
    user_id_param: userId,
  });

  if (category && category !== '전체') {
    query = query.eq('category', category);
  }

  const { count, error } = await query;
  if (error) throw new Error(error.message);

  return count;
};
