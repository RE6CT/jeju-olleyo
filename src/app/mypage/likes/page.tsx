import PlanCard from '@/components/features/plan/plan-card';
import { fetchGetCurrentUser } from '@/lib/apis/auth-server.api';
import { Plan } from '@/types/plan.type';

const LikesPage = async () => {
  const { user } = await fetchGetCurrentUser();
  const userId = user?.id;

  // 로그인되어있지 않을 경우 리턴
  if (!userId) return;

  // TODO: 실제 좋아요 목록 fetch 함수 호출

  const likes: Plan[] = [
    {
      createdAt: '2025-04-08',
      description: '정말 재밌는 제주 여행이었습니다',
      planId: 1,
      planImg: null,
      public: false,
      publicAt: null,
      title: '특별한 일주일',
      travelEndDate: '2025-02-05',
      travelStartDate: '2025-02-12',
      userId: 'abcd-efgh',
    },
    {
      createdAt: '2025-04-08',
      description: '첫 번째 여행',
      planId: 1,
      planImg: null,
      public: false,
      publicAt: null,
      title: '두근두근',
      travelEndDate: '2025-02-05',
      travelStartDate: '2025-02-12',
      userId: 'abcd-efgh',
    },
  ];

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
