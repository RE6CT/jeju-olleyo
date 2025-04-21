'use client';

import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import TextareaWithCount from '@/components/ui/textarea-with-count';
import { formatTravelPeriod } from '@/lib/utils/date';
import 'react-datepicker/dist/react-datepicker.css'; // react-datepicker 캘린더 스타일 적용
import { useChangeImageFile } from '@/lib/hooks/use-change-image-file';
import { LoadingSpinner } from '@/components/commons/loading-spinner';

const EDIT_ICON_CONSTANTS = {
  WIDTH: 24,
  HEIGHT: 24,
};
const MAX_TEXT_LENGTH = {
  TITLE: 50,
  DESCRIPTION: 500,
};
const CALENDAR_MONTHS_SHOWN = 2;

const PlanHeader = ({
  startDate,
  endDate,
  isCalendarOpen,
  setIsCalendarOpen,
  handleDateChange,
  planTitle,
  setPlanTitle,
  planDescription,
  setPlanDescription,
  targetImage,
  isReadOnly,
}: {
  startDate: Date | null;
  endDate: Date | null;
  isCalendarOpen: boolean;
  setIsCalendarOpen: (isCalendarOpen: boolean) => void;
  handleDateChange: (dates: [Date | null, Date | null]) => void;
  planTitle: string;
  setPlanTitle: (title: string) => void;
  planDescription: string;
  setPlanDescription: (description: string) => void;
  targetImage: string | null;
  isReadOnly?: boolean;
}) => {
  const { previewImage, isUploading, handleFileChange } =
    useChangeImageFile(targetImage);

  return (
    <>
      <div className="mt-6 flex gap-4">
        {/* 썸네일 업로드 영역 */}
        <Label
          htmlFor="thumbnail"
          className="relative flex h-[160px] w-[252px] cursor-pointer flex-col items-center gap-3 rounded-[12px] border border-solid border-gray-200"
        >
          <Input
            type="file"
            id="thumbnail"
            accept="image/*"
            className="hidden px-[58px] py-7"
            onChange={handleFileChange}
            disabled={isUploading || isReadOnly}
          />
          {previewImage ? (
            <Image
              src={previewImage}
              alt="썸네일"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-contain"
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
            <Image
              src="/icons/edit.svg"
              alt="edit icon"
              width={EDIT_ICON_CONSTANTS.WIDTH}
              height={EDIT_ICON_CONSTANTS.HEIGHT}
              className="absolute left-4 top-5 z-10"
            />
            <TextareaWithCount
              maxLength={MAX_TEXT_LENGTH.TITLE}
              placeholder="나만의 일정을 제목을 지어주세요"
              value={planTitle}
              onChange={(e) => setPlanTitle(e.target.value)}
              className="w-full resize-none border-0 bg-transparent py-5 pl-12 text-14 focus-visible:ring-0 focus-visible:ring-offset-0"
              readOnly={isReadOnly}
            />
          </div>

          <div className="relative w-full">
            <div className="flex items-center gap-7 px-5 pb-5 text-14">
              <span className="text-gray-500">여행 기간</span>
              <Button
                type="button"
                variant="outline"
                className="h-7 w-fit justify-start border-transparent bg-gray-50 px-5 py-1 text-left text-14 font-normal hover:bg-gray-100"
                onClick={() =>
                  !isReadOnly && setIsCalendarOpen(!isCalendarOpen)
                }
                disabled={isReadOnly}
              >
                {formatTravelPeriod(startDate, endDate)}
              </Button>
            </div>
            {isCalendarOpen && (
              <div className="absolute left-0 top-full z-50 mt-1">
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                  locale={ko}
                  monthsShown={CALENDAR_MONTHS_SHOWN}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 일정 설명 입력 */}
      <div className="relative mt-4">
        <Image
          src="/icons/edit.svg"
          alt="edit icon"
          width={EDIT_ICON_CONSTANTS.WIDTH}
          height={EDIT_ICON_CONSTANTS.HEIGHT}
          className="absolute left-4 top-5 z-10"
        />
        <TextareaWithCount
          placeholder="특별히 적어 두고 싶은 메모를 입력하세요"
          value={planDescription}
          onChange={(e) => setPlanDescription(e.target.value)}
          maxLength={MAX_TEXT_LENGTH.DESCRIPTION}
          className="h-[160px] w-full resize-none rounded-[12px] border-gray-200 py-5 pl-12 text-14 focus-visible:ring-0 focus-visible:ring-offset-0"
          readOnly={isReadOnly}
        />
      </div>
    </>
  );
};

export default PlanHeader;
