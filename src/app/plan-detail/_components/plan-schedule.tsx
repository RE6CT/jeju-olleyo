'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { calculateTotalDays, formatDayDate } from '@/lib/utils/date';
import PlaceSidemenu from './place-sidemenu';
import PlaceCard from './place-card';
import { Place } from '@/types/search.type';
import { DayPlaces, TabType } from '@/types/plan-detail.type';

const BASE_TAB_STYLE =
  'flex items-center justify-center gap-[10px] rounded-[28px] border px-5 py-2 text-14 font-medium transition-colors';
const ACTIVE_TAB_STYLE =
  'border-primary-500 bg-primary-100 text-primary-500 hover:bg-primary-100 hover:text-primary-500';
const INACTIVE_TAB_STYLE =
  'border-[0.6px] border-gray-600 bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900';

const COLORS = {
  ODD: 'bg-primary-500',
  EVEN: 'bg-secondary-300',
} as const;

const AddPlacePrompt = ({ dayNumber }: { dayNumber: number }) => {
  const dayColor = dayNumber % 2 === 1 ? COLORS.ODD : COLORS.EVEN;

  return (
    <div className="mt-4 flex items-center gap-3">
      <div
        className={`flex h-[24px] w-[24px] flex-col items-center justify-center gap-[10px] rounded-[12px] ${dayColor} px-2 text-white`}
      >
        +
      </div>
      <span className="pointer-events-none flex w-full items-center rounded-lg bg-gray-50 px-4 py-3 text-12 font-medium text-gray-400">
        검색을 통해 새로운 장소를 추가하세요
      </span>
    </div>
  );
};

const PlanSchedule = ({
  startDate,
  endDate,
  userId,
}: {
  startDate: Date | null;
  endDate: Date | null;
  userId: string;
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('전체보기');
  const dayCount = calculateTotalDays(startDate, endDate);
  const [dayPlaces, setDayPlaces] = useState<DayPlaces>({});

  const handleAddPlace = (newPlace: Place) => {
    if (activeTab === '전체보기') return;

    setDayPlaces((prev: DayPlaces) => {
      const dayNumber = activeTab as number;
      const currentDayPlaces = prev[dayNumber] || [];

      return {
        ...prev,
        [dayNumber]: [...currentDayPlaces, newPlace],
      };
    });
  };

  /**
   * 일정 리스트 콘텐츠 렌더링
   */
  const renderPlaces = (day: number) => {
    const places = dayPlaces[day] || [];
    if (places.length === 0) return <AddPlacePrompt dayNumber={day} />;

    return (
      <div className="flex flex-col gap-4">
        {places.map((place: Place, index: number) => (
          <PlaceCard
            key={place.id}
            index={index + 1}
            dayNumber={day}
            category={place.category}
            title={place.title}
            address={place.address}
            imageUrl={place.image || undefined}
            isLastItem={index === places.length - 1}
          />
        ))}
        <AddPlacePrompt dayNumber={day} />
      </div>
    );
  };

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
        {/* 원하는 개수만큼 반복해서 컴포넌트 렌더링 */}
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
                          <span className="text-16 font-medium text-[#182126]">
                            DAY {day}
                          </span>
                          <span className="flex items-center text-12 font-normal text-[#182126]">
                            {formatDayDate(startDate, day)}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Button
                            variant="ghost"
                            className="text-12 font-medium text-gray-500 hover:bg-transparent hover:text-[#698EA1]"
                          >
                            복사
                          </Button>
                          <Button
                            variant="ghost"
                            className="text-12 font-medium text-red hover:bg-transparent hover:text-red"
                          >
                            삭제
                          </Button>
                        </div>
                      </div>
                      {renderPlaces(day)}
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
                    <Button
                      variant="ghost"
                      className="text-12 font-medium text-gray-600 hover:bg-transparent hover:text-gray-900"
                    >
                      복사
                    </Button>
                    <Button
                      variant="ghost"
                      className="text-12 font-medium text-red hover:bg-transparent hover:text-red/80"
                    >
                      삭제
                    </Button>
                  </div>
                </div>
                {renderPlaces(activeTab as number)}
              </div>
            )
          ) : (
            <div className="flex items-center justify-center rounded-[12px] border border-dashed border-gray-200 py-4 text-14 text-gray-300">
              여행 기간을 선택해 주세요
            </div>
          )}
        </div>

        {/* 사이드바 영역 */}
        <PlaceSidemenu
          userId={userId}
          selectedDay={activeTab === '전체보기' ? null : activeTab}
          onAddPlace={handleAddPlace}
        />
      </div>
    </div>
  );
};

export default PlanSchedule;
