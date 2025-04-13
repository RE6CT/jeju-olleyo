import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import MyComment from './_components/my-comment';
import { fetchAllCommentsByUserId } from '@/lib/apis/comments/get-comments.api';

const CommentsPage = async () => {
  const { user } = await fetchGetCurrentUser();
  const userId = user?.id;

  if (!userId) return null;

  const comments = await fetchAllCommentsByUserId(userId);

  if (!comments)
    throw new Error('내가 쓴 댓글 목록을 가져오는 도중 에러가 발생했습니다.');

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-4">
        <p className="medium-16 text-secondary-300">
          {comments.length}개의 댓글을 남겼어요
        </p>
        <h2 className="semibold-28 w-full">내가 쓴 댓글</h2>
        <ul className="flex flex-col gap-5">
          {comments.map((comment) => (
            <MyComment key={comment.planId} comment={comment} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommentsPage;
