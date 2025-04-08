'use client';

import { useState } from 'react';
import PlanCard from '@/components/features/plan/plan-card';
import { Plan } from '@/types/plan.type';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Filter } from 'lucide-react';
import { getFilteredPlans } from '@/lib/apis/plan/plan';
import { FILTER_TYPES, PUBLIC_OPTIONS } from '@/constants/plan.constants';
import { FilterType, PublicOption, FilterState } from '@/types/plan.type';
import { FilterMenu } from './plan-filter-menu';
import { FilterInput } from './plan-filter-input';
import Loading from '@/app/loading';

/**
 * 여행 계획 필터 섹션 컴포넌트
 * @param initialPlans - 초기 여행 계획 목록
 * @param userId - 현재 로그인한 사용자의 ID
 *
 * @example
 * ```tsx
 * const MyPlanPage = () => {
 *   return (
 *     <div>
 *       <PlanFilterSection initialPlans={plans} userId={userId} />
 *     </div>
 *   );
 * };
 * ```
 */
const PlanFilterSection = ({
  initialPlans,
  userId,
}: {
  initialPlans: Plan[];
  userId: string;
}) => {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [isOpen, setIsOpen] = useState(false); // 호버 상태 관리
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [filter, setFilter] = useState<FilterState>({
    type: FILTER_TYPES.PUBLIC,
    value: PUBLIC_OPTIONS.ALL,
  }); // 현재 적용된 필터 상태
  const [selectedFilter, setSelectedFilter] = useState<FilterType>(null); // popover 내부 메뉴에서 선택된 필터 상태
  const [inputValue, setInputValue] = useState('');
  const [selectedPublicOption, setSelectedPublicOption] =
    useState<PublicOption>(PUBLIC_OPTIONS.ALL);
  const [isDatePickerFocused, setIsDatePickerFocused] = useState(false); // datepicker 포커스 상태(popover 닫히는 문제 해결을 위해)
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // 필터 초기화
  const resetFilter = () => {
    setFilter({ type: null, value: '' });
    setSelectedFilter(null);
    setInputValue('');
    setStartDate('');
    setEndDate('');
    setSelectedPublicOption(PUBLIC_OPTIONS.ALL);
    setPlans(initialPlans);
  };

  // 필터 적용
  const handleApplyFilter = async () => {
    setIsLoading(true);
    try {
      const filterOptions = {
        title: selectedFilter === FILTER_TYPES.TITLE ? inputValue : undefined,
        startDate: selectedFilter === FILTER_TYPES.DATE ? startDate : undefined,
        endDate: selectedFilter === FILTER_TYPES.DATE ? endDate : undefined,
        isPublic:
          selectedFilter === FILTER_TYPES.PUBLIC
            ? selectedPublicOption === PUBLIC_OPTIONS.PUBLIC
            : undefined,
      };
      const filteredPlans = await getFilteredPlans(userId, filterOptions);
      setPlans(filteredPlans);
      setFilter({
        type: selectedFilter,
        value:
          selectedFilter === FILTER_TYPES.PUBLIC
            ? selectedPublicOption
            : selectedFilter === FILTER_TYPES.DATE
              ? `${startDate} ~ ${endDate}`
              : inputValue,
      });
      setIsOpen(false);
    } catch (error) {
      console.error('필터링 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // popover mouseleave 이벤트 핸들러
  const handleMouseLeave = () => {
    if (!isDatePickerFocused) {
      setIsOpen(false);
      setSelectedFilter(null);
    }
  };

  // 계획 수정 핸들러
  const handleEdit = (planId: number) => {
    console.log('수정할 계획 ID:', planId);
    // TODO: 수정 페이지로 이동
  };

  // 계획 삭제 핸들러
  const handleDelete = (planId: number) => {
    console.log('삭제할 계획 ID:', planId);
    // TODO: 삭제 API 호출
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger
            asChild
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={handleMouseLeave}
          >
            <Button variant="outline" size="sm" disabled={isLoading}>
              <Filter className="mr-2 h-4 w-4" />
              필터
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="mt-[-4px] flex w-[400px] gap-2 rounded-md border bg-popover p-1"
            align="start"
            sideOffset={5}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={handleMouseLeave}
          >
            <FilterMenu
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              filter={filter}
              setInputValue={setInputValue}
            />
            {selectedFilter && (
              <FilterInput
                selectedFilter={selectedFilter}
                inputValue={inputValue}
                setInputValue={setInputValue}
                selectedPublicOption={selectedPublicOption}
                setSelectedPublicOption={setSelectedPublicOption}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                isDatePickerFocused={isDatePickerFocused}
                setIsDatePickerFocused={setIsDatePickerFocused}
                filter={filter}
                applyFilter={handleApplyFilter}
              />
            )}
          </PopoverContent>
        </Popover>
        {filter.type && filter.value !== PUBLIC_OPTIONS.ALL && (
          <Button
            variant="ghost"
            size="sm"
            onClick={resetFilter}
            className="text-muted-foreground"
            disabled={isLoading}
          >
            필터 초기화
          </Button>
        )}
      </div>

      {plans.length === 0 ? (
        <div className="flex h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-foreground/30">
          <p className="text-lg text-foreground">여행 계획이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {plans.map((plan) => (
            <PlanCard
              key={plan.planId}
              plan={plan}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default PlanFilterSection;
