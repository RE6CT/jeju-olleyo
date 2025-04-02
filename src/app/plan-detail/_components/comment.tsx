import { Button } from '@/components/ui/button';
import { CommentType } from '@/types/plan-detail.type';

/**
 * 댓글 컴포넌트
 * @param CommentType.nickname - 댓글 작성한 유저의 닉네임
 * @param CommentType.content - 댓글 내용
 * @param CommentType.created_at - 댓글 작성 시간
 */
const Comment = ({ user_id, nickname, content, created_at }: CommentType) => {
  const userId = ''; // 유저의 uuid 불러오는 로직 추후 추가

  return (
    <li>
      {nickname}
      {content}
      {created_at.toLocaleString()}
      {userId === user_id && (
        <>
          <Button>수정</Button>
          <Button>삭제</Button>
        </>
      )}
    </li>
  );
};

export default Comment;
