import { usePlanStore } from '@/zustand/plan.store';
import { nanoid } from 'nanoid';
import { Place } from '@/types/search.type';
import { DayPlaces } from '@/types/plan-detail.type';

export const usePlanSidemenu = (
  dayPlaces: DayPlaces,
  setDayPlaces: (dayPlaces: DayPlaces) => void,
  isReadOnly: boolean,
) => {
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
  const { setDayPlaces: setStoreDayPlaces } = usePlanStore();

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

  return { handleAddPlace };
};
