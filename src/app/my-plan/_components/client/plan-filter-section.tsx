'use client';
import Image from 'next/image';
import Loading from '@/app/loading';
import PlanHorizontalCard from '@/components/features/card/plan-horizontal_card';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/ui/pagination';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  ITEMS_PER_PAGE,
  PUBLIC_OPTIONS,
  INITIAL_PAGE,
  FILTER_TYPES,
} from '@/constants/plan.constants';
import { useGetFilteredPlans } from '@/lib/queries/use-get-filtered-plans';
import { Plan } from '@/types/plan.type';
import { FilterInput } from '@/app/my-plan/_components/client/plan-filter-input';
import FilterMenu from '@/app/my-plan/_components/client/plan-filter-menu';
import { usePlanFilter } from '@/lib/hooks/use-plan-filter';
import { usePagination } from '@/lib/hooks/use-pagination';
import { usePopover } from '@/lib/hooks/use-popover';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/path.constants';
import EmptyResult from '@/components/commons/empty-result-link';
import FilterTag from './filter-tag';
import PlanVerticalCard from '@/components/features/card/plan-vertical-card';
import React from 'react';

const FILTER_ICON_SIZE = 20;
const POPOVER_SIDE_OFFSET = 5;
/**
 * 여행 계획 필터 섹션 컴포넌트
 * @param plansList - 여행 계획 목록
 * @param userId - 사용자 ID
 * @param userNickname - 사용자 닉네임
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
  plansList,
  userId,
  userNickname,
}: {
  plansList: Plan[];
  userId: string;
  userNickname: string;
}) => {
  const router = useRouter();

  const {
    filters,
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
  } = usePlanFilter(userId);

  const { data: plans = plansList, isLoading: isPlansLoading } =
    useGetFilteredPlans(userId, filters);

  const { currentPage, setCurrentPage, handlePageChange } = usePagination();
  const { isOpen, setIsOpen, handleMouseLeave } = usePopover();

  const totalPages = Math.ceil((plans ?? []).length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPagePlans = (plans ?? []).slice(startIndex, endIndex);

  const handleApplyFilterAndClose = async () => {
    await handleApplyFilter();
    setIsOpen(false);
    setCurrentPage(INITIAL_PAGE);
  };

  const handleEdit = (planId: number) => {
    router.push(`${PATH.PLAN_DETAIL}/${planId}`);
  };

  if (isPlansLoading) {
    return <Loading />;
  }

  return (
    <section className="flex flex-col items-center gap-[10px] pb-[86px] md:gap-[44px] md:pb-0 lg:gap-[21px]">
      <div className="flex w-full items-center justify-start gap-[10px] md:gap-10">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger
            asChild
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => handleMouseLeave(isDatePickerFocused)}
            className="border-none"
          >
            <Button variant="outline" size="sm" disabled={isPlansLoading}>
              <Image
                src="/icons/mdi_filter_mobile.svg"
                alt="filter icon"
                width={FILTER_ICON_SIZE}
                height={FILTER_ICON_SIZE}
                className="md:hidden"
              />
              <Image
                src="/icons/mdi_filter.svg"
                alt="filter icon"
                width={FILTER_ICON_SIZE}
                height={FILTER_ICON_SIZE}
                className="hidden md:block"
              />
              필터
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="mt-[-4px] flex gap-2 rounded-md border bg-popover p-1"
            align="start"
            sideOffset={POPOVER_SIDE_OFFSET}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => handleMouseLeave(isDatePickerFocused)}
          >
            <FilterMenu
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              filters={filters}
              setInputValue={setInputValue}
              handleFilterClick={handleFilterClick}
            />
            {selectedFilter && (
              <FilterInput
                selectedFilter={selectedFilter}
                inputValue={inputValue}
                setInputValue={setInputValue}
                selectedPublicOption={selectedPublicOption}
                setSelectedPublicOption={setSelectedPublicOption}
                date={date}
                setDate={setDate}
                setIsDatePickerFocused={setIsDatePickerFocused}
                filters={filters}
                applyFilter={handleApplyFilterAndClose}
              />
            )}
          </PopoverContent>
        </Popover>
        {/* 필터 카드 렌더링 */}
        <div className="flex flex-1 items-center gap-2">
          <div className="scrollbar-hide md:max-w-auto flex max-w-[200px] items-center gap-2 overflow-x-auto whitespace-nowrap">
            {filters.keyword && (
              <FilterTag
                onRemove={() => {
                  removeFilter(FILTER_TYPES.KEYWORD);
                  setCurrentPage(INITIAL_PAGE);
                }}
                ariaLabel="키워드 필터 삭제"
              >
                #{filters.keyword}
              </FilterTag>
            )}
            {filters.date && (
              <FilterTag
                onRemove={() => {
                  removeFilter(FILTER_TYPES.DATE);
                  setCurrentPage(INITIAL_PAGE);
                }}
                ariaLabel="날짜 필터 삭제"
              >
                #{filters.date}
              </FilterTag>
            )}
            {filters.public && filters.public !== PUBLIC_OPTIONS.ALL && (
              <FilterTag
                onRemove={() => {
                  removeFilter(FILTER_TYPES.PUBLIC);
                  setCurrentPage(INITIAL_PAGE);
                }}
                ariaLabel="공개상태 필터 삭제"
              >
                #{filters.public === PUBLIC_OPTIONS.PUBLIC ? '공개' : '비공개'}
              </FilterTag>
            )}
          </div>
          {(filters.keyword ||
            filters.date ||
            (filters.public && filters.public !== PUBLIC_OPTIONS.ALL)) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                resetFilter();
                setCurrentPage(INITIAL_PAGE);
              }}
              className="lg:medium-14 md:medium-12 shrink-0 px-3 text-[11px] text-gray-500 hover:text-gray-900"
              disabled={isPlansLoading}
            >
              필터 초기화
            </Button>
          )}
        </div>
      </div>

      {(plans ?? []).length === 0 ? (
        <EmptyResult
          buttonText="내 일정 만들러 가기"
          href={PATH.PLAN_NEW}
          imagePath="/empty-result/empty_plans.png"
        />
      ) : (
        <>
          <div className="flex w-full flex-wrap justify-between gap-3 md:grid md:grid-cols-1 md:gap-[27px] lg:gap-5">
            {currentPagePlans.map((plan) => (
              <React.Fragment key={plan.planId}>
                <div className="w-[calc(50%-6px)] md:hidden">
                  <PlanVerticalCard
                    plan={plan}
                    onEdit={handleEdit}
                    onDelete={() => handleDelete(plan.planId)}
                    isDropdownVisible
                  />
                </div>
                <div className="hidden md:block">
                  <PlanHorizontalCard
                    plan={plan}
                    nickname={userNickname}
                    onEdit={handleEdit}
                    onDelete={() => handleDelete(plan.planId)}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
};

export default PlanFilterSection;
