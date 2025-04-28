import { fetchGetAllLikesByUserId } from '@/lib/apis/like/get-like.api';
import LikesList from './components/_client/likes-list';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import MypageDataCounts from '../_components/_client/mypage-data-counts';
import { Suspense } from 'react';
import Loading from '@/app/loading';
import MypageActivitiesDropdown from '../_components/_client/mypage-activities-dropdown';

export const metadata = {
  title: '마이페이지 - 내가 좋아요한 일정',
};

const PAGE_SIZE = 4;

const LikesPage = async ({
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

  const likes = await fetchGetAllLikesByUserId(userId, currentPage, PAGE_SIZE);

  if (!likes)
    throw new Error(
      '내가 좋아요한 일정 목록을 가져오는 도중 에러가 발생했습니다.',
    );

  return (
    <div className="flex w-full flex-col gap-4 md:gap-5">
      <Suspense fallback={<Loading />}>
        <MypageActivitiesDropdown pageType="likes" />
        <section className="hidden flex-col md:flex md:gap-2 lg:gap-4">
          <MypageDataCounts pageType="likes" />
          <h2 className="md:bold-24 lg:semibold-28 w-full">
            내가 좋아요한 일정
          </h2>
        </section>
        <LikesList likes={likes} />
      </Suspense>
    </div>
  );
};

export default LikesPage;
