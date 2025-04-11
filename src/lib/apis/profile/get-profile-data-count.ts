import { getBrowserClient } from '@/lib/supabase/client';
import { camelize } from '@/lib/utils/camelize';

/**
 * 프로필 모달 관련 데이터(북마크, 좋아요, 댓글 개수)를 가져오는 함수
 * @param userId - 유저의 uuid
 * @returns 북마크, 좋아요, 댓글 개수를 포함한 객체
 */
export const fetchGetProfileDataCountByUserId = async (userId: string) => {
  const supabase = await getBrowserClient();

  const { data, error } = await supabase.rpc('get_user_data_counts', {
    user_id_param: userId,
  });

  if (error) {
    throw new Error(error.message);
  }

  const camelizedData = data ? camelize(data) : null;
  return camelizedData;
};
