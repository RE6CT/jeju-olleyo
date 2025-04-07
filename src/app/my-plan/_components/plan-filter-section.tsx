'use client';

import { useEffect, useState } from 'react';
import PlanCard from '@/components/features/plan/plan-card';
import { Plan } from '@/types/plan.type';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Filter, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getFilteredPlans } from '@/lib/apis/plan/plan';
import { Label } from '@/components/ui/label';

/**
 * 여행 계획 필터 섹션 컴포넌트
 * @param initialPlans - 초기 여행 계획 목록
 *
 * @example
 * ```tsx
 * const MyPlanPage = () => {
 *   return (
 *     <div>
 *       <PlanFilterSection initialPlans={plans} />
 *     </div>
 *   );
 * };
 * ```
 */
const PlanFilterSection = ({ initialPlans }: { initialPlans: Plan[] }) => {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [isOpen, setIsOpen] = useState(false); // 호버 상태 관리
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
  const [filter, setFilter] = useState<{
    type: 'title' | 'date' | 'public' | null;
    value: string;
  }>({ type: 'public', value: '전체' }); // 현재 적용된 필터 상태
  const [selectedFilter, setSelectedFilter] = useState<
    'title' | 'date' | 'public' | null
  >(null); // popover 내부 메뉴에서 선택된 필터 상태
  const [inputValue, setInputValue] = useState('');
  const [selectedPublicOption, setSelectedPublicOption] = useState<
    '전체' | '공개' | '비공개'
  >('전체');
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
    setSelectedPublicOption('전체');
    setPlans(initialPlans);
  };

  // 필터 적용
  const handleApplyFilter = async () => {
    setIsLoading(true);
    try {
      const userId = '37d2b9de-7a50-4a53-bb9c-b9cccbbe975a'; // TODO: 실제 사용자 ID로 교체
      const filterOptions = {
        title: selectedFilter === 'title' ? inputValue : undefined,
        startDate: selectedFilter === 'date' ? startDate : undefined,
        endDate: selectedFilter === 'date' ? endDate : undefined,
        isPublic:
          selectedFilter === 'public'
            ? selectedPublicOption === '공개'
            : undefined,
      };
      const filteredPlans = await getFilteredPlans(userId, filterOptions);
      setPlans(filteredPlans);
      if (selectedFilter === 'public') {
        setFilter({ type: selectedFilter, value: selectedPublicOption });
      } else if (selectedFilter === 'date') {
        setFilter({
          type: selectedFilter,
          value: `${startDate} ~ ${endDate}`,
        });
      } else {
        setFilter({ type: selectedFilter, value: inputValue });
      }
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
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Filter className="mr-2 h-4 w-4" />
              )}
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
            <div className="flex w-[120px] flex-col gap-2">
              <Button
                variant={selectedFilter === 'title' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => {
                  setSelectedFilter('title');
                  setInputValue(filter.type === 'title' ? filter.value : '');
                }}
              >
                제목
              </Button>
              <Button
                variant={selectedFilter === 'date' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => {
                  setSelectedFilter('date');
                  setInputValue(filter.type === 'date' ? filter.value : '');
                }}
              >
                날짜
              </Button>
              <Button
                variant={selectedFilter === 'public' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => {
                  setSelectedFilter('public');
                  setInputValue('');
                }}
              >
                공개상태
              </Button>
            </div>
            {selectedFilter && (
              <div className="flex w-[250px] flex-col gap-2 border-l p-2">
                {selectedFilter === 'public' ? (
                  <div className="flex flex-col gap-2">
                    <Button
                      variant={
                        selectedPublicOption === '전체' ? 'default' : 'ghost'
                      }
                      className="w-full justify-start"
                      onClick={() => setSelectedPublicOption('전체')}
                    >
                      전체
                    </Button>
                    <Button
                      variant={
                        selectedPublicOption === '공개' ? 'default' : 'ghost'
                      }
                      className="w-full justify-start"
                      onClick={() => setSelectedPublicOption('공개')}
                    >
                      공개
                    </Button>
                    <Button
                      variant={
                        selectedPublicOption === '비공개' ? 'default' : 'ghost'
                      }
                      className="w-full justify-start"
                      onClick={() => setSelectedPublicOption('비공개')}
                    >
                      비공개
                    </Button>
                  </div>
                ) : selectedFilter === 'date' ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <Label>여행 시작 날짜</Label>
                      <Input
                        type="date"
                        value={startDate}
                        className={
                          selectedFilter === 'date' ? 'w-[140px]' : 'w-full'
                        }
                        onChange={(e) => setStartDate(e.target.value)}
                        onFocus={() => setIsDatePickerFocused(true)}
                        onBlur={() => setIsDatePickerFocused(false)}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <Label>여행 종료 날짜</Label>
                      <Input
                        type="date"
                        value={endDate}
                        className={
                          selectedFilter === 'date' ? 'w-[140px]' : 'w-full'
                        }
                        onChange={(e) => setEndDate(e.target.value)}
                        onFocus={() => setIsDatePickerFocused(true)}
                        onBlur={() => setIsDatePickerFocused(false)}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Input
                      placeholder="제목 입력"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    />
                  </div>
                )}
                <Button
                  className="mt-2"
                  disabled={
                    selectedFilter === 'public'
                      ? filter.value === selectedPublicOption
                      : selectedFilter === 'date'
                        ? !startDate || !endDate
                        : !inputValue
                  }
                  onClick={handleApplyFilter}
                >
                  적용
                </Button>
              </div>
            )}
          </PopoverContent>
        </Popover>
        {filter.type && filter.value !== '전체' && (
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
