'use client';

import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { memo, useState, ChangeEvent, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TextareaWithCount from '@/components/ui/textarea-with-count';
import { formatTravelPeriod, formatSimpleTravelPeriod } from '@/lib/utils/date';
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
import { Image as ImageIcon } from 'lucide-react';

const EDIT_ICON_CONSTANTS = {
  WIDTH: 24,
  HEIGHT: 24,
};

const MOBILE_EDIT_ICON_CONSTANTS = {
  WIDTH: 16,
  HEIGHT: 16,
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      // 파일 크기 제한 (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: '파일 크기 초과',
          description: '이미지 파일은 5MB 이하만 업로드 가능합니다.',
          variant: 'destructive',
        });
        return;
      }

      // 먼저 미리보기 이미지 업데이트
      await handleFileChange(e);

      if (planId) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('planId', planId.toString());

        let retryCount = 0;
        const maxRetries = 3;
        let response: string | null = null;

        while (retryCount < maxRetries) {
          try {
            const result = await Promise.race([
              fetchUploadPlanImage(formData),
              new Promise((_, reject) =>
                setTimeout(() => reject(new Error('업로드 시간 초과')), 10000),
              ),
            ]);

            if (typeof result === 'string') {
              response = result;
              break;
            }
          } catch (error) {
            console.error(`이미지 업로드 시도 ${retryCount + 1} 실패:`, error);
            retryCount++;
            if (retryCount === maxRetries) {
              toast({
                title: '이미지 업로드 실패',
                description: '이미지 업로드에 실패했습니다. 다시 시도해주세요.',
                variant: 'destructive',
              });
              throw error;
            }
            await new Promise((resolve) => setTimeout(resolve, 500));
          }
        }

        if (response) {
          // Zustand 상태 업데이트 및 로컬 스토리지에 저장
          setPlanImg(response);
          localStorage.setItem(`planImg_${planId}`, response);

          toast({
            title: '이미지 업로드 성공',
            description: '이미지가 성공적으로 업로드되었습니다.',
          });
        }
      } else {
        const imageUrl = URL.createObjectURL(file);
        setPlanImg(imageUrl);
      }
    } catch (error) {
      console.error('이미지 업로드 중 오류:', error);
      toast({
        title: '이미지 업로드 실패',
        description: '이미지 업로드 중 오류가 발생했습니다. 다시 시도해주세요.',
        variant: 'destructive',
      });
    }
  };

  return (
    <section className="max-md:rounded-[12px] max-md:border max-md:border-solid max-md:border-gray-200 max-md:p-3">
      <div className="flex gap-[10px] md:gap-4">
        {/* 썸네일 업로드 영역 */}
        <Label
          htmlFor="thumbnail"
          className={`relative flex h-[79px] w-[110px] flex-shrink-0 flex-col items-center gap-[8px] rounded-[12px] border border-solid border-gray-200 md:h-[160px] md:w-[252px] md:gap-3 ${
            !isReadOnly ? 'cursor-pointer' : ''
          }`}
        >
          <Input
            type="file"
            id="thumbnail"
            accept="image/*"
            className="hidden px-[10px] md:px-[58px] md:py-7"
            onChange={handleImageChange}
            disabled={isUploading || isReadOnly}
          />
          {previewImage ? (
            <Image
              src={previewImage}
              alt="썸네일"
              fill
              sizes="(max-width: 768px) 110px, (max-width: 1200px) 252px, 252px"
              className="object-cover object-center"
              unoptimized
            />
          ) : (
            <>
              <div className="flex h-[79px] w-[110px] items-center justify-center md:hidden">
                <ImageIcon className="h-6 w-6 text-gray-300" />
              </div>
              <div className="hidden h-full w-full flex-col items-center justify-center gap-3 md:flex">
                <p className="text-24 text-gray-300">+</p>
                <p className="medium-14 text-center text-gray-300">
                  {!isReadOnly && (
                    <span className="hidden md:inline">
                      내 일정을 대표할
                      <br />
                      이미지를 추가하세요
                    </span>
                  )}
                </p>
              </div>
            </>
          )}
          {isUploading && <LoadingSpinner />}
        </Label>

        {/* 입력 영역 */}
        <div className="flex h-[79px] flex-1 flex-col items-start md:h-[160px] md:gap-7 md:rounded-[12px] md:border md:border-solid md:border-gray-200">
          <div className="relative w-full">
            {!isReadOnly && (
              <Image
                src="/icons/edit.svg"
                alt="edit icon"
                width={
                  isMobile
                    ? MOBILE_EDIT_ICON_CONSTANTS.WIDTH
                    : EDIT_ICON_CONSTANTS.WIDTH
                }
                height={
                  isMobile
                    ? MOBILE_EDIT_ICON_CONSTANTS.HEIGHT
                    : EDIT_ICON_CONSTANTS.HEIGHT
                }
                className="absolute z-10 md:left-4 md:top-5"
              />
            )}
            <TextareaWithCount
              maxLength={MAX_TEXT_LENGTH.TITLE}
              placeholder="나만의 일정을 제목을 지어주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full resize-none border-0 bg-transparent py-0 md:py-5 ${
                isReadOnly ? 'pl-0 md:pl-5' : 'pl-6 md:pl-12'
              } regular-18 md:regular-14 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 ${
                isReadOnly ? 'cursor-default' : ''
              }`}
              readOnly={isReadOnly}
              showCount={!isReadOnly}
            />
          </div>

          <div className="relative w-full">
            <div className="regular-14 md:text-black-900 flex items-center text-gray-500 md:gap-3 md:gap-7 md:px-5 md:pb-5">
              {!isReadOnly && (
                <span className="hidden md:inline">여행 기간</span>
              )}
              <Button
                type="button"
                variant="outline"
                className="md:disabled:text-black-900 w-fit justify-start border-transparent bg-transparent p-0 text-left text-14 font-normal disabled:opacity-100 md:h-7 md:bg-gray-50 md:px-5 md:py-1"
                onClick={() =>
                  !isReadOnly && setIsCalendarOpen(!isCalendarOpen)
                }
                disabled={isReadOnly}
              >
                <span className="md:hidden">
                  {formatSimpleTravelPeriod(startDate, endDate)}
                </span>
                <span className="hidden md:inline">
                  {formatTravelPeriod(startDate, endDate)}
                </span>
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
                  className="max-md:origin-top-left max-md:scale-90"
                  calendarClassName="max-md:!w-[330px] max-md:!left-[-30%] md:!w-[488px] md:!left-[-10%] lg:!left-[0%] !transform-none !border-0 !shadow-none"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 일정 설명 입력 */}
      <div className="relative z-30 mt-[10px] md:mt-4">
        {!isReadOnly && (
          <Image
            src="/icons/edit.svg"
            alt="edit icon"
            width={
              isMobile
                ? MOBILE_EDIT_ICON_CONSTANTS.WIDTH
                : EDIT_ICON_CONSTANTS.WIDTH
            }
            height={
              isMobile
                ? MOBILE_EDIT_ICON_CONSTANTS.HEIGHT
                : EDIT_ICON_CONSTANTS.HEIGHT
            }
            className="absolute z-10 md:left-4 md:top-5"
          />
        )}
        <TextareaWithCount
          placeholder="특별히 적어 두고 싶은 메모를 입력하세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={MAX_TEXT_LENGTH.DESCRIPTION}
          className={`w-full resize-none border-0 bg-transparent p-0 text-[10px] focus-visible:ring-0 focus-visible:ring-offset-0 md:h-[160px] md:rounded-[12px] md:border md:border-gray-200 md:py-5 md:text-[14px] md:leading-[20px] ${
            isReadOnly ? 'pl-0 md:pl-5' : 'pl-6 md:pl-12'
          }`}
          readOnly={isReadOnly}
          showCount={!isReadOnly}
        />
      </div>
    </section>
  );
});

PlanHeader.displayName = 'PlanHeader'; // React DevTools에서 React.memo 컴포넌트 이름 표시

export default PlanHeader;
