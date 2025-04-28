'use client';

import { MyCommentType } from '@/types/comment.type';
import MyComment from './my-comment';
import useAuth from '@/lib/hooks/use-auth';
import { useGetDataCount } from '@/lib/queries/use-get-data-count';
import EmptyResult from '@/components/commons/empty-result-link';
import { PATH } from '@/constants/path.constants';
import MypagePagination from '@/app/(mypage)/_components/_client/mypage-pagination';

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
  const { user } = useAuth();
  const { data: countData } = useGetDataCount(user?.id);

  return (
    <>
      {countData?.commentCount === 0 ? (
        <div role="region" aria-label="댓글 없음">
          <EmptyResult
            buttonText="인기 일정 보러가기"
            href={PATH.COMMUNITY}
            imagePath="/empty-result/empty_comments.png"
          />
        </div>
      ) : (
        <section className="flex flex-col gap-20">
          <ul className="flex list-none flex-col gap-2 p-0 md:gap-5">
            {comments.map((comment) => (
              <li key={comment.planId}>
                <MyComment comment={comment} />
              </li>
            ))}
          </ul>

          <nav aria-label="페이지 탐색">
            <MypagePagination pageType="comments" pageSize={pageSize} />
          </nav>
        </section>
      )}
    </>
  );
};

export default CommentsList;
