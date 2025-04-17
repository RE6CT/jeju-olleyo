import PlanHorizontalCard from '@/components/features/card/plan-horizontal_card';
import { fetchGetCurrentUser } from '@/lib/apis/auth/auth-server.api';
import { fetchGetAllLikesByUserId } from '@/lib/apis/like/get-like.api';
import { Plan } from '@/types/plan.type';

const LikesPage = async () => {
  const { user } = await fetchGetCurrentUser();
  const userId = user?.id;

  if (!userId) return null;

  const likes: Plan[] | null = await fetchGetAllLikesByUserId(userId);

  if (!likes) throw new Error('좋아요 목록 로드 중 에러가 발생했습니다.');

  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-4">
        <p className="medium-16 text-secondary-300">
          {likes?.length}개의 일정에 좋아요를 눌렀어요
        </p>
        <h2 className="semibold-28 w-full">내가 좋아요한 일정</h2>
      </div>
      {likes?.length === 0 ? (
        <div>아직 좋아요한 일정이 없습니다.</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {likes.map((plan) => (
            <PlanHorizontalCard key={plan.planId} plan={plan} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikesPage;
