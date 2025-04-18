'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { calculateTotalDays, formatDayDate } from '@/lib/utils/date';
import { DayPlaces, TabType } from '@/types/plan-detail.type';
import { Place } from '@/types/search.type';
import PlaceCard from './place-card';
import PlaceSidemenu from './place-sidemenu';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ScheduleDeleteModal from './schedule-delete-modal';
import ScheduleSaveModal from './schedule-save-modal';
import { fetchSavePlan, fetchSavePlanPlaces } from '@/lib/apis/plan/plan.api';
import ScheduleCreatedModal from './schedule-created-modal';
import { useToast } from '@/hooks/use-toast';

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
  planTitle,
  planDescription,
  planImage,
  dayPlaces,
  setDayPlaces,
  activeTab,
  setActiveTab,
  routeSummary,
  isReadOnly,
}: {
  startDate: Date | null;
  endDate: Date | null;
  userId: string;
  planTitle: string;
  planDescription: string;
  planImage: string;
  dayPlaces: DayPlaces;
  setDayPlaces: React.Dispatch<React.SetStateAction<DayPlaces>>;
  activeTab: TabType;
  setActiveTab: React.Dispatch<React.SetStateAction<TabType>>;
  routeSummary: {
    [key: number]: { distance: number; duration: number }[];
  };
  isReadOnly?: boolean;
}) => {
  const { toast } = useToast();
  const dayCount = calculateTotalDays(startDate, endDate);
  const [placeCount, setPlaceCount] = useState(0);
  const [copiedDay, setCopiedDay] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dayToDelete, setDayToDelete] = useState<number | null>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isPublicModalOpen, setIsPublicModalOpen] = useState(false);

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

    const dayNumber = activeTab as number;
    const uniqueId = `${newPlace.id}-${placeCount}`;
    const newPlaceWithId = { ...newPlace, uniqueId };

    setDayPlaces((prev: DayPlaces) => ({
      ...prev,
      [dayNumber]: [...(prev[dayNumber] || []), newPlaceWithId],
    }));
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
    if (!result.destination || isReadOnly) return; // 드래그 종료가 제대로 되지 않았거나 읽기 전용 모드라면 종료

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

    return (
      <Droppable droppableId={day.toString()}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col gap-4"
          >
            {places.map(
              (place: Place & { uniqueId: string }, index: number) => {
                const summary = routeSummary[day]?.[index];
                return (
                  <Draggable
                    key={place.uniqueId}
                    draggableId={place.uniqueId}
                    index={index}
                    isDragDisabled={isReadOnly}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <PlaceCard
                          index={index + 1}
                          dayNumber={day}
                          category={place.category}
                          title={place.title}
                          address={place.address}
                          distance={summary?.distance}
                          duration={summary?.duration}
                          imageUrl={place.image || ''}
                          isLastItem={index === places.length - 1}
                          onDelete={
                            !isReadOnly
                              ? () => handleRemovePlace(day, place.uniqueId)
                              : undefined
                          }
                          isReadOnly={isReadOnly}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              },
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    );
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

  const handleSaveButtonClick = () => {
    if (!planTitle) {
      toast({
        title: '일정 제목 누락',
        description: '일정 제목을 입력해주세요.',
        variant: 'destructive',
      });
      return;
    }

    if (!startDate || !endDate) {
      toast({
        title: '여행 기간 누락',
        description: '여행 기간을 선택해주세요.',
        variant: 'destructive',
      });
      return;
    }

    if (startDate > endDate) {
      toast({
        title: '여행 기간 오류',
        description: '여행 종료일은 시작일보다 이후여야 합니다.',
        variant: 'destructive',
      });
      return;
    }

    // 일정 일자 데이터가 없는 경우
    if (Object.keys(dayPlaces).length === 0) {
      toast({
        title: '일정 데이터 누락',
        description: '일정에 최소 하나 이상의 장소를 추가해주세요.',
        variant: 'destructive',
      });
      return;
    }

    setIsSaveModalOpen(false);
    setIsPublicModalOpen(true);
  };

  const handlePublicClick = async () => {
    try {
      if (!startDate || !endDate || !planTitle) {
        throw new Error('필수 정보가 누락되었습니다.');
      }

      // 일정을 공개로 설정하여 저장
      const planId = await fetchSavePlan({
        userId: userId,
        title: planTitle,
        description: planDescription,
        travelStartDate: startDate?.toISOString() || '',
        travelEndDate: endDate?.toISOString() || '',
        planImg: planImage || null,
        public: true,
      });

      // 일정 상세 장소 저장
      await fetchSavePlanPlaces(planId, dayPlaces);

      setIsPublicModalOpen(false);
      toast({
        title: '일정 저장 완료',
        description: '일정이 성공적으로 저장되었습니다.',
      });
    } catch (error) {
      console.error('일정 공개 설정 실패:', error);
      toast({
        title: '일정 저장 실패',
        description: '일정 공개 설정에 실패했습니다.',
        variant: 'destructive',
      });
    }
  };

  const handlePrivateClick = async () => {
    try {
      if (!startDate || !endDate || !planTitle) {
        throw new Error('필수 정보가 누락되었습니다.');
      }

      // 일정을 비공개로 설정하여 저장
      const planId = await fetchSavePlan({
        userId: userId,
        title: planTitle,
        description: planDescription,
        travelStartDate: startDate?.toISOString() || '',
        travelEndDate: endDate?.toISOString() || '',
        planImg: planImage || null,
        public: false,
      });

      // 일정 상세 장소 저장
      await fetchSavePlanPlaces(planId, dayPlaces);

      setIsPublicModalOpen(false);
      toast({
        title: '일정 저장 완료',
        description: '일정이 성공적으로 저장되었습니다.',
      });
    } catch (error) {
      console.error('일정 비공개 설정 실패:', error);
      toast({
        title: '일정 저장 실패',
        description: '일정 비공개 설정에 실패했습니다.',
        variant: 'destructive',
      });
    }
  };

  const handleRemovePlace = (day: number, uniqueId: string) => {
    if (isReadOnly) return;

    setDayPlaces((prev) => {
      const newDayPlaces = { ...prev };
      newDayPlaces[day] = newDayPlaces[day].filter(
        (place) => place.uniqueId !== uniqueId,
      );
      return newDayPlaces;
    });
  };

  return (
    <div className="relative min-h-screen pb-32">
      <DragDropContext
        onDragEnd={(result) => !isReadOnly && handleDragEnd(result)}
      >
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
                      {activeTab === '전체보기'
                        ? '전체보기'
                        : `DAY ${activeTab}`}
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
                            {!isReadOnly && (
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
                                    !dayPlaces[day] ||
                                      dayPlaces[day].length === 0
                                      ? 'cursor-not-allowed text-gray-400'
                                      : 'text-red hover:bg-transparent hover:text-red/80',
                                  )}
                                  onClick={() => handleDeleteDayPlaces(day)}
                                  disabled={
                                    !dayPlaces[day] ||
                                    dayPlaces[day].length === 0
                                  }
                                >
                                  삭제
                                </Button>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col gap-4">
                            {renderPlaces(day)}
                            {!isReadOnly && <AddPlacePrompt dayNumber={day} />}
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
                      {!isReadOnly && (
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
                      )}
                    </div>
                    <div className="flex flex-col gap-4">
                      {renderPlaces(activeTab as number)}
                      {!isReadOnly && (
                        <AddPlacePrompt dayNumber={activeTab as number} />
                      )}
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
            {!isReadOnly && (
              <PlaceSidemenu
                userId={userId}
                selectedDay={
                  activeTab === '전체보기' ? null : (activeTab as number)
                }
                onAddPlace={handleAddPlace}
              />
            )}
          </div>
        </div>
      </DragDropContext>
      {!isReadOnly && (
        <div className="absolute bottom-10 right-10">
          <Button
            onClick={handleSaveButtonClick}
            className="flex items-center justify-center rounded-[12px] border border-primary-400 bg-primary-500 px-7 py-4 text-24 font-bold text-[#F8F8F8] shadow-[2px_4px_4px_0px_rgba(153,61,0,0.20)] backdrop-blur-[10px] hover:bg-primary-600"
          >
            저장하기
          </Button>
        </div>
      )}
      <ScheduleDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDeleteClick={handleConfirmDelete}
      />
      <ScheduleSaveModal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        onSave={async () => {
          return new Promise<void>((resolve) => {
            setIsSaveModalOpen(false);
            setIsPublicModalOpen(true);
            resolve();
          });
        }}
      />
      <ScheduleCreatedModal
        isOpen={isPublicModalOpen}
        onClose={handlePrivateClick}
        onPublicClick={handlePublicClick}
        onPrivateClick={handlePrivateClick}
      />
    </div>
  );
};

export default PlanSchedule;
