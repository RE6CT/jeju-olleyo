import PlanCard from '@/components/features/plan/plan-card';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import { fetchGetAllLikesByUserId } from '@/lib/apis/like/get-like.api';
import { Plan } from '@/types/plan.type';

const LikesPage = async () => {
  const { user } = await fetchGetCurrentUser();
  const userId = user?.id;

  // 로그인되어있지 않을 경우 리턴
  if (!userId) return;

  const likes: Plan[] | null = [];

  if (!likes) throw new Error('좋아요 목록 로드 중 에러가 발생했습니다.');

  return (
    <>
      <p>{likes?.length}개의 일정에 좋아요를 눌렀어요</p>
      <h2 className="text-2xl">내가 좋아요한 일정</h2>
      {likes?.length === 0 ? (
        <div>아직 좋아요한 일정이 없습니다.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {likes.map((plan) => (
            <PlanCard key={plan.planId} plan={plan} />
          ))}
        </div>
      )}
    </>
  );
};

export default LikesPage;
