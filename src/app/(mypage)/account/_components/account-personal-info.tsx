'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ERROR_MESSAGES } from '@/constants/mypage.constants';
import { fetchUpdatePhoneByUserId } from '@/lib/apis/profile/update-profile.api';
import { phoneSchema } from '@/lib/schemas/auth-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const PERSONAL_INFO_STYLE = {
  container:
    'px-8 py-6 rounded-24 bg-white border-gray-100 border border-gray-100',
  invisibleBox: 'invisible w-[120px]',
  title: 'semibold-18 col-span-4 w-full',
  input:
    'rounded-[12px] border border-gray-200 px-4 py-[10px] !placeholder-gray-200',
  rowLabel: 'medium-16 text-[16px] whitespace-nowrap w-[107px] p-[10px]',
  rowValue: 'whitespace-nowrap medium-16 p-[10px]',
  button: 'medium-16 bg-transparent text-secondary-300 hover:bg-gray-100',
};

/** 회원정보 수정 페이지의 개인 정보 섹션 컴포넌트 */
const PersonalInfo = ({
  userId,
  email,
  phone,
}: {
  userId: string;
  email: string;
  phone: string;
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

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
      phone: '',
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
      alert(result.message);
    } catch (error: unknown) {
      let errorMessage = ERROR_MESSAGES.PHONE_UPDATE_FAILED;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      alert(errorMessage);
    } finally {
      setIsEditMode(false);
      reset();
    }
  };

  return (
    <div
      className={`m-1 grid grid-cols-[auto_auto_1fr_auto] gap-3 ${PERSONAL_INFO_STYLE.container}`}
    >
      <h3 className={PERSONAL_INFO_STYLE.title}>개인 정보</h3>
      <div className={PERSONAL_INFO_STYLE.invisibleBox} />
      <div className={PERSONAL_INFO_STYLE.rowLabel}>이메일</div>
      <div className={PERSONAL_INFO_STYLE.rowValue}>{email}</div>
      <div className="invisible" />
      <div className="invisible" />
      <form className="contents" onSubmit={handleSubmit(handleEditComplete)}>
        <Label htmlFor="phone" className={PERSONAL_INFO_STYLE.rowLabel}>
          휴대폰
        </Label>
        {isEditMode ? (
          <div className="flex flex-col">
            <Input id="phone" placeholder={`${phone}`} {...register('phone')} />
            {errors.phone && (
              <p className="regular-14 m-2 text-destructive">
                {errors.phone.message}
              </p>
            )}
          </div>
        ) : (
          <span className={PERSONAL_INFO_STYLE.rowValue}>{phone}</span>
        )}
        {isEditMode ? (
          <div>
            <Button
              type="submit"
              className={PERSONAL_INFO_STYLE.button}
              disabled={!isValid || currentPhone === phone}
            >
              완료
            </Button>
            <Button
              className={PERSONAL_INFO_STYLE.button}
              onClick={handleEditCancelButtonClick}
            >
              취소
            </Button>
          </div>
        ) : (
          <Button
            className={PERSONAL_INFO_STYLE.button}
            onClick={handleEditButtonClick}
          >
            수정
          </Button>
        )}
      </form>
    </div>
  );
};

export default PersonalInfo;
