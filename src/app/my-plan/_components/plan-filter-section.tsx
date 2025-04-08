'use client';

import { useState } from 'react';
import MyPlanCard from '@/components/features/plan/my-plan-card';
import { Plan } from '@/types/plan.type';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Filter } from 'lucide-react';
import { FILTER_TYPES, PUBLIC_OPTIONS } from '@/constants/plan.constants';
import { FilterType, PublicOption, FilterState } from '@/types/plan.type';
import { FilterMenu } from './plan-filter-menu';
import { FilterInput } from './plan-filter-input';
import Loading from '@/app/loading';
import { useFilteredPlans } from '@/lib/queries/use-get-filtered-plans';

/**
 * 여행 계획 필터 섹션 컴포넌트
 * @param initialPlans - 초기 여행 계획 목록
 * @param user - 현재 로그인한 사용자의 정보
 *
 * @example
 * ```tsx
 * const MyPlanPage = () => {
 *   return (
 *     <div>
 *       <PlanFilterSection initialPlans={plans} user={user} />
 *     </div>
 *   );
 * };
 * ```
 */
const PlanFilterSection = ({
  initialPlans,
  userId,
  userNickname,
}: {
  initialPlans: Plan[];
  userId: string;
  userNickname: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);
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

  const { data: plans = initialPlans, isLoading: isPlansLoading } =
    useFilteredPlans(userId, filter);

  // 필터 초기화
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

  // 필터 적용
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
      setIsOpen(false);
    } catch (error) {
      console.error('필터링 중 오류 발생:', error);
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

  if (isPlansLoading) {
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
            <Button variant="outline" size="sm" disabled={isPlansLoading}>
              <Filter className="mr-2 h-4 w-4 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" />
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
            disabled={isPlansLoading}
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
            <MyPlanCard
              key={plan.planId}
              plan={plan}
              nickname={userNickname}
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
