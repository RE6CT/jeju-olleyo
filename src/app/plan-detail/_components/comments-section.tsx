import { CommentType } from '@/types/plan-detail.type';
import Comment from './comment';
import CommentInput from './comment-input';

/**
 * 댓글 입력창과 댓글 리스트를 포함하는 전체 댓글 섹션
 */
const CommentsSection = ({ comments }: { comments: CommentType[] }) => {
  return (
    <>
      <CommentInput />
      <ul>
        {comments.map((comment) => (
          <Comment key={comment.planCommentId} {...comment} />
        ))}
      </ul>
    </>
  );
};

export default CommentsSection;
