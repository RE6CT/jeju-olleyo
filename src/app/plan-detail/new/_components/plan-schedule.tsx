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
  'flex items-center justify-center gap-[10px] rounded-[28px] border px-5 py-2 text-14 font-medium transition-colors';
const ACTIVE_TAB_STYLE =
  'border-primary-500 bg-primary-100 text-primary-500 hover:bg-primary-100 hover:text-primary-500';
const INACTIVE_TAB_STYLE =
  'border-[0.6px] border-gray-600 bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900';

const AddPlacePrompt = () => (
  <div className="mt-4 flex items-center gap-3">
    <div className="flex h-[24px] w-[24px] flex-col items-center justify-center gap-[10px] rounded-[12px] bg-primary-500 px-2 text-white">
      +
    </div>
    <span className="font-pretendard pointer-events-none flex w-full items-center rounded-lg bg-gray-50 px-4 py-3 text-12 font-medium leading-[150%] text-gray-400">
      검색을 통해 새로운 장소를 추가하세요
    </span>
  </div>
);

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
    <div className="my-6">
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
          className="rounded-full border-gray-200 px-4 py-2 text-14 font-medium"
        >
          +
        </Button>
      </div>

      {/* 일정 콘텐츠 영역 */}
      <div className="mt-8 flex gap-6">
        {/* 메인 콘텐츠 */}
        <div className="flex-1">
          {startDate && endDate ? (
            activeTab === '전체보기' ? (
              // 전체보기 탭에서는 모든 날짜의 일정을 보여줌
              <div className="flex flex-col gap-6">
                {Array.from({ length: dayCount }, (_, i) => i + 1).map(
                  (day) => (
                    <div key={day}>
                      <div className="mb-4 flex items-center justify-between pb-4">
                        <div className="flex items-center gap-3">
                          <span className="font-pretendard text-16 font-medium leading-[150%] text-[#182126]">
                            DAY {day}
                          </span>
                          <span className="font-pretendard flex items-center text-12 font-normal leading-[150%] text-[#182126]">
                            {formatDayDate(startDate, day)}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Button className="font-pretendard px-3 py-1 text-xs font-medium leading-[150%] text-gray-500 hover:text-gray-900">
                            복사
                          </Button>
                          <Button className="font-pretendard px-3 py-1 text-xs font-medium leading-[150%] text-red hover:text-red">
                            삭제
                          </Button>
                        </div>
                      </div>
                      {/* 여기에 장소 카드 컴포넌트들이 들어간다. */}
                      <AddPlacePrompt />
                    </div>
                  ),
                )}
              </div>
            ) : (
              // 특정 일자 탭에서는 해당 일자의 일정만 보여줌
              <div>
                <div className="mb-4 flex items-center justify-between pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-18 font-bold text-gray-900">
                      DAY {activeTab}
                    </span>
                    <span className="text-14 text-gray-600">
                      {formatDayDate(startDate, activeTab as number)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-14 font-medium text-gray-600 hover:text-gray-900 hover:underline">
                      복사
                    </button>
                    <button className="text-14 font-medium text-red hover:text-red/80">
                      삭제
                    </button>
                  </div>
                </div>
                {/* 여기에 장소 카드 컴포넌트들이 들어갈 예정 */}
                <AddPlacePrompt />
              </div>
            )
          ) : (
            <div className="flex items-center justify-center rounded-[12px] border border-dashed border-gray-200 py-4 text-14 text-gray-300">
              여행 기간을 선택해 주세요
            </div>
          )}
        </div>

        {/* 사이드바 영역 */}
        <div className="flex w-[320px] flex-col gap-6">
          {/* 북마크한 장소 */}
          <div className="rounded-[12px] border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <span className="text-14 font-bold text-gray-900">
                내가 북마크한 장소
              </span>
              <Button
                variant="ghost"
                className="h-auto p-0 text-14 font-medium text-gray-600 hover:bg-transparent hover:text-gray-900"
              >
                더보기
              </Button>
            </div>
            <div className="mt-4 flex items-center justify-center rounded-[8px] border border-dashed border-gray-200 py-4 text-14 text-gray-300">
              장소를 검색해 주세요
            </div>
          </div>

          {/* 추천 장소 */}
          <div className="rounded-[12px] border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <span className="text-14 font-bold text-gray-900">
                이런 장소는 어떠세요?
              </span>
              <Button
                variant="ghost"
                className="h-auto p-0 text-14 font-medium text-gray-600 hover:bg-transparent hover:text-gray-900"
              >
                더보기
              </Button>
            </div>
            <div className="mt-4 flex items-center justify-center rounded-[8px] border border-dashed border-gray-200 py-4 text-14 text-gray-300">
              장소를 검색해 주세요
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanSchedule;
