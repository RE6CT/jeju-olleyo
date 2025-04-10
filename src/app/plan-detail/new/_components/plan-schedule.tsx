'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type TabType = '전체보기' | number;

const PlanSchedule = ({
  startDate,
  endDate,
}: {
  startDate: Date | null;
  endDate: Date | null;
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('전체보기');

  // 여행 일수 계산
  const getDayCount = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = endDate.getTime() - startDate.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const dayCount = getDayCount();

  return (
    <div className="mb-6 mt-4">
      {/* 탭 네비게이션 */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          className={cn(
            'flex items-center justify-center gap-[10px] rounded-[28px] border px-5 py-2 text-sm font-medium transition-colors',
            activeTab === '전체보기'
              ? 'border-[#F60] bg-[#FFE0CC] text-[#F60] hover:bg-[#FFE0CC] hover:text-[#F60]'
              : 'border-[0.6px] border-[#537384] bg-white text-[#182126] hover:bg-[#E7EDF0] hover:text-[#182126]',
          )}
          onClick={() => setActiveTab('전체보기')}
        >
          전체보기
        </Button>
        {Array.from({ length: dayCount }, (_, i) => i + 1).map((day) => (
          <Button
            key={day}
            variant="outline"
            className={cn(
              'flex items-center justify-center gap-[10px] rounded-[28px] border px-5 py-2 text-sm font-medium transition-colors',
              activeTab === day
                ? 'border-[#F60] bg-[#FFE0CC] text-[#F60] hover:bg-[#FFE0CC] hover:text-[#F60]'
                : 'border-[0.6px] border-[#537384] bg-white text-[#182126] hover:bg-[#E7EDF0] hover:text-[#182126]',
            )}
            onClick={() => setActiveTab(day)}
          >
            DAY {day}
          </Button>
        ))}
        <Button
          variant="outline"
          className="rounded-full border-[#C7D5DC] px-4 py-2 text-sm font-medium"
        >
          +
        </Button>
      </div>

      {/* 일정 카드 리스트 영역 */}
      <div className="mt-4">
        {/* TODO: 일정 카드 컴포넌트 구현 필요 */}
        <div className="flex items-center justify-center rounded-[12px] border border-dashed border-[#C7D5DC] py-4 text-sm text-[#A7BDC8]">
          장소를 검색해 주세요
        </div>
      </div>
    </div>
  );
};

export default PlanSchedule;
