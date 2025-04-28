import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';

import MypageDataCounts from '../_components/_client/mypage-data-counts';
import { fetchAllCommentsByUserId } from '@/lib/apis/comments/server-comments.api';
import CommentsList from './_components/_client/comments-list';
import { Suspense } from 'react';
import Loading from '@/app/loading';
import MypageActivitiesDropdown from '../_components/_client/mypage-activities-dropdown';

export const metadata = {
  title: '마이페이지 - 내가 쓴 댓글',
};

const PAGE_SIZE = 5;

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
    <div className="flex w-full flex-col gap-4 md:gap-5">
      <Suspense fallback={<Loading />}>
        <MypageActivitiesDropdown pageType="comments" />
        <section className="hidden flex-col md:flex md:gap-2 lg:gap-4">
          <MypageDataCounts pageType="comments" />
          <h2 className="md:bold-24 lg:semibold-28 w-full">내가 쓴 댓글</h2>
        </section>
        <CommentsList comments={comments} pageSize={PAGE_SIZE} />
      </Suspense>
    </div>
  );
};

export default CommentsPage;
