import { getBrowserClient } from '@/lib/supabase/client';
import { getServerClient } from '@/lib/supabase/server';
import { camelize } from '@/lib/utils/camelize';
import { CommentType, MyCommentType } from '@/types/comment.type';

/**
 * 유저의 댓글 목록을 최신순으로 가져오는 함수
 * @param userId - 유저의 uuid
 * @returns 유저가 작성한 댓글 목록
 */
export const fetchAllCommentsByUserId = async (
  userId: string,
  page: number = 1,
  pageSize: number = 10,
): Promise<MyCommentType[] | null> => {
  const supabase = await getServerClient();

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize - 1;

  const { data, error } = await supabase
    .rpc('get_user_comments', { user_id_param: userId })
    .range(startIndex, endIndex);

  if (error) throw new Error(error.message);

  const camelizedData: MyCommentType[] | null = data ? camelize(data) : null;
  return camelizedData;
};
