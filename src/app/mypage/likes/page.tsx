import PlanCard from '@/components/features/plan/plan-card';
import { fetchGetCurrentUser } from '@/lib/apis/auth-server.api';
import { fetchGetAllLikesByUserId } from '@/lib/apis/like/get-like.api';

const LikesPage = async () => {
  const { user } = await fetchGetCurrentUser();
  const userId = user?.id;

  // 로그인되어있지 않을 경우 리턴
  if (!userId) return;

  const likes = await fetchGetAllLikesByUserId(userId);

  if (!likes) throw new Error('좋아요 목록 로드 중 에러가 발생했습니다.');

  console.log('likes ➡️', likes);

  return (
    <>
      {likes?.length === 0 ? (
        <div>아직 좋아요한 일정이 없습니다.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {likes.map((plan) => (
            <PlanCard plan={plan} />
          ))}
        </div>
      )}
    </>
  );
};

export default LikesPage;
