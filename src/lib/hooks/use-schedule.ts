import { useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { useToast } from '@/lib/hooks/use-toast';
import { DayPlaces } from '@/types/plan-detail.type';
import { Place } from '@/types/search.type';
import {
  fetchSavePlan,
  fetchSavePlanPlaces,
  fetchUpdatePlan,
  fetchGetPlanById,
} from '@/lib/apis/plan/plan.api';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/path.constants';
import { nanoid } from 'nanoid';
import { useQueryClient } from '@tanstack/react-query';
import { usePlanStore } from '@/zustand/plan.store';
import { getDefaultPlanImage } from '@/lib/utils/get-default-plan-image';

// 복사/붙여넣기 기능을 관리하는 훅
export const useScheduleCopyPaste = (
  dayPlaces: DayPlaces,
  setDayPlaces: (dayPlaces: DayPlaces) => void,
) => {
  const [copiedDay, setCopiedDay] = useState<number | null>(null);
  const { setDayPlaces: setStoreDayPlaces } = usePlanStore();

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

    const copiedPlaces = [...(dayPlaces[copiedDay] || [])];
    const newPlaces = copiedPlaces.map((place) => ({
      ...place,
      uniqueId: nanoid(),
    }));

    const updatedDayPlaces = {
      ...dayPlaces,
      [targetDay]: [...(dayPlaces[targetDay] || []), ...newPlaces],
    };
    setDayPlaces(updatedDayPlaces);
    setStoreDayPlaces(updatedDayPlaces);

    setCopiedDay(null);
  };

  return {
    copiedDay,
    handleCopyDayPlaces,
    handlePasteDayPlaces,
  };
};

// 장소 관리 기능을 담당하는 훅
export const useSchedulePlaces = (
  dayPlaces: DayPlaces,
  setDayPlaces: (dayPlaces: DayPlaces) => void,
  isReadOnly: boolean,
  setIsDeleteModalOpen: (isOpen: boolean) => void,
  dayToDelete: number | null,
  setDayToDelete: (day: number | null) => void,
) => {
  const { toast } = useToast();
  const { setDayPlaces: setStoreDayPlaces } = usePlanStore();

  /**
   * 장소 추가 핸들러
   * @param newPlace 추가할 장소 데이터
   * @param activeTab 현재 활성화된 탭
   * @example
   * handleAddPlace({
   *   id: 1,
   *   title: '장소 제목',...
   * }, 1)
   */
  const handleAddPlace = (newPlace: Place, activeTab: number | '전체보기') => {
    if (activeTab === '전체보기' || isReadOnly) return;

    const dayNumber = activeTab as number;
    const uniqueId = nanoid();
    const newPlaceWithId = { ...newPlace, uniqueId };

    const updatedDayPlaces = {
      ...dayPlaces,
      [dayNumber]: [...(dayPlaces[dayNumber] || []), newPlaceWithId],
    };
    setDayPlaces(updatedDayPlaces);
    setStoreDayPlaces(updatedDayPlaces);
  };

  /**
   * 장소 삭제 핸들러
   * @param dayNumber 일자
   * @param uniqueId 장소 고유 ID
   * @example
   * handleRemovePlace(1, '1-0')
   * 1일차 장소 중 ID가 '1-0'인 장소를 삭제
   */
  const handleRemovePlace = (day: number, uniqueId: string) => {
    if (isReadOnly) return;

    const updatedDayPlaces = {
      ...dayPlaces,
      [day]: dayPlaces[day].filter((place) => place.uniqueId !== uniqueId),
    };
    setDayPlaces(updatedDayPlaces);
    setStoreDayPlaces(updatedDayPlaces);
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
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || isReadOnly) return;

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const dayNumber = parseInt(source.droppableId);
      const places = [...(dayPlaces[dayNumber] || [])];
      const [removed] = places.splice(source.index, 1);
      places.splice(destination.index, 0, removed);

      const updatedDayPlaces = {
        ...dayPlaces,
        [dayNumber]: places,
      };
      setDayPlaces(updatedDayPlaces);
      setStoreDayPlaces(updatedDayPlaces);
    } else {
      const sourceDay = parseInt(source.droppableId);
      const destDay = parseInt(destination.droppableId);
      const sourcePlaces = [...(dayPlaces[sourceDay] || [])];
      const destPlaces = [...(dayPlaces[destDay] || [])];
      const [removed] = sourcePlaces.splice(source.index, 1);
      destPlaces.splice(destination.index, 0, removed);

      const updatedDayPlaces = {
        ...dayPlaces,
        [sourceDay]: sourcePlaces,
        [destDay]: destPlaces,
      };
      setDayPlaces(updatedDayPlaces);
      setStoreDayPlaces(updatedDayPlaces);
    }
  };

  /**
   * 특정 일자의 장소들을 삭제하는 핸들러
   * @param dayNumber 삭제할 일자
   */
  const handleDeleteDayPlaces = (dayNumber: number) => {
    setDayToDelete(dayNumber);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (dayToDelete !== null) {
      const updatedDayPlaces = { ...dayPlaces };
      delete updatedDayPlaces[dayToDelete];
      setDayPlaces(updatedDayPlaces);
      setStoreDayPlaces(updatedDayPlaces);
    }
    setIsDeleteModalOpen(false);
    setDayToDelete(null);
  };

  return {
    handleAddPlace,
    handleRemovePlace,
    handleDragEnd,
    handleDeleteDayPlaces,
    handleConfirmDelete,
  };
};

// 저장 버튼 클릭 핸들러를 담당하는 훅
export const useScheduleSaveButton = (
  title: string,
  startDate: Date | null,
  endDate: Date | null,
  dayPlaces: DayPlaces,
  setIsSaveModalOpen: (isOpen: boolean) => void,
  setIsPublicModalOpen: (isOpen: boolean) => void,
) => {
  const { toast } = useToast();

  const handleSaveButtonClick = () => {
    if (!title) {
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

  return { handleSaveButtonClick };
};

// 일정 저장 기능을 담당하는 훅
export const useScheduleSavePlan = (
  dayPlaces: DayPlaces,
  startDate: Date | null,
  endDate: Date | null,
  title: string,
  description: string,
  planImg: string | null,
  userId: string | null,
  setIsPublicModalOpen: (isOpen: boolean) => void,
  planId?: number,
) => {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    setTitle,
    setDescription,
    setPlanImg,
    setStartDate,
    setEndDate,
    setDayPlaces,
  } = usePlanStore();

  const handlePublicClick = async (): Promise<{ error?: string }> => {
    try {
      if (!startDate || !endDate || !title || !userId) {
        return { error: '필수 정보가 누락되었습니다.' };
      }

      let targetId: number;

      if (planId) {
        const currentPlan = await fetchGetPlanById(planId);

        const updatedPlan = {
          ...currentPlan,
          title,
          description,
          travelStartDate: startDate?.toISOString() || '',
          travelEndDate: endDate?.toISOString() || '',
          planImg: planImg || getDefaultPlanImage(),
          public: true,
          publicAt: new Date().toISOString(),
        };
        await fetchUpdatePlan(updatedPlan, userId);
        targetId = planId;
      } else {
        const newPlanId = await fetchSavePlan({
          userId: userId,
          title: title,
          description: description,
          travelStartDate: startDate?.toISOString() || '',
          travelEndDate: endDate?.toISOString() || '',
          planImg: planImg || getDefaultPlanImage(),
          public: true,
        });
        targetId = newPlanId;
      }

      await fetchSavePlanPlaces(targetId, dayPlaces);

      // 일정 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['filteredPlans', userId] });

      // Zustand 상태 초기화
      setTitle('');
      setDescription('');
      setPlanImg(null);
      setStartDate(null);
      setEndDate(null);
      setDayPlaces({});

      setIsPublicModalOpen(false);
      toast({
        title: '일정 저장 완료',
        description: '일정이 성공적으로 저장되었습니다.',
      });
      router.push(`${PATH.MYPLAN}`);
      return {};
    } catch (error) {
      console.error('일정 공개 설정 실패:', error);
      return { error: '일정 공개 설정에 실패했습니다.' };
    }
  };

  const handlePrivateClick = async (): Promise<{ error?: string }> => {
    try {
      if (!startDate || !endDate || !title || !userId) {
        return { error: '필수 정보가 누락되었습니다.' };
      }

      let targetId: number;

      if (planId) {
        const currentPlan = await fetchGetPlanById(planId);
        if (!currentPlan) {
          throw new Error('일정을 찾을 수 없습니다.');
        }

        const updatedPlan = {
          ...currentPlan,
          title,
          description,
          travelStartDate: startDate?.toISOString() || '',
          travelEndDate: endDate?.toISOString() || '',
          planImg: planImg || getDefaultPlanImage(),
          public: false,
          publicAt: new Date().toISOString(),
        };

        try {
          await fetchUpdatePlan(updatedPlan, userId);
          targetId = planId;
        } catch (error) {
          console.error('일정 업데이트 실패:', error);
          throw new Error('일정 업데이트에 실패했습니다.');
        }
      } else {
        try {
          const newPlanId = await fetchSavePlan({
            userId: userId,
            title: title,
            description: description,
            travelStartDate: startDate?.toISOString() || '',
            travelEndDate: endDate?.toISOString() || '',
            planImg: planImg || getDefaultPlanImage(),
            public: false,
          });
          targetId = newPlanId;
        } catch (error) {
          console.error('일정 저장 실패:', error);
          throw new Error('일정 저장에 실패했습니다.');
        }
      }

      try {
        await fetchSavePlanPlaces(targetId, dayPlaces);
      } catch (error) {
        console.error('일정 장소 저장 실패:', error);
        throw new Error('일정 장소 저장에 실패했습니다.');
      }

      // 일정 목록 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['filteredPlans', userId] });

      // Zustand 상태 초기화
      setTitle('');
      setDescription('');
      setPlanImg(null);
      setStartDate(null);
      setEndDate(null);
      setDayPlaces({});

      setIsPublicModalOpen(false);
      toast({
        title: '일정 저장 완료',
        description: '일정이 성공적으로 저장되었습니다.',
      });
      router.push(`${PATH.MYPLAN}`);
      return {};
    } catch (error) {
      console.error('일정 비공개 설정 실패:', error);
      return { error: '일정 비공개 설정에 실패했습니다.' };
    }
  };

  return { handlePublicClick, handlePrivateClick };
};
