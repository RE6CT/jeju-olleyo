'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { calculateTotalDays, formatDayDate } from '@/lib/utils/date';
import PlaceSidemenu from './place-sidemenu';
import PlaceCard from './place-card';
import { Place } from '@/types/search.type';
import { DayPlaces, TabType } from '@/types/plan-detail.type';
import { DragDropContext } from 'react-beautiful-dnd';
import ScheduleDeleteModal from './schedule-delete-modal';

const BASE_TAB_STYLE =
  'flex items-center justify-center gap-[10px] rounded-[28px] border px-5 py-2 text-14 font-medium transition-colors';
const ACTIVE_TAB_STYLE =
  'border-primary-500 bg-primary-100 text-primary-500 hover:bg-primary-100 hover:text-primary-500';
const INACTIVE_TAB_STYLE =
  'border-[0.6px] border-gray-600 bg-white text-gray-900 hover:bg-gray-100 hover:text-gray-900';
const DROPDOWN_BUTTON_STYLE = 'flex items-center gap-2 text-14 font-medium';
const DROPDOWN_CONTENT_STYLE =
  'p-0 border border-[#E7EDF0] bg-[#F9FAFB] rounded-[12px] w-[140px] [&>*:hover]:bg-primary-100 [&>*:hover]:text-primary-500';
const DROPDOWN_ITEM_STYLE =
  'flex justify-center items-center px-5 py-2.5 text-14 font-medium cursor-pointer w-full transition-colors data-[highlighted]:bg-primary-100 data-[highlighted]:text-primary-500';

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
  const [placeCount, setPlaceCount] = useState(0); // 장소 추가 시 고유 아이디 부여 시 사용
  const [copiedDay, setCopiedDay] = useState<number | null>(null); // 복사 시 복사된 일자 저장
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dayToDelete, setDayToDelete] = useState<number | null>(null);

  /**
   * 장소 추가 핸들러
   * @param newPlace 추가할 장소 데이터
   * @example
   * handleAddPlace({
   *   id: 1,
   *   title: '장소 제목',...
   * })
   */
  const handleAddPlace = (newPlace: Place) => {
    if (activeTab === '전체보기') return;

    setDayPlaces((prev: DayPlaces) => {
      const dayNumber = activeTab as number;
      const currentDayPlaces = prev[dayNumber] || [];
      const uniqueId = `${newPlace.id}-${placeCount}`;

      return {
        ...prev,
        [dayNumber]: [...currentDayPlaces, { ...newPlace, uniqueId }],
      };
    });
    setPlaceCount((prev) => prev + 1);
  };

  /**
   * 장소 삭제 핸들러
   * @param dayNumber 일자
   * @param placeIndex 장소 인덱스
   * @example
   * handleDeletePlace(1, 0)
   * 1일차 장소 중 첫 번째 장소를 삭제
   */
  const handleDeletePlace = (dayNumber: number, placeIndex: number) => {
    setDayPlaces((prev: DayPlaces) => {
      const currentDayPlaces = [...(prev[dayNumber] || [])];
      currentDayPlaces.splice(placeIndex, 1);

      return {
        ...prev,
        [dayNumber]: currentDayPlaces,
      };
    });
  };

  /**
   * 특정 일자의 모든 장소를 삭제하는 핸들러
   * @param dayNumber 삭제할 일자
   */
  const handleDeleteDayPlaces = (dayNumber: number) => {
    setDayToDelete(dayNumber);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (dayToDelete !== null) {
      setDayPlaces((prev: DayPlaces) => {
        const newDayPlaces = { ...prev };
        delete newDayPlaces[dayToDelete];
        return newDayPlaces;
      });
    }
    setIsDeleteModalOpen(false);
    setDayToDelete(null);
  };

  /**
   * 드래그 앤 드랍 핸들러
   * @param result 드래그 앤 드랍 결과
   * @example
   * handleDragEnd({
   *   source: {
   *     droppableId: '1',
   *     index: 0,
   *   },
   *   destination: {
   *     droppableId: '2',
   *     index: 1,
   *   },
   * })
   */
  const handleDragEnd = (result: any) => {
    if (!result.destination) return; // 드래그 종료가 제대로 되지 않았다면 종료

    const { source, destination } = result; // {droppableId: string, index: number} 형태의 객체 두 개

    // 같은 날짜 내에서 이동
    if (source.droppableId === destination.droppableId) {
      setDayPlaces((prev: DayPlaces) => {
        const dayNumber = parseInt(source.droppableId);
        const places = [...(prev[dayNumber] || [])];
        const [removed] = places.splice(source.index, 1); // 원본 배열에서 제거
        places.splice(destination.index, 0, removed); // 새로운 위치에 추가

        return {
          ...prev,
          [dayNumber]: places,
        };
      });
    }

    // 다른 날짜로 이동
    else {
      setDayPlaces((prev: DayPlaces) => {
        const sourceDay = parseInt(source.droppableId);
        const destDay = parseInt(destination.droppableId);
        const sourcePlaces = [...(prev[sourceDay] || [])];
        const destPlaces = [...(prev[destDay] || [])];
        const [removed] = sourcePlaces.splice(source.index, 1); // 원본 배열에서 제거
        destPlaces.splice(destination.index, 0, removed); // 새로운 위치에 추가

        return {
          ...prev,
          [sourceDay]: sourcePlaces,
          [destDay]: destPlaces,
        };
      });
    }
  };

  /**
   * 일정 리스트 콘텐츠 렌더링
   * @param day 일자
   * @example
   * renderPlaces(1)
   * 1일차 일정 리스트 렌더링
   */
  const renderPlaces = (day: number) => {
    const places = dayPlaces[day] || [];
    if (places.length === 0) return null;

    return places.map((place: Place & { uniqueId: string }, index: number) => (
      <div
        key={place.uniqueId}
        draggable
        onDragStart={(e) => {
          e.dataTransfer.setData(
            'text/plain',
            JSON.stringify({
              day,
              index,
              placeId: place.uniqueId,
            }),
          );
        }}
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.style.opacity = '0.5';
        }}
        onDragLeave={(e) => {
          e.currentTarget.style.opacity = '1';
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.style.opacity = '1';
          const data = JSON.parse(e.dataTransfer.getData('text/plain'));
          if (data.placeId !== place.uniqueId) {
            handleDragEnd({
              source: {
                droppableId: data.day.toString(),
                index: data.index,
              },
              destination: {
                droppableId: day.toString(),
                index,
              },
            });
          }
        }}
        className="cursor-move transition-opacity duration-200"
      >
        <PlaceCard
          index={index + 1}
          dayNumber={day}
          category={place.category}
          title={place.title}
          address={place.address}
          imageUrl={place.image || undefined}
          isLastItem={index === places.length - 1}
          onDelete={() => handleDeletePlace(day, index)}
        />
      </div>
    ));
  };

  /**
   * 특정 일자의 장소들을 복사하는 핸들러
   * @param dayNumber 복사할 일자
   */
  const handleCopyDayPlaces = (dayNumber: number) => {
    setCopiedDay(dayNumber);
  };

  /**
   * 복사된 장소들을 붙여넣는 핸들러
   * @param targetDay 붙여넣을 일자
   */
  const handlePasteDayPlaces = (targetDay: number) => {
    if (copiedDay === null) return;

    setDayPlaces((prev: DayPlaces) => {
      const copiedPlaces = [...(prev[copiedDay] || [])];
      const newPlaces = copiedPlaces.map((place) => ({
        ...place,
        uniqueId: `${place.id}-${placeCount + copiedPlaces.indexOf(place)}`,
      }));

      return {
        ...prev,
        [targetDay]: [...(prev[targetDay] || []), ...newPlaces],
      };
    });

    setPlaceCount((prev) => prev + (dayPlaces[copiedDay]?.length || 0));
    setCopiedDay(null);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="my-6">
        {/* 탭 네비게이션 */}
        <div className="sticky top-[370px] z-10">
          {/* 탭 네비게이션 마스킹 영역 */}
          <div className="absolute -top-[370px] left-0 right-0 h-[370px] bg-white" />
          <div className="bg-white py-4">
            <div className="flex gap-2">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex w-[140px] items-center justify-center gap-2 rounded-[12px] border border-[#E7EDF0] bg-[#F9FAFB] px-5 py-2.5 text-14 font-medium"
                  >
                    {activeTab === '전체보기' ? '전체보기' : `DAY ${activeTab}`}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className={DROPDOWN_CONTENT_STYLE}
                  sideOffset={4}
                >
                  <DropdownMenuItem
                    onClick={() => setActiveTab('전체보기')}
                    className={cn(
                      DROPDOWN_ITEM_STYLE,
                      activeTab === '전체보기' &&
                        'bg-primary-100 text-primary-500',
                    )}
                  >
                    전체보기
                  </DropdownMenuItem>
                  {Array.from({ length: dayCount }, (_, i) => i + 1).map(
                    (day) => (
                      <DropdownMenuItem
                        key={day}
                        onClick={() => setActiveTab(day)}
                        className={cn(
                          DROPDOWN_ITEM_STYLE,
                          activeTab === day &&
                            'bg-primary-100 text-primary-500',
                        )}
                      >
                        DAY {day}
                      </DropdownMenuItem>
                    ),
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
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
                          <div className="flex items-center gap-2">
                            <span className="text-18 font-bold text-gray-900">
                              DAY {day}
                            </span>
                            <span className="text-14 text-gray-600">
                              {formatDayDate(startDate, day)}
                            </span>
                          </div>
                          <div className="flex items-center gap-4">
                            {copiedDay !== null && copiedDay !== day ? (
                              <Button
                                variant="ghost"
                                className="text-12 font-medium text-gray-500 hover:text-gray-900"
                                onClick={() => handlePasteDayPlaces(day)}
                              >
                                붙여넣기
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                className={cn(
                                  'text-12 font-medium',
                                  copiedDay === day
                                    ? 'cursor-not-allowed text-gray-400'
                                    : 'text-gray-500 hover:text-gray-900',
                                )}
                                onClick={() => handleCopyDayPlaces(day)}
                                disabled={copiedDay === day}
                              >
                                {copiedDay === day ? '복사됨' : '복사'}
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              className={cn(
                                'text-12 font-medium',
                                !dayPlaces[day] || dayPlaces[day].length === 0
                                  ? 'cursor-not-allowed text-gray-400'
                                  : 'text-red hover:bg-transparent hover:text-red/80',
                              )}
                              onClick={() => handleDeleteDayPlaces(day)}
                              disabled={
                                !dayPlaces[day] || dayPlaces[day].length === 0
                              }
                            >
                              삭제
                            </Button>
                          </div>
                        </div>
                        <div className="flex flex-col gap-4">
                          {renderPlaces(day)}
                          <AddPlacePrompt dayNumber={day} />
                        </div>
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
                      {copiedDay !== null && copiedDay !== activeTab ? (
                        <Button
                          variant="ghost"
                          className="text-12 font-medium text-gray-500 hover:text-gray-900"
                          onClick={() =>
                            handlePasteDayPlaces(activeTab as number)
                          }
                        >
                          붙여넣기
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          className={cn(
                            'text-12 font-medium',
                            copiedDay === activeTab
                              ? 'cursor-not-allowed text-gray-400'
                              : 'text-gray-500 hover:text-gray-900',
                          )}
                          onClick={() =>
                            handleCopyDayPlaces(activeTab as number)
                          }
                          disabled={copiedDay === activeTab}
                        >
                          {copiedDay === activeTab ? '복사됨' : '복사'}
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        className={cn(
                          'text-12 font-medium',
                          !dayPlaces[activeTab as number] ||
                            dayPlaces[activeTab as number].length === 0
                            ? 'cursor-not-allowed text-gray-400'
                            : 'text-red hover:bg-transparent hover:text-red/80',
                        )}
                        onClick={() =>
                          handleDeleteDayPlaces(activeTab as number)
                        }
                        disabled={
                          !dayPlaces[activeTab as number] ||
                          dayPlaces[activeTab as number].length === 0
                        }
                      >
                        삭제
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    {renderPlaces(activeTab as number)}
                    <AddPlacePrompt dayNumber={activeTab as number} />
                  </div>
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
        <ScheduleDeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
          }}
          onDeleteClick={handleConfirmDelete}
        />
      </div>
    </DragDropContext>
  );
};

export default PlanSchedule;
