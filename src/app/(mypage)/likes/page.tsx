import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import { fetchGetAllLikesByUserId } from '@/lib/apis/like/get-like.api';
import { Plan } from '@/types/plan.type';
import LikesList from './components/likes-list';

const LikesPage = async () => {
  const { user } = await fetchGetCurrentUser();
  const userId = user?.id;

  if (!userId) return null;

  const likes: Plan[] | null = await fetchGetAllLikesByUserId(userId);

  if (!likes) throw new Error('좋아요 목록 로드 중 에러가 발생했습니다.');

  return (
    <div className="flex w-full flex-col gap-5">
      <LikesList likes={likes} />
    </div>
  );
};

export default LikesPage;
