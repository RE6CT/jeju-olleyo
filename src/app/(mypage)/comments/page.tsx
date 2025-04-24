import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';

import MypageDataCounts from '../_components/mypage-data-counts';
import CommentsList from './_components/comments-list';
import { fetchAllCommentsByUserId } from '@/lib/apis/comments/server-comments.api';

export const metadata = {
  title: '마이페이지 - 내가 쓴 댓글',
};

const PAGE_SIZE = 10;

const CommentsPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { user } = await fetchGetCurrentUser();
  const userId = user?.id;
  if (!userId) return null;

  const currentPage = parseInt(
    (Array.isArray(searchParams.page)
      ? searchParams.page[0]
      : searchParams.page) || '1',
  );

  const comments = await fetchAllCommentsByUserId(
    userId,
    currentPage,
    PAGE_SIZE,
  );

  if (!comments)
    throw new Error('내가 쓴 댓글 목록을 가져오는 도중 에러가 발생했습니다.');

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-4">
        <MypageDataCounts pageType="comments" />
        <h2 className="semibold-28 w-full">내가 쓴 댓글</h2>
        <CommentsList comments={comments} pageSize={PAGE_SIZE} />
      </div>
    </div>
  );
};

export default CommentsPage;
