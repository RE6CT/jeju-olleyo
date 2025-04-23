'use client';

import { MyCommentType } from '@/types/comment.type';
import MyComment from './my-comment';
import useAuth from '@/lib/hooks/use-auth';
import { useGetDataCount } from '@/lib/queries/use-get-data-count';
import Loading from '@/app/loading';
import MypagePagination from '../../_components/mypage-pagination';
import EmptyResult from '@/components/commons/empty-result-link';
import { PATH } from '@/constants/path.constants';

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
        <EmptyResult
          buttonText="인기 일정 보러가기"
          href={PATH.COMMUNITY}
          imagePath="/empty-result/empty_comments.png"
        />
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
