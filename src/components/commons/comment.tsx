import { CommentType } from '@/types/common.type';

/**
 * 댓글 컴포넌트
 * @param CommentType.nickname - 댓글 작성한 유저의 닉네임
 * @param CommentType.content - 댓글 내용
 * @param CommentType.created_at - 댓글 작성 시간
 */
const Comment = ({ nickname, content, created_at }: CommentType) => {
  return (
    <>
      {nickname}
      {content}
      {created_at.toLocaleString()}
      <button />
    </>
  );
};

export default Comment;
