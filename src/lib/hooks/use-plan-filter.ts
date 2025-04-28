import { PUBLIC_OPTIONS, FILTER_TYPES } from '@/constants/plan.constants';
import { FilterState, FilterType, PublicOption } from '@/types/plan.type';
import { useState } from 'react';
import { useDeletePlanMutation } from '@/lib/mutations/use-delete-plan-mutation';

/**
 * 여행 계획 필터링을 위한 커스텀 훅
 * @param userId - 사용자 ID
 * ```
 */
export const usePlanFilter = (userId: string) => {
  const { mutate: deletePlan } = useDeletePlanMutation(userId);

  const [filters, setFilters] = useState<{
    keyword?: string;
    date?: string;
    public?: PublicOption;
  }>({});
  const [selectedFilter, setSelectedFilter] = useState<FilterType>(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedPublicOption, setSelectedPublicOption] =
    useState<PublicOption>(PUBLIC_OPTIONS.ALL);
  const [date, setDate] = useState('');
  const [isDatePickerFocused, setIsDatePickerFocused] = useState(false);

  /**
   * 필터 적용 함수 (여러 조건 동시 적용)
   * @throws 필터링 중 오류가 발생할 경우 에러를 콘솔에 출력
   */
  const handleApplyFilter = async () => {
    try {
      setFilters((prev) => {
        if (selectedFilter === FILTER_TYPES.PUBLIC) {
          return { ...prev, public: selectedPublicOption };
        } else if (selectedFilter === FILTER_TYPES.DATE) {
          return { ...prev, date: date };
        } else if (selectedFilter === FILTER_TYPES.KEYWORD) {
          return { ...prev, keyword: inputValue };
        }
        return prev;
      });
    } catch (error) {
      console.error('필터링 중 오류 발생:', error);
    }
  };

  /**
   * 특정 필터 조건 삭제
   * @param type - 삭제할 필터 타입
   */
  const removeFilter = (type: FilterType) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (type === FILTER_TYPES.DATE) delete newFilters.date;
      if (type === FILTER_TYPES.KEYWORD) delete newFilters.keyword;
      if (type === FILTER_TYPES.PUBLIC) delete newFilters.public;
      return newFilters;
    });
  };

  /**
   * 전체 필터 초기화
   */
  const resetFilter = () => {
    setFilters({});
    setSelectedFilter(null);
    setInputValue('');
    setDate('');
    setSelectedPublicOption(PUBLIC_OPTIONS.ALL);
  };

  /**
   * 일정을 삭제 핸들러 함수
   * @param planId - 삭제할 일정의 ID
   */
  const handleDelete = (planId: number) => {
    if (confirm('정말로 이 일정을 삭제하시겠습니까?')) {
      deletePlan(planId);
    }
  };

  /**
   * 필터 버튼 클릭 핸들러 함수
   * @param filterType - 선택된 필터 타입 (제목(title), 날짜(date), 공개상태(public))
   * @param setSelectedFilter - 선택된 필터를 설정하는 함수
   * @param setInputValue - 입력값을 설정하는 함수
   * @param filters - 현재 적용된 필터 상태
   */
  const handleFilterClick = (
    filterType: FilterType,
    setSelectedFilter: (filter: FilterType) => void,
    setInputValue: (value: string) => void,
    filters: { keyword?: string; date?: string; public?: PublicOption },
  ) => {
    setSelectedFilter(filterType);
    if (filterType === FILTER_TYPES.KEYWORD) {
      setInputValue(filters.keyword || '');
    } else if (filterType === FILTER_TYPES.DATE) {
      setDate(filters.date || '');
    } else if (filterType === FILTER_TYPES.PUBLIC) {
      setSelectedPublicOption(filters.public || PUBLIC_OPTIONS.ALL);
    }
  };

  return {
    filters,
    setFilters,
    selectedFilter,
    setSelectedFilter,
    inputValue,
    setInputValue,
    selectedPublicOption,
    setSelectedPublicOption,
    date,
    setDate,
    isDatePickerFocused,
    setIsDatePickerFocused,
    resetFilter,
    handleApplyFilter,
    handleDelete,
    handleFilterClick,
    removeFilter,
  };
};
