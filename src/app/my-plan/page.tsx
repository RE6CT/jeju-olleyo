'use client';

import { useEffect, useState } from 'react';
import PlanCard from '@/components/features/plan/plan-card';
import { Plan } from '@/types/plan.type';

const MyPlanPage = () => {
  const [plans, setPlans] = useState<Plan[]>([]);

  // TODO: API 연동 후 실제 데이터로 교체
  useEffect(() => {
    // 임시 데이터
    const mockPlans: Plan[] = [
      {
        planId: 1,
        title: '제주도 여행 계획',
        description: '제주도에서의 3박 4일 여행 계획입니다.',
        travelStartDate: '2024-03-01',
        travelEndDate: '2024-03-04',
        planImg: null,
        createdAt: new Date().toISOString(),
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
        createdAt: new Date().toISOString(),
        public: false,
        publicAt: null,
        userId: 'temp-user-id',
      },
    ];
    setPlans(mockPlans);
  }, []);

  const handleEdit = (planId: number) => {
    console.log('수정할 계획 ID:', planId);
    // TODO: 수정 페이지로 이동
  };

  const handleDelete = (planId: number) => {
    console.log('삭제할 계획 ID:', planId);
    // TODO: 삭제 API 호출
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">나의 여행 계획</h1>

      {plans.length === 0 ? (
        <div className="flex h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-foreground/30">
          <p className="text-lg text-foreground">여행 계획이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {plans.map((plan) => (
            <PlanCard
              key={plan.planId}
              plan={plan}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPlanPage;
