'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { calculateTotalDays } from '@/lib/utils/date';

type TabType = '전체보기' | number;

// #F60 색상이 --primary-500이 될 예정
// #FFE0CC 색상이 --Primary-100이 될 예정
// #537384 색상이 --Gray-600이 될 예정
// #182126 색상이 --Gray-900이 될 예정
// #E7EDF0 색상이 --Gray-100이 될 예정
const BASE_TAB_STYLE =
  'flex items-center justify-center gap-[10px] rounded-[28px] border px-5 py-2 text-sm font-medium transition-colors';
const ACTIVE_TAB_STYLE =
  'border-[#F60] bg-[#FFE0CC] text-[#F60] hover:bg-[#FFE0CC] hover:text-[#F60]';
const INACTIVE_TAB_STYLE =
  'border-[0.6px] border-[#537384] bg-white text-[#182126] hover:bg-[#E7EDF0] hover:text-[#182126]';

const PlanSchedule = ({
  startDate,
  endDate,
}: {
  startDate: Date | null;
  endDate: Date | null;
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('전체보기');

  const dayCount = calculateTotalDays(startDate, endDate);

  return (
    <div className="mb-6 mt-4">
      {/* 탭 네비게이션 */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          className={cn(
            BASE_TAB_STYLE,
            activeTab === '전체보기' ? ACTIVE_TAB_STYLE : INACTIVE_TAB_STYLE,
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
              BASE_TAB_STYLE,
              activeTab === day ? ACTIVE_TAB_STYLE : INACTIVE_TAB_STYLE,
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
