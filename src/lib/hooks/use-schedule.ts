import { useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { useToast } from '@/hooks/use-toast';
import { DayPlaces } from '@/types/plan-detail.type';
import { Place } from '@/types/search.type';
import { fetchSavePlan, fetchSavePlanPlaces } from '@/lib/apis/plan/plan.api';

export const useSchedule = (
  userId: string,
  planTitle: string,
  planDescription: string,
  planImage: string,
  startDate: Date | null,
  endDate: Date | null,
  dayPlaces: DayPlaces,
  setDayPlaces: React.Dispatch<React.SetStateAction<DayPlaces>>,
  isReadOnly: boolean,
) => {
  const { toast } = useToast();
  const [placeCount, setPlaceCount] = useState(0);
  const [copiedDay, setCopiedDay] = useState<number | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [dayToDelete, setDayToDelete] = useState<number | null>(null);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isPublicModalOpen, setIsPublicModalOpen] = useState(false);

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
   * @param uniqueId 장소 고유 ID
   * @example
   * handleRemovePlace(1, '1-0')
   * 1일차 장소 중 ID가 '1-0'인 장소를 삭제
   */
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
      setDayPlaces((prev: DayPlaces) => {
        const dayNumber = parseInt(source.droppableId);
        const places = [...(prev[dayNumber] || [])];
        const [removed] = places.splice(source.index, 1);
        places.splice(destination.index, 0, removed);

        return {
          ...prev,
          [dayNumber]: places,
        };
      });
    } else {
      setDayPlaces((prev: DayPlaces) => {
        const sourceDay = parseInt(source.droppableId);
        const destDay = parseInt(destination.droppableId);
        const sourcePlaces = [...(prev[sourceDay] || [])];
        const destPlaces = [...(prev[destDay] || [])];
        const [removed] = sourcePlaces.splice(source.index, 1);
        destPlaces.splice(destination.index, 0, removed);

        return {
          ...prev,
          [sourceDay]: sourcePlaces,
          [destDay]: destPlaces,
        };
      });
    }
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
   * 일정 저장 버튼 클릭 핸들러
   */
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

  /**
   * 일정 공개 버튼 클릭 핸들러
   */
  const handlePublicClick = async () => {
    try {
      if (!startDate || !endDate || !planTitle) {
        throw new Error('필수 정보가 누락되었습니다.');
      }

      const planId = await fetchSavePlan({
        userId: userId,
        title: planTitle,
        description: planDescription,
        travelStartDate: startDate?.toISOString() || '',
        travelEndDate: endDate?.toISOString() || '',
        planImg: planImage || null,
        public: true,
      });

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

  /**
   * 일정 비공개 버튼 클릭 핸들러
   */
  const handlePrivateClick = async () => {
    try {
      if (!startDate || !endDate || !planTitle) {
        throw new Error('필수 정보가 누락되었습니다.');
      }

      const planId = await fetchSavePlan({
        userId: userId,
        title: planTitle,
        description: planDescription,
        travelStartDate: startDate?.toISOString() || '',
        travelEndDate: endDate?.toISOString() || '',
        planImg: planImage || null,
        public: false,
      });

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

  return {
    placeCount,
    copiedDay,
    isDeleteModalOpen,
    isSaveModalOpen,
    isPublicModalOpen,
    setIsDeleteModalOpen,
    setIsSaveModalOpen,
    setIsPublicModalOpen,
    handleAddPlace,
    handleRemovePlace,
    handleDragEnd,
    handleCopyDayPlaces,
    handlePasteDayPlaces,
    handleDeleteDayPlaces,
    handleConfirmDelete,
    handleSaveButtonClick,
    handlePublicClick,
    handlePrivateClick,
  };
};
