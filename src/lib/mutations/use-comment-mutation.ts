import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CommentType } from '@/types/comment.type';
import { fetchUpdateCommentsByCommentId } from '../apis/comments/client-comments.api';

/**
 * 댓글 내용 업데이트 뮤테이션 훅
 */
export const useCommentMutation = () => {
  const queryClient = useQueryClient();

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
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });
};
