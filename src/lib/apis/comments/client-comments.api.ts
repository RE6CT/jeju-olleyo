'use server';

import { PATH } from '@/constants/path.constants';
import { getServerClient } from '@/lib/supabase/server';
import { camelize } from '@/lib/utils/camelize';
import { CommentType } from '@/types/comment.type';
import { revalidatePath } from 'next/cache';

/**
 * 일정의 댓글을 최신순으로 가져오는 함수
 * @param planId - 일정 id
 * @returns 해당 일정의 댓글 목록
 */
export const fetchAllCommentsByPlanId = async (planId: number) => {
  const supabase = await getServerClient();

  const { data, error } = await supabase.rpc('get_comments', {
    plan_id_param: planId,
  });

  if (error) throw new Error(error.message);

  const camelizedData: CommentType[] | null = data ? camelize(data) : null;
  return camelizedData;
};

/**
 * 댓글을 생성하는 함수
 * @param userId - 유저의 uuid
 * @param content - 댓글 내용
 * @param planId - 일정의 id
 */
export const fetchAddComment = async (
  userId: string,
  content: string,
  planId: number,
) => {
  const supabase = await getServerClient();

  const { error } = await supabase
    .from('plan_comments')
    .insert({ user_id: userId, plan_id: planId, content });

  if (error) throw new Error('댓글을 등록하는 도중 오류가 발생했습니다.');

  revalidatePath(PATH.COMMENTS);
};

/**
 * 댓글 내용을 바꾸는 함수
 * @param commentId - 댓글 id
 * @param content - 수정한 새로운 내용
 */
export const fetchUpdateCommentsByCommentId = async (
  commentId: number,
  content: string,
) => {
  const supabase = await getServerClient();

  const { error } = await supabase
    .from('plan_comments')
    .update({ content })
    .eq('plan_comment_id', commentId);

  if (error) throw new Error('댓글을 업데이트하는 도중 오류가 발생했습니다.');

  revalidatePath(PATH.COMMENTS);
};

/**
 * 댓글을 삭제하는 함수
 * @param commentId - 댓글의 id
 */
export const fetchDeleteCommentsByCommentId = async (commentId: number) => {
  const supabase = await getServerClient();

  const { error } = await supabase
    .from('plan_comments')
    .delete()
    .eq('plan_comment_id', commentId);

  if (error) throw new Error('댓글을 삭제하는 도중 오류가 발생했습니다.');

  revalidatePath(PATH.COMMENTS);
};
