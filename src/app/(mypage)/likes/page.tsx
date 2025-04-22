import { fetchGetAllLikesByUserId } from '@/lib/apis/like/get-like.api';
import LikesList from './components/likes-list';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';

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
    <div className="flex w-full flex-col gap-5">
      <LikesList likes={likes} />
    </div>
  );
};

export default LikesPage;
