'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ERROR_MESSAGES } from '@/constants/mypage.constants';
import { fetchUpdatePhoneByUserId } from '@/lib/apis/profile/update-profile.api';
import useCustomToast from '@/lib/hooks/use-custom-toast';
import { phoneSchema } from '@/lib/schemas/auth-schema';

/** 회원정보 수정 페이지의 개인 정보 섹션 컴포넌트 */
const PersonalInfo = ({
  userId,
  email,
  phone,
}: {
  userId: string;
  email: string | null;
  phone: string | null;
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const { successToast } = useCustomToast();

  const formSchema = z.object({
    phone: phoneSchema,
  });

  type PhoneValues = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<PhoneValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: phone || '',
    },
    mode: 'onChange',
  });

  // phone 필드의 현재 값 감시
  const currentPhone = watch('phone');

  /** 휴대폰 수정 버튼 클릭 핸들러 */
  const handleEditButtonClick = () => {
    setIsEditMode(true);
  };

  /** 수정 취소 버튼 클릭 핸들러 */
  const handleEditCancelButtonClick = () => {
    setIsEditMode(false);
    reset();
  };

  /** 휴대폰 수정 완료 버튼 클릭 핸들러  */
  const handleEditComplete = async (data: PhoneValues) => {
    const isConfirmed = confirm('휴대폰 번호를 수정하시겠습니까?');
    if (!isConfirmed) return;

    try {
      const result = await fetchUpdatePhoneByUserId(userId, data.phone);
      successToast(result.message);
    } catch (error: unknown) {
      let errorMessage = ERROR_MESSAGES.PHONE_UPDATE_FAILED;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      successToast(errorMessage);
    } finally {
      setIsEditMode(false);
      reset();
    }
  };

  return (
    <section
      className="m-1 rounded-24 border border-gray-100 bg-white px-8 py-6"
      aria-labelledby="profile-heading"
    >
      <h3 id="profile-heading" className="semibold-18 w-full">
        개인 정보
      </h3>

      <dl className="flex flex-col gap-2">
        <div className="flex">
          <div
            className="invisible w-[120px] flex-shrink-0"
            aria-hidden="true"
          />
          <dt className="w-[125px] flex-shrink-0 whitespace-nowrap p-[10px] text-[16px] font-medium text-gray-900">
            이메일
          </dt>
          <dd className="medium-16 block w-full whitespace-nowrap p-[10px]">
            {email}
          </dd>
        </div>
      </dl>

      <form className="flex" onSubmit={handleSubmit(handleEditComplete)}>
        <div className="invisible w-[120px] flex-shrink-0" aria-hidden="true" />
        <Label
          htmlFor="phone"
          className="w-[125px] flex-shrink-0 whitespace-nowrap p-[10px] text-[16px] font-medium text-gray-900"
        >
          휴대폰
        </Label>

        <div>
          {isEditMode ? (
            <div className="flex flex-col">
              <Input
                id="phone"
                placeholder="휴대폰 번호를 입력하세요"
                {...register('phone')}
                className="w-full rounded-[12px] border border-gray-200 px-4 py-[10px] !placeholder-gray-200"
                aria-invalid={errors.phone ? 'true' : 'false'}
              />
              {errors.phone && (
                <p
                  className="regular-14 m-2 text-red"
                  role="alert"
                  aria-live="polite"
                >
                  {errors.phone.message}
                </p>
              )}
            </div>
          ) : (
            <output className="medium-16 block w-full whitespace-nowrap p-[10px]">
              {phone ?? '번호가 등록되지 않았습니다.'}
            </output>
          )}
        </div>

        <div role="group" aria-label="편집 제어" className="ml-auto">
          {isEditMode ? (
            <div className="flex">
              <Button
                type="submit"
                className="medium-16 bg-transparent text-secondary-300 hover:bg-gray-100"
                disabled={!isValid || currentPhone === phone}
              >
                완료
              </Button>
              <Button
                type="button"
                className="medium-16 bg-transparent text-secondary-300 hover:bg-gray-100"
                onClick={handleEditCancelButtonClick}
              >
                취소
              </Button>
            </div>
          ) : (
            <Button
              type="button"
              className="medium-16 bg-transparent text-secondary-300 hover:bg-gray-100"
              onClick={handleEditButtonClick}
            >
              수정
            </Button>
          )}
        </div>
      </form>
    </section>
  );
};

export default PersonalInfo;
