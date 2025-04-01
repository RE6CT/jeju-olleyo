import { CommentType } from '@/types/common.type';

type CommentProps = {
  nickname: string; // 추후 User['nickname']으로 변경
  content: string;
  created_at: CommentType['created_at'];
};

/**
 * 댓글 컴포넌트
 * @param CommentProps.nickname - 댓글 작성한 유저의 닉네임
 * @param CommentProps.content - 댓글 내용
 * @param CommentProps.created_at - 댓글 작성 시간
 */
const Comment = ({ nickname, content, created_at }: CommentProps) => {
  return (
    <>
      <div>Comment</div>
    </>
  );
};

export default Comment;
