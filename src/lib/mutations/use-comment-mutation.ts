import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CommentType } from '@/types/comment.type';
import {
  fetchAddComment,
  fetchDeleteCommentsByCommentId,
  fetchUpdateCommentsByCommentId,
} from '../apis/comments/client-comments.api';
import useCustomToast from '../hooks/use-custom-toast';

/**
 * 댓글 생성 뮤테이션 훅
 */
export const useAddComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      content,
      planId,
    }: {
      userId: string;
      content: string;
      planId: number;
    }) => fetchAddComment(userId, content, planId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};

/**
 * 댓글 내용 업데이트 뮤테이션 훅
 */
export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  const { successToast } = useCustomToast();

  return useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) => fetchUpdateCommentsByCommentId(commentId, content),
    onMutate: async ({ commentId, content }) => {
      await queryClient.cancelQueries({ queryKey: ['comments'] });

      const previousData = queryClient.getQueryData(['comments']);

      queryClient.setQueriesData(
        { queryKey: ['comments'], exact: false },
        (oldData: CommentType[]) => {
          return oldData.map((comment) => {
            if (comment.planCommentId === commentId) {
              return { ...comment, content };
            } else {
              return comment;
            }
          });
        },
      );

      return previousData;
    },
    onSuccess: () => {
      successToast('댓글이 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};

/**
 * 댓글 삭제 뮤테이션 훅
 */
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { successToast } = useCustomToast();

  return useMutation({
    mutationFn: (commentId: number) =>
      fetchDeleteCommentsByCommentId(commentId),
    onSuccess: () => {
      successToast('댓글이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};
