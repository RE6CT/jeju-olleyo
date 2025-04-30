'use client';

import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { calculateTotalDays, formatDayDate } from '@/lib/utils/date';
import { DragDropContext } from '@hello-pangea/dnd';
import ScheduleDeleteModal from '../features/modal/schedule-delete-modal';
import ScheduleSaveModal from '../features/modal/schedule-save-modal';
import ScheduleCreatedModal from '../features/modal/schedule-created-modal';
import PlacesRenderer from '../features/place/places-renderer';
import { DAY_COLORS } from '@/constants/map.constants';
import { memo, useState } from 'react';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import PlaceSidemenu from '../features/sidemenu/place-sidemenu';
import {
  usePlanStartDate,
  usePlanEndDate,
  usePlanDayPlaces,
  usePlanSetDayPlaces,
  usePlanActiveTab,
  usePlanSetActiveTab,
  usePlanIsReadOnly,
  usePlanTitle,
  usePlanDescription,
  usePlanImg,
  useScheduleModalStore,
  usePlanId,
} from '@/zustand/plan.store';
import {
  useScheduleCopyPaste,
  useSchedulePlaces,
  useScheduleSavePlan,
} from '@/lib/hooks/use-schedule';
import { useCurrentUser } from '@/lib/queries/auth-queries';
import { toast } from '@/lib/hooks/use-toast';
import { Place } from '@/types/search.type';
import { nanoid } from 'nanoid';
import { PlaceWithUniqueId } from '@/types/plan-detail.type';

const DROPDOWN_CONTENT_STYLE =
  'p-0 border border-[#E7EDF0] bg-[#F9FAFB] rounded-[12px] w-[140px] [&>*:hover]:bg-primary-100 [&>*:hover]:text-primary-500';
const DROPDOWN_ITEM_STYLE =
  'flex justify-center items-center px-5 py-2.5 text-14 font-medium cursor-pointer w-full transition-colors data-[highlighted]:bg-primary-100 data-[highlighted]:text-primary-500';

const STYLE_CONSTANTS = {
  SIDE_OFFSET: 4,
} as const;

const AddOrBookmarkPlaceButtons = ({
  dayNumber,
  onSearch,
  onBookmark,
}: {
  dayNumber: number;
  onSearch: () => void;
  onBookmark: () => void;
}) => {
  const dayColor = dayNumber % 2 === 1 ? DAY_COLORS.ODD : DAY_COLORS.EVEN;

  return (
    <div className="mb-10 flex w-full items-center gap-2">
      <Button
        onClick={onSearch}
        className="flex-1 gap-2 rounded-12 border border-gray-100 bg-gray-50 text-14 font-medium text-gray-600 hover:bg-gray-100"
      >
        <div className={`flex flex-col items-center justify-center gap-[10px]`}>
          +
        </div>
        장소 추가
      </Button>
      <Button
        onClick={onBookmark}
        className="flex-1 rounded-12 border border-gray-100 bg-gray-50 text-12 font-medium text-gray-600 hover:bg-gray-100"
      >
        내 북마크
      </Button>
    </div>
  );
};

const AddPlacePrompt = ({ dayNumber }: { dayNumber: number }) => {
  const dayColor = dayNumber % 2 === 1 ? DAY_COLORS.ODD : DAY_COLORS.EVEN;

  return (
    <div className="flex w-full items-center gap-3">
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

const ScheduleModals = () => {
  const startDate = usePlanStartDate();
  const endDate = usePlanEndDate();
  const dayPlaces = usePlanDayPlaces();
  const planId = usePlanId();
  const {
    isDeleteModalOpen,
    isSaveModalOpen,
    isPublicModalOpen,
    setIsDeleteModalOpen,
    setIsSaveModalOpen,
    setIsPublicModalOpen,
    dayToDelete,
    setDayToDelete,
  } = useScheduleModalStore();
  const { data: user } = useCurrentUser();
  const userId = user?.id || null;
  const { handleConfirmDelete } = useSchedulePlaces(
    dayPlaces,
    usePlanSetDayPlaces(),
    usePlanIsReadOnly(),
    setIsDeleteModalOpen,
    dayToDelete,
    setDayToDelete,
  );
  const { handlePublicClick, handlePrivateClick } = useScheduleSavePlan(
    dayPlaces,
    startDate,
    endDate,
    usePlanTitle(),
    usePlanDescription(),
    usePlanImg(),
    userId,
    setIsPublicModalOpen,
    planId,
  );

  const handlePublicClickWrapper = async (): Promise<{ error?: string }> => {
    const result = await handlePublicClick();
    if (result?.error) {
      toast({
        title: '일정 저장 실패',
        description: result.error,
        variant: 'destructive',
      });
    }
    return result;
  };

  const handlePrivateClickWrapper = async (): Promise<{ error?: string }> => {
    const result = await handlePrivateClick();
    if (result?.error) {
      toast({
        title: '일정 저장 실패',
        description: result.error,
        variant: 'destructive',
      });
    }
    return result;
  };

  return (
    <>
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
        onClose={() => setIsPublicModalOpen(false)}
        onPublicClick={handlePublicClickWrapper}
        onPrivateClick={handlePrivateClickWrapper}
      />
    </>
  );
};

const PlanSchedule = memo(() => {
  const startDate = usePlanStartDate();
  const endDate = usePlanEndDate();
  const dayPlaces = usePlanDayPlaces();
  const setDayPlaces = usePlanSetDayPlaces();
  const activeTab = usePlanActiveTab();
  const setActiveTab = usePlanSetActiveTab();
  const isReadOnly = usePlanIsReadOnly();

  const { setIsDeleteModalOpen, dayToDelete, setDayToDelete } =
    useScheduleModalStore();

  const { copiedDay, handleCopyDayPlaces, handlePasteDayPlaces } =
    useScheduleCopyPaste(dayPlaces, setDayPlaces);

  const { handleRemovePlace, handleDragEnd, handleDeleteDayPlaces } =
    useSchedulePlaces(
      dayPlaces,
      setDayPlaces,
      isReadOnly,
      setIsDeleteModalOpen,
      dayToDelete,
      setDayToDelete,
    );

  const dayCount = calculateTotalDays(startDate, endDate);

  const [openSheet, setOpenSheet] = useState<null | 'search' | 'bookmark'>(
    null,
  );

  const handleAddPlace = (place: Place, activeTab: string | number) => {
    const uniqueId = nanoid();
    const newPlaceWithId = { ...place, uniqueId } as PlaceWithUniqueId;

    if (typeof activeTab === 'string') {
      // 전체보기 상태일 때는 첫 번째 날짜에 추가
      const firstDay = 1;
      const updatedDayPlaces = {
        ...dayPlaces,
        [firstDay]: [...(dayPlaces[firstDay] || []), newPlaceWithId],
      };
      setDayPlaces(updatedDayPlaces);
    } else {
      // 특정 날짜가 선택된 상태
      const updatedDayPlaces = {
        ...dayPlaces,
        [activeTab]: [...(dayPlaces[activeTab] || []), newPlaceWithId],
      };
      setDayPlaces(updatedDayPlaces);
    }
  };

  return (
    <div className="relative w-full bg-transparent">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex w-full flex-1 flex-col gap-2">
          <div className="sticky top-[153px] z-40 bg-white md:top-[260px]">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center justify-center gap-2 rounded-[12px] border border-[#E7EDF0] bg-[#F9FAFB] px-5 py-[10px] text-14 font-medium md:w-[113px] lg:w-[152px]"
                >
                  {activeTab === '전체보기' ? '전체보기' : `DAY ${activeTab}`}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className={DROPDOWN_CONTENT_STYLE}
                sideOffset={STYLE_CONSTANTS.SIDE_OFFSET}
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
                        activeTab === day && 'bg-primary-100 text-primary-500',
                      )}
                    >
                      DAY {day}
                    </DropdownMenuItem>
                  ),
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="mt-4 flex w-full md:mt-[22.5px] lg:mt-[17px]">
            {startDate && endDate ? (
              activeTab === '전체보기' ? (
                <div className="flex w-full flex-col">
                  {Array.from({ length: dayCount }, (_, i) => i + 1).map(
                    (day) => (
                      <div className="space-y-3" key={day}>
                        <div className="flex items-center justify-between md:mb-3 lg:mb-4">
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-gray-900 md:text-14 lg:text-16">
                              DAY {day}
                            </span>
                            <span className="text-gray-900 md:text-10 lg:text-12">
                              {formatDayDate(startDate, day)}
                            </span>
                          </div>
                          {!isReadOnly && (
                            <div className="flex items-center">
                              {copiedDay !== null && copiedDay !== day ? (
                                <Button
                                  variant="ghost"
                                  className="text-12' text-gray-500 hover:text-gray-900"
                                  onClick={() => handlePasteDayPlaces(day)}
                                >
                                  붙여넣기
                                </Button>
                              ) : (
                                <Button
                                  variant="ghost"
                                  className={cn(
                                    'text-12',
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
                                  'text-12',
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
                          )}
                        </div>
                        <div className="flex flex-col md:gap-3 lg:gap-4">
                          <PlacesRenderer
                            day={day}
                            places={dayPlaces[day] || []}
                            isReadOnly={isReadOnly}
                            onRemovePlace={handleRemovePlace}
                          />
                          {!isReadOnly && (
                            <>
                              <div className="md:hidden">
                                <AddOrBookmarkPlaceButtons
                                  dayNumber={day}
                                  onSearch={() => setOpenSheet('search')}
                                  onBookmark={() => setOpenSheet('bookmark')}
                                />
                              </div>
                              <div className="hidden md:block">
                                <AddPlacePrompt dayNumber={day} />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <div className="w-full">
                  <div className="flex items-center justify-between md:mb-3 lg:mb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-900 md:text-14 lg:text-16">
                        DAY {activeTab}
                      </span>
                      <span className="text-gray-900 md:text-10 lg:text-12">
                        {formatDayDate(startDate, activeTab as number)}
                      </span>
                    </div>
                    {!isReadOnly && (
                      <div className="flex items-center">
                        {copiedDay !== null && copiedDay !== activeTab ? (
                          <Button
                            variant="ghost"
                            className="text-12' text-gray-500 hover:text-gray-900"
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
                              'text-12',
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
                            'text-12',
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
                  <div className="flex flex-col md:gap-3 lg:gap-4">
                    <PlacesRenderer
                      day={activeTab as number}
                      places={dayPlaces[activeTab as number] || []}
                      isReadOnly={isReadOnly}
                      onRemovePlace={handleRemovePlace}
                    />
                    {!isReadOnly && (
                      <>
                        <div className="md:hidden">
                          <AddOrBookmarkPlaceButtons
                            dayNumber={activeTab as number}
                            onSearch={() => setOpenSheet('search')}
                            onBookmark={() => setOpenSheet('bookmark')}
                          />
                        </div>
                        <div className="hidden md:block">
                          <AddPlacePrompt dayNumber={activeTab as number} />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )
            ) : (
              <div className="mr-10 flex h-full w-full items-center justify-center rounded-[12px] border border-dashed border-gray-200 py-4 text-14 text-gray-300">
                여행 기간을 선택해 주세요
              </div>
            )}
          </div>
        </div>
      </DragDropContext>
      <ScheduleModals />
      <Sheet
        open={!!openSheet}
        onOpenChange={(open) => !open && setOpenSheet(null)}
      >
        <SheetContent
          side="bottom"
          className="mx-auto h-[470px] w-[282px] rounded-t-[20px]"
        >
          <SheetTitle className="sr-only">
            {openSheet === 'search' ? '장소 검색' : '내 북마크'}
          </SheetTitle>
          <div className="flex h-full w-full flex-col items-center pt-4">
            <PlaceSidemenu
              selectedDay={
                activeTab === '전체보기' ? null : (activeTab as number)
              }
              onAddPlace={(place) => {
                handleAddPlace(place, activeTab);
                setOpenSheet(null);
              }}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
});

PlanSchedule.displayName = 'PlanSchedule';

export default PlanSchedule;
