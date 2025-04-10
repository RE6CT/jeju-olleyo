'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ko } from 'date-fns/locale';
import { formatTravelPeriod } from '@/lib/utils/date';
import { Label } from '@/components/ui/label';
import TextareaWithCount from '@/components/ui/textarea-with-count';
import KakaoMap from '@/components/features/map/kakao-map';
import Loading from '@/app/loading';
import ErrorMessage from '@/app/error';

const PlanForm = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [description, setDescription] = useState('');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // 지도 관련 상태
  const [map, setMap] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start && end) {
      setIsCalendarOpen(false);
    }
  };

  const handleMapLoad = (map: any) => {
    setMap(map);
    setIsLoading(false);
  };

  const handleMapError = (error: Error) => {
    setError(error.message);
    setIsLoading(false);
  };

  return (
    <div className="pt-6">
      <div className="mt-6 flex gap-4">
        {/* 썸네일 업로드 영역 */}
        {/* #C7D5DC 색상이 --Gray-200이 될 예정 */}
        {/* #A7BDC8 색상이 --Gray-300이 될 예정 */}
        {/* #F9FAFB 색상이 --Gray-50이 될 예정 */}
        <Label
          htmlFor="thumbnail"
          className="flex w-[252px] cursor-pointer flex-col items-center gap-3 rounded-[12px] border border-solid border-[#C7D5DC] px-[58px] py-7"
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
        <div className="flex h-[160px] flex-1 flex-col items-start gap-7 rounded-[12px] border border-solid border-[#C7D5DC]">
          {/* TODO: 입력 아이콘 추가 예정 */}
          <div className="w-full">
            <TextareaWithCount
              maxLength={50}
              placeholder="나만의 일정을 제목을 지어주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full resize-none border-0 bg-transparent px-5 pt-5 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="relative w-full">
            <div className="flex items-center gap-7 px-5 pb-5 text-sm">
              <span className="text-gray-500">여행 기간</span>
              <Button
                type="button"
                variant="outline"
                className="h-7 w-fit justify-start border-transparent bg-[#F9FAFB] px-5 py-1 text-left text-sm font-normal hover:bg-[#E7EDF0]"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              >
                {formatTravelPeriod(startDate, endDate)}
              </Button>
            </div>
            {/* TODO: zIndex 속성 하드코딩이 되어 있음 */}
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
        <TextareaWithCount
          placeholder="특별히 적어 두고 싶은 메모를 입력하세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength={500}
          className="h-[160px] w-full resize-none rounded-[12px] border-[#C7D5DC] p-5 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>

      {/* 지도 영역 */}
      <div className="mt-4 h-[326px] w-full overflow-hidden rounded-[12px]">
        {isLoading && <Loading />}
        {error && <ErrorMessage message={error} />}
        <KakaoMap
          center={{ lat: 33.3616666, lng: 126.5291666 }}
          level={10}
          onMapLoad={handleMapLoad}
          onError={handleMapError}
        />
      </div>
    </div>
  );
};

export default PlanForm;
