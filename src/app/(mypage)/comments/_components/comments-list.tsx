'use client';

import { MyCommentType } from '@/types/comment.type';
import MyComment from './my-comment';
import useAuth from '@/lib/hooks/use-auth';
import { useGetDataCount } from '@/lib/queries/use-get-data-count';
import Loading from '@/app/loading';

const CommentsList = ({ comments }: { comments: MyCommentType[] }) => {
  const { user, isLoading } = useAuth();
  const { data: countData, isLoading: isCountLoading } = useGetDataCount(
    user?.id,
  );

  if (isLoading || isCountLoading) return <Loading />;
  return (
    <>
      {countData?.commentCount === 0 ? (
        <div>아직 작성한 댓글이 없습니다.</div>
      ) : (
        <div className="flex flex-col gap-5">
          {comments.map((comment) => (
            <MyComment key={comment.planId} comment={comment} />
          ))}
        </div>
      )}
    </>
  );
};

export default CommentsList;
