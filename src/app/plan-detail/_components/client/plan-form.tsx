'use client';

import { DayPlaces } from '@/types/plan-detail.type';
import { PlanWithDays } from '@/types/plan.type';
import {
  usePlanSetTitle,
  usePlanSetDescription,
  usePlanSetImg,
  usePlanSetDayPlaces,
  usePlanSetActiveTab,
  usePlanSetStartDate,
  usePlanSetEndDate,
  usePlanSetIsReadOnly,
  usePlanSetId,
  usePlanResetState,
} from '@/zustand/plan.store';
import { useEffect, useState } from 'react';

import PlanHeader from './core/plan-header';
import PlanMap from './core/plan-map';
import PlanSchedule from './core/plan-schedule';
import PlanSidemenu from './core/plan-sidemenu';
import { useCurrentUser } from '@/lib/queries/auth-queries';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { MessageCircle } from 'lucide-react';

const PlanForm = ({
  initialPlan,
  initialDayPlaces,
  isReadOnly = true,
}: {
  initialPlan?: PlanWithDays;
  initialDayPlaces?: DayPlaces;
  isReadOnly?: boolean;
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const { data: user } = useCurrentUser();
  const userId = user?.id || null;

  const setTitle = usePlanSetTitle();
  const setDescription = usePlanSetDescription();
  const setPlanImg = usePlanSetImg();
  const setActiveTab = usePlanSetActiveTab();
  const setStartDate = usePlanSetStartDate();
  const setEndDate = usePlanSetEndDate();
  const setIsReadOnly = usePlanSetIsReadOnly();
  const setDayPlaces = usePlanSetDayPlaces();
  const setPlanId = usePlanSetId();
  const resetPlanState = usePlanResetState();

  // 초기값 설정
  useEffect(() => {
    if (initialPlan) {
      // 상태 초기화 후 새로운 값 설정
      resetPlanState();

      setTitle(initialPlan.title);
      setDescription(initialPlan.description || '');

      // 로컬 스토리지에서 이미지 URL 확인
      const storedImageUrl = localStorage.getItem(
        `planImg_${initialPlan.planId}`,
      );
      setPlanImg(storedImageUrl || initialPlan.planImg || '');

      setPlanId(initialPlan.planId);
      setActiveTab('전체보기');
      setStartDate(
        initialPlan.travelStartDate
          ? new Date(initialPlan.travelStartDate)
          : null,
      );
      setEndDate(
        initialPlan.travelEndDate ? new Date(initialPlan.travelEndDate) : null,
      );
      setIsReadOnly(isReadOnly);
      setDayPlaces(initialDayPlaces || {});
    } else {
      // 새로운 일정을 만들 때는 모든 데이터를 초기화
      resetPlanState();
      setIsReadOnly(isReadOnly);
    }
  }, [
    initialPlan,
    isReadOnly,
    initialDayPlaces,
    setTitle,
    setDescription,
    setPlanImg,
    setPlanId,
    setActiveTab,
    setStartDate,
    setEndDate,
    setIsReadOnly,
    setDayPlaces,
    resetPlanState,
  ]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex h-full flex-col pb-[86px] md:pb-0">
      <PlanHeader />
      <div className="flex flex-1 gap-4">
        <div className="flex flex-1 flex-col">
          <div className="sticky top-0 z-40">
            <div className="h-4 w-[343px] bg-white md:w-[498px] lg:w-[656px]" />
            <PlanMap />
          </div>
          <div className="sticky top-[137px] z-40 h-4 w-[343px] bg-white md:top-[244px] md:w-[498px] lg:w-[656px]" />
          <PlanSchedule />
        </div>
        <div className="hidden md:block">
          <PlanSidemenu />
        </div>
        {isReadOnly && (
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className="fixed bottom-24 right-[20px] z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg"
                  style={{
                    right: 'max(20px, calc((100vw - 375px) / 2 + 20px))',
                  }}
                >
                  <MessageCircle className="h-6 w-6" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="mx-auto h-[60vh] max-h-[500px] w-full max-w-[375px] rounded-t-[20px] p-[16px_20px_12px_20px]"
              >
                <SheetTitle className="sr-only">일정 정보</SheetTitle>
                <PlanSidemenu />
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanForm;
