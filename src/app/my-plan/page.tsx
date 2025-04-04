'use client';

import { Plan } from '@/types/plan.type';

const MyPlanPage = () => {
  return (
    <main className="container mx-auto py-8">
      <div className="space-y-8">
        {/* 헤더 영역 - 추후 구현 */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">내 일정</h1>
        </div>

        {/* 일정 목록 영역 - 추후 구현 */}
        <div className="space-y-6">{/* 일정 카드들이 들어갈 자리 */}</div>
      </div>
    </main>
  );
};

export default MyPlanPage;
