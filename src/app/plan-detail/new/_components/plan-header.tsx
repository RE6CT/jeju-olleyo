'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { formatTravelPeriod } from '@/lib/utils/date';
import { Label } from '@/components/ui/label';
import TextareaWithCount from '@/components/ui/textarea-with-count';

const PlanHeader = ({
  startDate,
  endDate,
  isCalendarOpen,
  setIsCalendarOpen,
  handleDateChange,
}: {
  startDate: Date | null;
  endDate: Date | null;
  isCalendarOpen: boolean;
  setIsCalendarOpen: (isCalendarOpen: boolean) => void;
  handleDateChange: (dates: [Date | null, Date | null]) => void;
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <>
      <div className="mt-6 flex gap-4">
        {/* 썸네일 업로드 영역 */}
        <Label
          htmlFor="thumbnail"
          className="flex w-[252px] cursor-pointer flex-col items-center gap-3 rounded-[12px] border border-solid border-gray-200 px-[58px] py-7"
        >
          <Input
            type="file"
            id="thumbnail"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // TODO: 이미지 업로드 처리
              }
            }}
          />
          <div className="flex h-full flex-col items-center justify-center gap-3">
            {/* svg 대체 필요 */}
            <p className="text-24 text-gray-300">+</p>
            <p className="text-center text-14 font-medium text-gray-300">
              내 일정을 대표할
              <br />
              이미지를 추가하세요
            </p>
          </div>
        </Label>

        {/* 입력 영역 */}
        <div className="flex h-[160px] flex-1 flex-col items-start gap-7 rounded-[12px] border border-solid border-gray-200">
          <div className="w-full">
            <div className="relative">
              <Image
                src="/icons/edit.svg"
                alt="edit icon"
                width={24}
                height={24}
                className="absolute left-4 top-5 z-10"
              />
              <TextareaWithCount
                maxLength={50}
                placeholder="나만의 일정을 제목을 지어주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full resize-none border-0 bg-transparent py-5 pl-12 text-14 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          <div className="relative w-full">
            <div className="flex items-center gap-7 px-5 pb-5 text-14">
              <span className="text-gray-500">여행 기간</span>
              <Button
                type="button"
                variant="outline"
                className="h-7 w-fit justify-start border-transparent bg-gray-50 px-5 py-1 text-left text-14 font-normal hover:bg-gray-100"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
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
                  monthsShown={2}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 일정 설명 입력 */}
      <div className="mt-4">
        <div className="relative">
          <Image
            src="/icons/edit.svg"
            alt="edit icon"
            width={24}
            height={24}
            className="absolute left-4 top-5 z-10"
          />
          <TextareaWithCount
            placeholder="특별히 적어 두고 싶은 메모를 입력하세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={500}
            className="h-[160px] w-full resize-none rounded-[12px] border-gray-200 py-5 pl-12 text-14 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>
    </>
  );
};

export default PlanHeader;
