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
import PlaceSidemenu from '../features/sidemenu/place-sidemenu';
import { DragDropContext } from '@hello-pangea/dnd';
import ScheduleDeleteModal from '../features/modal/schedule-delete-modal';
import ScheduleSaveModal from '../features/modal/schedule-save-modal';
import ScheduleCreatedModal from '../features/modal/schedule-created-modal';
import PlacesRenderer from '../../server/places-renderer';
import { DAY_COLORS } from '@/constants/map.constants';
import { memo } from 'react';
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
} from '@/zustand/plan.store';
import { useScheduleModal } from '@/lib/hooks/use-schedule';
import { useScheduleCopyPaste } from '@/lib/hooks/use-schedule';
import { useSchedulePlaces } from '@/lib/hooks/use-schedule';
import { useScheduleSaveButton } from '@/lib/hooks/use-schedule';
import { useScheduleSavePlan } from '@/lib/hooks/use-schedule';
import { useCurrentUser } from '@/lib/queries/auth-queries';

const DROPDOWN_CONTENT_STYLE =
  'p-0 border border-[#E7EDF0] bg-[#F9FAFB] rounded-[12px] w-[140px] [&>*:hover]:bg-primary-100 [&>*:hover]:text-primary-500';
const DROPDOWN_ITEM_STYLE =
  'flex justify-center items-center px-5 py-2.5 text-14 font-medium cursor-pointer w-full transition-colors data-[highlighted]:bg-primary-100 data-[highlighted]:text-primary-500';

const STYLE_CONSTANTS = {
  SIDE_OFFSET: 4,
} as const;

const AddPlacePrompt = ({ dayNumber }: { dayNumber: number }) => {
  const dayColor = dayNumber % 2 === 1 ? DAY_COLORS.ODD : DAY_COLORS.EVEN;

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

const SaveButton = memo(() => {
  const startDate = usePlanStartDate();
  const endDate = usePlanEndDate();
  const dayPlaces = usePlanDayPlaces();
  const { setIsSaveModalOpen, setIsPublicModalOpen } = useScheduleModal();
  const { handleSaveButtonClick } = useScheduleSaveButton(
    usePlanTitle(),
    startDate,
    endDate,
    dayPlaces,
    setIsSaveModalOpen,
    setIsPublicModalOpen,
  );

  return (
    <div className="absolute bottom-10 right-10">
      <Button
        onClick={handleSaveButtonClick}
        className="flex items-center justify-center rounded-[12px] border border-primary-400 bg-primary-500 px-7 py-4 text-24 font-bold text-[#F8F8F8] shadow-[2px_4px_4px_0px_rgba(153,61,0,0.20)] backdrop-blur-[10px] hover:bg-primary-600"
      >
        저장하기
      </Button>
    </div>
  );
});

SaveButton.displayName = 'SaveButton';

const ScheduleModals = memo(() => {
  const startDate = usePlanStartDate();
  const endDate = usePlanEndDate();
  const dayPlaces = usePlanDayPlaces();
  const {
    isDeleteModalOpen,
    isSaveModalOpen,
    isPublicModalOpen,
    setIsDeleteModalOpen,
    setIsSaveModalOpen,
    setIsPublicModalOpen,
  } = useScheduleModal();
  const { data: user } = useCurrentUser();
  const userId = user?.id || null;
  const { handleConfirmDelete } = useSchedulePlaces(
    dayPlaces,
    usePlanSetDayPlaces(),
    usePlanIsReadOnly(),
    setIsDeleteModalOpen,
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
  );

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
        onClose={handlePrivateClick}
        onPublicClick={handlePublicClick}
        onPrivateClick={handlePrivateClick}
      />
    </>
  );
});

ScheduleModals.displayName = 'SaveModals';

const PlanSchedule = memo(() => {
  console.log('PlanSchedule 렌더링');
  const startDate = usePlanStartDate();
  const endDate = usePlanEndDate();
  const dayPlaces = usePlanDayPlaces();
  const setDayPlaces = usePlanSetDayPlaces();
  const activeTab = usePlanActiveTab();
  const setActiveTab = usePlanSetActiveTab();
  const isReadOnly = usePlanIsReadOnly();

  const { setIsDeleteModalOpen } = useScheduleModal();

  const { copiedDay, handleCopyDayPlaces, handlePasteDayPlaces } =
    useScheduleCopyPaste(dayPlaces, setDayPlaces);

  const {
    handleAddPlace,
    handleRemovePlace,
    handleDragEnd,
    handleDeleteDayPlaces,
  } = useSchedulePlaces(
    dayPlaces,
    setDayPlaces,
    isReadOnly,
    setIsDeleteModalOpen,
  );

  const dayCount = calculateTotalDays(startDate, endDate);

  return (
    <div className="relative min-h-screen pb-32">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="my-6">
          <div className="sticky top-[370px] z-10">
            <div className="absolute -top-[370px] left-0 right-0 h-[370px] bg-white" />
            <div className="flex bg-white py-4">
              <div className="flex flex-1 flex-col gap-2">
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

                <div className="mt-8 flex w-full gap-6">
                  {startDate && endDate ? (
                    activeTab === '전체보기' ? (
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
                                        onClick={() =>
                                          handlePasteDayPlaces(day)
                                        }
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
                                <PlacesRenderer
                                  day={day}
                                  places={dayPlaces[day] || []}
                                  isReadOnly={isReadOnly}
                                  onRemovePlace={handleRemovePlace}
                                />
                                {!isReadOnly && (
                                  <AddPlacePrompt dayNumber={day} />
                                )}
                              </div>
                            </div>
                          ),
                        )}
                      </div>
                    ) : (
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
                          <PlacesRenderer
                            day={activeTab as number}
                            places={dayPlaces[activeTab as number] || []}
                            isReadOnly={isReadOnly}
                            onRemovePlace={handleRemovePlace}
                          />
                          {!isReadOnly && (
                            <AddPlacePrompt dayNumber={activeTab as number} />
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

              {!isReadOnly && (
                <PlaceSidemenu
                  selectedDay={
                    activeTab === '전체보기' ? null : (activeTab as number)
                  }
                  onAddPlace={(place) => handleAddPlace(place, activeTab)}
                />
              )}
              {isReadOnly && (
                <div className="h-full w-[400px] border-l border-gray-200 p-6">
                  <div className="mb-4 text-18 font-bold">댓글 0</div>
                  <div className="space-y-4">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="whitespace-pre-line py-8 text-center text-gray-400">
                        댓글 영역입니다. {'\n'} 이후 버전에서 구현될 예정입니다
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DragDropContext>
      {!isReadOnly && <SaveButton />}
      <ScheduleModals />
    </div>
  );
});

PlanSchedule.displayName = 'PlanSchedule';

export default PlanSchedule;
