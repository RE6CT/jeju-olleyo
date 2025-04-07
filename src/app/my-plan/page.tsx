import { Plan } from '@/types/plan.type';
import { Button } from '@/components/ui/button';
import PlanFilterSection from './_components/plan-filter-section';
import dayjs from 'dayjs';

// 테스트 함수라 나중에 폴더 위치 분리 예정
async function fetchPlans(): Promise<Plan[]> {
  // TODO: API 연동 후 실제 데이터로 교체
  return [
    {
      planId: 1,
      title: '제주도 여행 계획',
      description: '제주도에서의 3박 4일 여행 계획입니다.',
      travelStartDate: '2024-03-01',
      travelEndDate: '2024-03-04',
      planImg: null,
      createdAt: dayjs().toISOString(),
      public: false,
      publicAt: null,
      userId: 'temp-user-id',
    },
    {
      planId: 2,
      title: '제주도 맛집 투어',
      description: '제주도의 유명 맛집들을 방문하는 계획입니다.',
      travelStartDate: '2024-04-01',
      travelEndDate: '2024-04-03',
      planImg: null,
      createdAt: dayjs().toISOString(),
      public: false,
      publicAt: null,
      userId: 'temp-user-id',
    },
  ];
}

const MyPlanPage = async () => {
  const plans = await fetchPlans();

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">내 일정</h1>
          <Button>새 일정 만들기</Button>
        </div>
        <PlanFilterSection initialPlans={plans} />
      </div>
    </div>
  );
};

export default MyPlanPage;
