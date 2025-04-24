import { useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { useToast } from '@/hooks/use-toast';
import { DayPlaces } from '@/types/plan-detail.type';
import { Place } from '@/types/search.type';
import {
  fetchSavePlan,
  fetchSavePlanPlaces,
  fetchUpdatePlan,
} from '@/lib/apis/plan/plan.api';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/path.constants';
import { nanoid } from 'nanoid';

// 복사/붙여넣기 기능을 관리하는 훅
export const useScheduleCopyPaste = (
  dayPlaces: DayPlaces,
  setDayPlaces: (dayPlaces: DayPlaces) => void,
) => {
  const [copiedDay, setCopiedDay] = useState<number | null>(null);

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
  planId?: number, // 기존 일정 ID (수정 시 사용)
) => {
  const { toast } = useToast();
  const router = useRouter();

  const handlePublicClick = async () => {
    try {
      if (!startDate || !endDate || !title || !userId) {
        throw new Error('필수 정보가 누락되었습니다.');
      }

      //console.log('일정 저장 시작 - planId:', planId);
      let targetId: number;

      if (planId) {
        //console.log('기존 일정 수정 시도 - planId:', planId);
        // 기존 일정 수정
        await fetchUpdatePlan(planId, {
          userId: userId,
          title: title,
          description: description,
          travelStartDate: startDate?.toISOString() || '',
          travelEndDate: endDate?.toISOString() || '',
          planImg: planImg || null,
          public: true,
        });
        targetId = planId;
        //console.log('기존 일정 수정 완료 - targetId:', targetId);
      } else {
        // 새 일정 생성
        const newPlanId = await fetchSavePlan({
          userId: userId,
          title: title,
          description: description,
          travelStartDate: startDate?.toISOString() || '',
          travelEndDate: endDate?.toISOString() || '',
          planImg: planImg || null,
          public: true,
        });
        targetId = newPlanId;
        //console.log('새 일정 생성 완료 - targetId:', targetId);
      }

      //console.log('장소 저장 시도 - targetId:', targetId);
      await fetchSavePlanPlaces(targetId, dayPlaces);

      setIsPublicModalOpen(false);
      toast({
        title: '일정 저장 완료',
        description: '일정이 성공적으로 저장되었습니다.',
      });
      router.push(`${PATH.MYPLAN}`); // 내 일정 페이지로 이동
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
      if (!startDate || !endDate || !title || !userId) {
        throw new Error('필수 정보가 누락되었습니다.');
      }

      //console.log('일정 저장 시작 - planId:', planId);
      let targetId: number;

      if (planId) {
        //console.log('기존 일정 수정 시도 - planId:', planId);
        // 기존 일정 수정
        await fetchUpdatePlan(planId, {
          userId: userId,
          title: title,
          description: description,
          travelStartDate: startDate?.toISOString() || '',
          travelEndDate: endDate?.toISOString() || '',
          planImg: planImg || null,
          public: false,
        });
        targetId = planId;
        //console.log('기존 일정 수정 완료 - targetId:', targetId);
      } else {
        //console.log('새 일정 생성 시도');
        // 새 일정 생성
        const newPlanId = await fetchSavePlan({
          userId: userId,
          title: title,
          description: description,
          travelStartDate: startDate?.toISOString() || '',
          travelEndDate: endDate?.toISOString() || '',
          planImg: planImg || null,
          public: false,
        });
        targetId = newPlanId;
        //console.log('새 일정 생성 완료 - targetId:', targetId);
      }

      //console.log('장소 저장 시도 - targetId:', targetId);
      await fetchSavePlanPlaces(targetId, dayPlaces);

      setIsPublicModalOpen(false);
      toast({
        title: '일정 저장 완료',
        description: '일정이 성공적으로 저장되었습니다.',
      });
      router.push(`${PATH.MYPLAN}`); // 내 일정 페이지로 이동
    } catch (error) {
      console.error('일정 비공개 설정 실패:', error);
      toast({
        title: '일정 저장 실패',
        description: '일정 비공개 설정에 실패했습니다.',
        variant: 'destructive',
      });
    }
  };

  return { handlePublicClick, handlePrivateClick };
};
