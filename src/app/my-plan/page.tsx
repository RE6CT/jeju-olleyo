'use client';

import { useEffect, useState } from 'react';
import PlanCard from '@/components/features/plan/plan-card';
import { Plan } from '@/types/plan.type';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Filter } from 'lucide-react';

const MyPlanPage = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [filter, setFilter] = useState<{
    type: 'title' | 'date' | 'public' | null;
    value: string;
  }>({ type: null, value: '' });
  const [isOpen, setIsOpen] = useState(false); // 호버 상태 관리

  const resetFilter = () => {
    setFilter({ type: null, value: '' });
  };

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
      <div className="mb-8 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">내 일정</h1>
          <Button>새 일정 만들기</Button>
        </div>
        <div className="flex items-center gap-2">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger
              asChild
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                필터
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-30 mt-[-4px] rounded-md border bg-popover p-1"
              align="start"
              sideOffset={5}
              onMouseEnter={() => setIsOpen(true)}
              onMouseLeave={() => setIsOpen(false)}
            >
              <div className="flex flex-col gap-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setFilter({ type: 'title', value: 'title' });
                    setIsOpen(false);
                  }}
                >
                  제목
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setFilter({ type: 'date', value: 'date' });
                    setIsOpen(false);
                  }}
                >
                  날짜
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    setFilter({ type: 'public', value: 'public' });
                    setIsOpen(false);
                  }}
                >
                  공개 상태
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          {filter.type && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilter}
              className="text-muted-foreground"
            >
              필터 초기화
            </Button>
          )}
        </div>
      </div>

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
