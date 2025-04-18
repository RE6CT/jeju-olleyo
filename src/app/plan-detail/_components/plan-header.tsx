'use client';

import { ko } from 'date-fns/locale';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import 'react-datepicker/dist/react-datepicker.css';
import { Label } from '@/components/ui/label';
import TextareaWithCount from '@/components/ui/textarea-with-count';
import { fetchUploadPlanImage } from '@/lib/apis/plan/plan.api';
import useCustomToast from '@/lib/hooks/use-custom-toast';
import { formatTravelPeriod } from '@/lib/utils/date';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

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
  planImage,
  setPlanImage,
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
  planImage: string | null;
  setPlanImage: (image: string | null) => void;
  isReadOnly?: boolean;
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const { successToast } = useCustomToast();

  // 컴포넌트가 언마운트될 때 객체 URL 해제
  useEffect(() => {
    return () => {
      if (planImage && planImage.startsWith('blob:')) {
        URL.revokeObjectURL(planImage);
      }
    };
  }, [planImage]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 크기 제한 (5MB)
    if (file.size > MAX_FILE_SIZE) {
      successToast('이미지 크기는 10MB를 초과할 수 없습니다.');
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      successToast('JPEG, PNG, GIF 형식의 이미지만 업로드 가능합니다.');
      return;
    }

    try {
      setIsUploading(true);
      // 임시 미리보기를 위해 blob URL 생성
      const tempUrl = URL.createObjectURL(file);
      setPlanImage(tempUrl);

      // FormData 생성 및 파일 추가
      const formData = new FormData();
      formData.append('file', file);

      // Supabase Storage에 이미지 업로드
      const uploadedImageUrl = await fetchUploadPlanImage(formData);
      setPlanImage(uploadedImageUrl);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      successToast('이미지 업로드에 실패했습니다.');
      setPlanImage(null);
    } finally {
      setIsUploading(false);
    }
  };

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
          {planImage ? (
            <Image
              src={planImage}
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
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-[12px] bg-black bg-opacity-50">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent" />
            </div>
          )}
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
                value={planTitle}
                onChange={(e) => setPlanTitle(e.target.value)}
                className="w-full resize-none border-0 bg-transparent py-5 pl-12 text-14 focus-visible:ring-0 focus-visible:ring-offset-0"
                readOnly={isReadOnly}
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
            value={planDescription}
            onChange={(e) => setPlanDescription(e.target.value)}
            maxLength={500}
            className="h-[160px] w-full resize-none rounded-[12px] border-gray-200 py-5 pl-12 text-14 focus-visible:ring-0 focus-visible:ring-offset-0"
            readOnly={isReadOnly}
          />
        </div>
      </div>
    </>
  );
};

export default PlanHeader;
