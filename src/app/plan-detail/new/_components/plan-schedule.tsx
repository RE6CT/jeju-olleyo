'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { calculateTotalDays, formatDayDate } from '@/lib/utils/date';

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

      {/* 일정 콘텐츠 영역 */}
      <div className="mt-4 flex gap-6">
        {/* 메인 콘텐츠 */}
        <div className="flex-1">
          {startDate && endDate ? (
            activeTab === '전체보기' ? (
              // 전체보기 탭에서는 모든 날짜의 일정을 보여줌
              <div className="flex flex-col gap-6">
                {Array.from({ length: dayCount }, (_, i) => i + 1).map(
                  (day) => (
                    <div key={day}>
                      <div className="mb-4 flex items-center justify-between border-b border-[#E7EDF0] pb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-[#182126]">
                            DAY {day}
                          </span>
                          <span className="text-sm text-[#537384]">
                            {formatDayDate(startDate, day)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-[#537384]">복사</span>
                          <span className="text-sm text-[#537384]">삭제</span>
                        </div>
                      </div>
                      {/* 여기에 장소 카드 컴포넌트들이 들어갈 예정 */}
                      <div className="flex items-center justify-center rounded-[12px] border border-dashed border-[#C7D5DC] py-4 text-sm text-[#A7BDC8]">
                        + 장소 추가하기
                      </div>
                    </div>
                  ),
                )}
              </div>
            ) : (
              // 특정 일자 탭에서는 해당 일자의 일정만 보여줌
              <div>
                <div className="mb-4 flex items-center justify-between border-b border-[#E7EDF0] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-[#182126]">
                      DAY {activeTab}
                    </span>
                    <span className="text-sm text-[#537384]">
                      {formatDayDate(startDate, activeTab as number)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#537384]">복사</span>
                    <span className="text-sm text-[#537384]">삭제</span>
                  </div>
                </div>
                {/* 여기에 장소 카드 컴포넌트들이 들어갈 예정 */}
                <div className="flex items-center justify-center rounded-[12px] border border-dashed border-[#C7D5DC] py-4 text-sm text-[#A7BDC8]">
                  + 장소 추가하기
                </div>
              </div>
            )
          ) : (
            <div className="flex items-center justify-center rounded-[12px] border border-dashed border-[#C7D5DC] py-4 text-sm text-[#A7BDC8]">
              여행 기간을 선택해 주세요
            </div>
          )}
        </div>

        {/* 사이드바 영역 */}
        <div className="flex w-[320px] flex-col gap-6">
          {/* 북마크한 장소 */}
          <div className="rounded-[12px] border border-[#C7D5DC] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#182126]">
                내가 북마크한 장소
              </span>
              <Button
                variant="ghost"
                className="h-auto p-0 text-sm font-medium text-[#537384] hover:bg-transparent hover:text-[#182126]"
              >
                더보기
              </Button>
            </div>
            <div className="mt-4 flex items-center justify-center rounded-[8px] border border-dashed border-[#C7D5DC] py-4 text-sm text-[#A7BDC8]">
              장소를 검색해 주세요
            </div>
          </div>

          {/* 추천 장소 */}
          <div className="rounded-[12px] border border-[#C7D5DC] p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#182126]">
                이런 장소는 어떠세요?
              </span>
              <Button
                variant="ghost"
                className="h-auto p-0 text-sm font-medium text-[#537384] hover:bg-transparent hover:text-[#182126]"
              >
                더보기
              </Button>
            </div>
            <div className="mt-4 flex items-center justify-center rounded-[8px] border border-dashed border-[#C7D5DC] py-4 text-sm text-[#A7BDC8]">
              장소를 검색해 주세요
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSchedule;
