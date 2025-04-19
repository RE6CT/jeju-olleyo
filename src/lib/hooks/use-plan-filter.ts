import { PATH } from '@/constants/path.constants';
import { PUBLIC_OPTIONS, FILTER_TYPES } from '@/constants/plan.constants';
import { FilterState, FilterType, PublicOption } from '@/types/plan.type';
import router from 'next/router';
import { useState } from 'react';
import { useDeletePlanMutation } from '@/lib/mutations/use-delete-plan-mutation';
import { useToast } from '@/hooks/use-toast';

/**
 * 여행 계획 필터링을 위한 커스텀 훅
 * @param userId - 사용자 ID
 * ```
 */
export const usePlanFilter = (userId: string) => {
  const { toast } = useToast();
  const { mutate: deletePlan } = useDeletePlanMutation(userId);

  const [filter, setFilter] = useState<FilterState>({
    type: FILTER_TYPES.PUBLIC,
    value: PUBLIC_OPTIONS.ALL,
  });
  const [selectedFilter, setSelectedFilter] = useState<FilterType>(null);
  const [inputValue, setInputValue] = useState('');
  const [selectedPublicOption, setSelectedPublicOption] =
    useState<PublicOption>(PUBLIC_OPTIONS.ALL);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isDatePickerFocused, setIsDatePickerFocused] = useState(false);

  /**
   * 선택된 필터를 적용하는 함수
   * @throws 필터링 중 오류가 발생할 경우 에러를 콘솔에 출력
   */
  const handleApplyFilter = async () => {
    try {
      setFilter({
        type: selectedFilter,
        value:
          selectedFilter === FILTER_TYPES.PUBLIC
            ? selectedPublicOption
            : selectedFilter === FILTER_TYPES.DATE
              ? `${startDate} ~ ${endDate}`
              : inputValue,
      });
    } catch (error) {
      console.error('필터링 중 오류 발생:', error);
    }
  };

  /**
   * 필터 상태를 초기화하는 함수
   */
  const resetFilter = () => {
    setFilter({
      type: FILTER_TYPES.PUBLIC,
      value: PUBLIC_OPTIONS.ALL,
    });
    setSelectedFilter(null);
    setInputValue('');
    setStartDate('');
    setEndDate('');
    setSelectedPublicOption(PUBLIC_OPTIONS.ALL);
  };

  /**
   * 일정 수정 핸들러 함수
   * @param planId - 수정할 일정의 ID
   */
  const handleEdit = (planId: number) => {
    router.push(`${PATH.PLAN_DETAIL}/${planId}`);
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

  return {
    filter,
    selectedFilter,
    setSelectedFilter,
    inputValue,
    setInputValue,
    selectedPublicOption,
    setSelectedPublicOption,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    isDatePickerFocused,
    setIsDatePickerFocused,
    resetFilter,
    handleEdit,
    handleApplyFilter,
    handleDelete,
  };
};
