'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Loading from '@/app/loading';
import PlanHorizontalCard from '@/components/features/card/plan-horizontal_card';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/ui/pagination';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { PATH } from '@/constants/path.constants';
import {
  FILTER_TYPES,
  ITEMS_PER_PAGE,
  PUBLIC_OPTIONS,
} from '@/constants/plan.constants';
import { useFilteredPlans } from '@/lib/queries/use-get-filtered-plans';
import { Plan, FilterType, PublicOption, FilterState } from '@/types/plan.type';
import { FilterInput } from './plan-filter-input';
import { FilterMenu } from './plan-filter-menu';
import { useDeletePlan } from '@/lib/queries/use-delete-plan';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

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
  const router = useRouter();
  const { toast } = useToast();
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
  const [currentPage, setCurrentPage] = useState(1);

  const { data: plans = initialPlans, isLoading: isPlansLoading } =
    useFilteredPlans(userId, filter);
  const { mutate: deletePlan } = useDeletePlan(userId);
  const queryClient = useQueryClient();

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
    setCurrentPage(1);
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
      setCurrentPage(1);
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
    router.push(`${PATH.PLAN_DETAIL}/${planId}`);
  };

  // 계획 삭제 핸들러
  const handleDelete = (planId: number) => {
    if (confirm('정말로 이 일정을 삭제하시겠습니까?')) {
      deletePlan(planId, {
        onSuccess: () => {
          // 삭제 성공 후 현재 페이지를 유지하면서 데이터를 갱신
          queryClient.invalidateQueries({
            queryKey: ['filteredPlans', userId],
          });
          toast({
            title: '일정 삭제 완료',
            description: '일정이 성공적으로 삭제되었습니다.',
          });
        },
        onError: (error) => {
          console.error('일정 삭제 실패:', error);
          toast({
            title: '일정 삭제 실패',
            description: '일정 삭제에 실패했습니다. 다시 시도해주세요.',
            variant: 'destructive',
          });
        },
      });
    }
  };

  // 페이지네이션 계산
  const totalPages = Math.ceil((plans ?? []).length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPlans = (plans ?? []).slice(startIndex, endIndex);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
              <Image
                src="/icons/mdi_filter.svg"
                alt="filter icon"
                width={20}
                height={20}
                className="mr-2"
              />
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
            className="medium-14 text-gray-500 hover:text-gray-900"
            disabled={isPlansLoading}
          >
            필터 초기화
          </Button>
        )}
      </div>

      {(plans ?? []).length === 0 ? (
        <div className="flex h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50">
          <p className="medium-16 text-gray-500">여행 계획이 없습니다.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6">
            {currentPlans.map((plan) => (
              <PlanHorizontalCard
                key={plan.planId}
                plan={plan}
                nickname={userNickname}
                onEdit={handleEdit}
                onDelete={() => handleDelete(plan.planId)}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default PlanFilterSection;
