import { getBrowserClient } from '@/lib/supabase/client';
import { camelize } from '@/lib/utils/camelize';
import { CommentType } from '@/types/comment.type';

/**
 * 일정의 댓글을 최신순으로 가져오는 함수
 * @param planId - 일정 id
 * @returns 해당 일정의 댓글 목록
 */
export const fetchfetchAllCommentsByPlanId = async (planId: number) => {
  const supabase = await getBrowserClient();

  const { data, error } = await supabase.rpc('get_comments', {
    plan_id_param: planId,
  });

  if (error) throw new Error(error.message);

  const camelizedData: CommentType[] | null = data ? camelize(data) : null;
  return camelizedData;
};
