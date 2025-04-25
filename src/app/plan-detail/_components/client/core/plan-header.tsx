'use client';

import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { memo, useState, ChangeEvent } from 'react';
import DatePicker from 'react-datepicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TextareaWithCount from '@/components/ui/textarea-with-count';
import { formatTravelPeriod } from '@/lib/utils/date';
import 'react-datepicker/dist/react-datepicker.css'; // react-datepicker 캘린더 스타일 적용
import { useChangeImageFile } from '@/lib/hooks/use-change-image-file';
import { LoadingSpinner } from '@/components/commons/loading-spinner';
import { fetchUploadPlanImage } from '@/lib/apis/plan/plan.api';
import { useToast } from '@/lib/hooks/use-toast';
import {
  usePlanTitle,
  usePlanDescription,
  usePlanImg,
  usePlanIsReadOnly,
  usePlanStartDate,
  usePlanEndDate,
  usePlanSetTitle,
  usePlanSetDescription,
  usePlanSetStartDate,
  usePlanSetEndDate,
  usePlanSetActiveTab,
  usePlanSetImg,
  usePlanId,
} from '@/zustand/plan.store';

const EDIT_ICON_CONSTANTS = {
  WIDTH: 24,
  HEIGHT: 24,
};
const MAX_TEXT_LENGTH = {
  TITLE: 50,
  DESCRIPTION: 500,
};
const CALENDAR_MONTHS_SHOWN = 2;

const PlanHeader = memo(() => {
  const { toast } = useToast();
  const title = usePlanTitle();
  const description = usePlanDescription();
  const planImg = usePlanImg();
  const planId = usePlanId();
  const isReadOnly = usePlanIsReadOnly();
  const startDate = usePlanStartDate();
  const endDate = usePlanEndDate();
  const setStartDate = usePlanSetStartDate();
  const setEndDate = usePlanSetEndDate();
  const setTitle = usePlanSetTitle();
  const setDescription = usePlanSetDescription();
  const setActiveTab = usePlanSetActiveTab();
  const setPlanImg = usePlanSetImg();

  const { previewImage, isUploading, handleFileChange } =
    useChangeImageFile(planImg);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (start && end) {
      // 시작일로부터 14일 후의 날짜 계산
      const maxEndDate = new Date(start);
      maxEndDate.setDate(maxEndDate.getDate() + 14);

      // 선택된 종료일이 최대 종료일보다 이후인 경우
      if (end > maxEndDate) {
        setEndDate(maxEndDate);
        toast({
          title: '여행 기간 제한',
          description: '여행 기간은 최대 14박 15일까지만 선택 가능합니다.',
          variant: 'destructive',
        });
        return;
      }
    }
    setStartDate(start);
    setEndDate(end);
    if (end) {
      setIsCalendarOpen(false);
      setActiveTab(1);
    }
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 먼저 미리보기 이미지 업데이트
      await handleFileChange(e);

      if (planId) {
        // 일정 수정 시: 서버에 이미지 업로드
        const formData = new FormData();
        formData.append('file', file);
        formData.append('planId', planId.toString());

        // 최대 3번까지 재시도
        let retryCount = 0;
        const maxRetries = 3;
        let response: string | null = null;

        while (retryCount < maxRetries) {
          try {
            const result = await Promise.race([
              fetchUploadPlanImage(formData),
              new Promise(
                (_, reject) =>
                  setTimeout(
                    () => reject(new Error('업로드 시간 초과')),
                    10000,
                  ), // 10초 타임아웃
              ),
            ]);

            if (typeof result === 'string') {
              response = result;
              break;
            }
          } catch (error) {
            retryCount++;
            if (retryCount === maxRetries) throw error;
            // 재시도 전 0.5초 대기
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        }

        if (response) {
          setPlanImg(response);
        }
      } else {
        // 일정 생성 시: 임시 URL만 저장
        const imageUrl = URL.createObjectURL(file);
        setPlanImg(imageUrl);
      }
    } catch (error) {
      console.error('이미지 업로드 중 오류:', error);
    }
  };

  return (
    <>
      <div className="mt-6 flex gap-4">
        {/* 썸네일 업로드 영역 */}
        <Label
          htmlFor="thumbnail"
          className={`relative flex h-[160px] w-[252px] flex-col items-center gap-3 rounded-[12px] border border-solid border-gray-200 ${
            !isReadOnly ? 'cursor-pointer' : ''
          }`}
        >
          <Input
            type="file"
            id="thumbnail"
            accept="image/*"
            className="hidden px-[58px] py-7"
            onChange={handleImageChange}
            disabled={isUploading || isReadOnly}
          />
          {previewImage ? (
            <Image
              src={previewImage}
              alt="썸네일"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3">
              <p className="text-24 text-gray-300">+</p>
              <p className="text-center text-14 font-medium text-gray-300">
                {isReadOnly
                  ? '등록된 이미지가 없습니다'
                  : '내 일정을 대표할\n이미지를 추가하세요'}
              </p>
            </div>
          )}
          {isUploading && <LoadingSpinner />}
        </Label>

        {/* 입력 영역 */}
        <div className="flex h-[160px] flex-1 flex-col items-start gap-7 rounded-[12px] border border-solid border-gray-200">
          <div className="relative w-full">
            {!isReadOnly && (
              <Image
                src="/icons/edit.svg"
                alt="edit icon"
                width={EDIT_ICON_CONSTANTS.WIDTH}
                height={EDIT_ICON_CONSTANTS.HEIGHT}
                className="absolute left-4 top-5 z-10"
              />
            )}
            <TextareaWithCount
              maxLength={MAX_TEXT_LENGTH.TITLE}
              placeholder="나만의 일정을 제목을 지어주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full resize-none border-0 bg-transparent py-5 ${
                isReadOnly ? 'pl-5' : 'pl-12'
              } text-14 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ${
                isReadOnly ? 'cursor-default' : ''
              }`}
              readOnly={isReadOnly}
              showCount={!isReadOnly}
            />
          </div>

          <div className="relative w-full">
            <div className="flex items-center gap-7 px-5 pb-5 text-14">
              <span>여행 기간</span>
              <Button
                type="button"
                variant="outline"
                className="disabled:text-black-900 h-7 w-fit justify-start border-transparent bg-gray-50 px-5 py-1 text-left text-14 font-normal disabled:opacity-100"
                onClick={() =>
                  !isReadOnly && setIsCalendarOpen(!isCalendarOpen)
                }
                disabled={isReadOnly}
              >
                {formatTravelPeriod(startDate, endDate)}
              </Button>
            </div>
            {isCalendarOpen && (
              <div className="absolute left-0 top-full z-[100] mt-1">
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                  locale={ko}
                  monthsShown={CALENDAR_MONTHS_SHOWN}
                  maxDate={
                    startDate
                      ? new Date(
                          new Date(startDate).setDate(startDate.getDate() + 14),
                        )
                      : undefined
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 일정 설명 입력 */}
      <div className="relative z-30 mt-4">
        {!isReadOnly && (
          <Image
            src="/icons/edit.svg"
            alt="edit icon"
            width={EDIT_ICON_CONSTANTS.WIDTH}
            height={EDIT_ICON_CONSTANTS.HEIGHT}
            className="absolute left-4 top-5 z-10"
          />
        )}
        <TextareaWithCount
          placeholder="특별히 적어 두고 싶은 메모를 입력하세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={MAX_TEXT_LENGTH.DESCRIPTION}
          className={`h-[160px] w-full resize-none rounded-[12px] border border-gray-200 py-5 ${
            isReadOnly ? 'cursor-default pl-5' : 'pl-12'
          } text-14 focus-visible:ring-0 focus-visible:ring-offset-0`}
          readOnly={isReadOnly}
          showCount={!isReadOnly}
        />
      </div>
    </>
  );
});

PlanHeader.displayName = 'PlanHeader'; // React DevTools에서 React.memo 컴포넌트 이름 표시

export default PlanHeader;
