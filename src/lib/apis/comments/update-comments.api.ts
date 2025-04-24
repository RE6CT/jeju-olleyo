import { getBrowserClient } from '@/lib/supabase/client';

/**
 * 댓글 내용을 바꾸는 함수
 * @param commentId - 댓글 id
 * @param content - 수정한 새로운 내용
 */
export const fetchUpdateCommentsByCommentId = async (
  commentId: number,
  content: string,
) => {
  const supabase = await getBrowserClient();

  const { error } = await supabase
    .from('plan_comments')
    .update({ content })
    .eq('plan_comment_id', commentId);

  if (error) throw new Error('댓글을 업데이트하는 도중 오류가 발생했습니다.');
};
