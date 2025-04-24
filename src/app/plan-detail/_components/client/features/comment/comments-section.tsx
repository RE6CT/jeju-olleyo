'use client';

import Comment from '@/app/plan-detail/_components/client/features/comment/comment';
import CommentInput from '@/app/plan-detail/_components/client/features/comment/comment-input';
import { Separator } from '@/components/ui/separator';
import { CommentType } from '@/types/comment.type';

/**
 * 댓글 입력창과 댓글 리스트를 포함하는 전체 댓글 섹션
 */
const CommentsSection = ({
  comments,
  planId,
}: {
  comments: CommentType[];
  planId: number;
}) => {
  return (
    <div className="flex flex-col gap-2 rounded-12 border border-gray-100 bg-gray-50 px-5 py-2">
      <h3 className="semibold-16 my-3">댓글 {comments?.length}</h3>
      <CommentInput planId={planId} />
      <ul>
        {comments?.map((comment, index) => (
          <>
            <Comment
              key={comment.planCommentId}
              planCommentId={comment.planCommentId}
              userId={comment.userId}
              nickname={comment.nickname}
              createdAt={comment.createdAt}
              content={comment.content}
            />
            {index < comments.length - 1 && (
              <Separator key={`separator-${index}`} className="my-1" />
            )}
          </>
        ))}
      </ul>
    </div>
  );
};

export default CommentsSection;
