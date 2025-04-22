'use client';

import { MyCommentType } from '@/types/comment.type';
import MyComment from './my-comment';
import useAuth from '@/lib/hooks/use-auth';
import { useGetDataCount } from '@/lib/queries/use-get-data-count';
import Loading from '@/app/loading';
import MypagePagination from '../../_components/mypage-pagination';

/**
 * 댓글 리스트 컴포넌트
 * @param comments - 댓글 목록
 * @param pageSize - 한 페이지에 담을 데이터 수
 */
const CommentsList = ({
  comments,
  pageSize,
}: {
  comments: MyCommentType[];
  pageSize: number;
}) => {
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
        <div className="flex flex-col gap-20">
          <div className="flex flex-col gap-5">
            {comments.map((comment) => (
              <MyComment key={comment.planId} comment={comment} />
            ))}
          </div>

          <MypagePagination pageType="comments" pageSize={pageSize} />
        </div>
      )}
    </>
  );
};

export default CommentsList;
