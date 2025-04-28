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
    handleApplyFilter,
    handleDelete,
    handleFilterClick,
  } = usePlanFilter(userId);

  const { data: plans = plansList, isLoading: isPlansLoading } =
    useGetFilteredPlans(userId, filter);

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
    <section className="flex flex-col items-center gap-[21px]">
      <div className="flex w-full items-center justify-start gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger
            asChild
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => handleMouseLeave(isDatePickerFocused)}
            className="border-none"
          >
            <Button variant="outline" size="sm" disabled={isPlansLoading}>
              <Image
                src="/icons/mdi_filter.svg"
                alt="filter icon"
                width={20}
                height={20}
              />
              필터
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="mt-[-4px] flex gap-2 rounded-md border bg-popover p-1"
            align="start"
            sideOffset={5}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => handleMouseLeave(isDatePickerFocused)}
          >
            <FilterMenu
              selectedFilter={selectedFilter}
              setSelectedFilter={setSelectedFilter}
              filter={filter}
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
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
                setIsDatePickerFocused={setIsDatePickerFocused}
                filter={filter}
                applyFilter={handleApplyFilterAndClose}
              />
            )}
          </PopoverContent>
        </Popover>
        {filter.type && filter.value !== PUBLIC_OPTIONS.ALL && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              resetFilter();
              setCurrentPage(INITIAL_PAGE);
            }}
            className="medium-14 text-gray-500 hover:text-gray-900"
            disabled={isPlansLoading}
          >
            필터 초기화
          </Button>
        )}
      </div>

      {(plans ?? []).length === 0 ? (
        <EmptyResult
          buttonText="내 일정 만들러 가기"
          href={PATH.PLAN_NEW}
          imagePath="/empty-result/empty_plans.png"
        />
      ) : (
        <>
          <div className="grid w-full grid-cols-1 gap-5">
            {currentPagePlans.map((plan) => (
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
    </section>
  );
};

export default PlanFilterSection;
