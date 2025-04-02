import { CommentType } from '@/types/plan-detail.type';
import Comment from './comment';
import CommentInput from './comment-input';

/**
 * 댓글 입력창과 댓글 리스트를 포함하는 전체 댓글 섹션
 */
const CommentsSection = () => {
  const comments: CommentType[] = [
    {
      plan_comment_id: 12,
      user_id: '',
      nickname: '닉네임',
      content: '정말 멋진 명소였어요',
      created_at: new Date(),
    },
    {
      plan_comment_id: 12,
      user_id: 'fdsa',
      nickname: '닉네임',
      content: '정말 멋진 명소였어요',
      created_at: new Date(),
    },
    {
      plan_comment_id: 12,
      user_id: 'zxcv',
      nickname: '닉네임',
      content: '정말 멋진 명소였어요',
      created_at: new Date(),
    },
  ];

  return (
    <>
      <CommentInput />
      <ul>
        {comments.map((comment) => (
          <Comment key={comment.plan_comment_id} {...comment} />
        ))}
      </ul>
    </>
  );
};

export default CommentsSection;
