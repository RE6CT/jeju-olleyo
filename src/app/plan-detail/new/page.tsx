'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { formatTravelPeriod } from '@/lib/utils/date';
import { Label } from '@/components/ui/label';

const PlanDetailNewPage = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [description, setDescription] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      setIsCalendarOpen(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="border-b">
        {/* 헤더 영역 */}
        <div className="px-9 py-6">
          <div className="flex gap-3">
            <span className="font-pretendard text-28 font-bold leading-[130%]">
              내 일정 만들기
            </span>
            {/* TODO: 이미지 추가 */}
          </div>

          <div className="mt-6 flex gap-4">
            {/* 썸네일 업로드 영역 */}
            {/* #C7D5DC 색상이 --Gray-200이 될 예정 */}
            {/* #A7BDC8 색상이 --Gray-300이 될 예정 */}
            <Label
              htmlFor="thumbnail"
              className="flex w-[252px] cursor-pointer flex-col items-center gap-3 rounded-xl border border-solid border-[#C7D5DC] px-[58px] py-7"
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
                <p className="text-3xl text-[#A7BDC8]">+</p>
                <p className="font-pretendard text-center text-sm font-medium leading-[150%] text-[#A7BDC8]">
                  내 일정을 대표할
                  <br />
                  이미지를 추가하세요
                </p>
              </div>
            </Label>

            {/* 입력 영역 */}
            <div className="flex h-[160px] flex-1 flex-col items-start gap-7 rounded-xl border border-solid border-[#C7D5DC] p-5">
              {/* TODO: 입력 아이콘 추가 예정 */}
              <Input
                type="text"
                maxLength={50}
                placeholder="나만의 일정을 제목을 지어주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-10 w-full border-0 bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
              />

              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 w-full justify-start border-transparent px-3 text-left text-sm font-normal"
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                >
                  {formatTravelPeriod(startDate, endDate)}
                </Button>
                {isCalendarOpen && (
                  <div className="absolute left-0 top-full z-10 mt-1">
                    <DatePicker
                      selected={startDate}
                      onChange={handleDateChange}
                      startDate={startDate}
                      endDate={endDate}
                      selectsRange // 두 개의 날짜를 선택할 수 있도록 설정
                      inline
                      locale={ko}
                      monthsShown={2} // 2개월씩 보여줌
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 일정 설명 입력 */}
          <div className="mt-4">
            {/* TODO: 입력 아이콘 추가 예정 */}
            <Textarea
              placeholder="특별히 적어 두고 싶은 메모를 입력하세요"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] resize-none border-gray-300 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailNewPage;
