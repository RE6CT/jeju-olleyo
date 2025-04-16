'use client';

import PasswordInput from '@/components/features/auth/auth-password-input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ERROR_MESSAGES } from '@/constants/mypage.constants';
import { fetchUpdatePassword } from '@/lib/apis/profile/update-profile.api';
import useProviderFromCookie from '@/lib/hooks/use-get-provider';
import { changePasswordSchema } from '@/lib/schemas/change-password-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const SECURITY_INFO_STYLE = {
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

/** 회원정보 수정 페이지의 보안 섹션 컴포넌트 */
const SecurityInfo = ({ userId }: { userId: string }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const provider = useProviderFromCookie(userId);

  type passwordValues = z.infer<typeof changePasswordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<passwordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    mode: 'onChange',
  });

  /** 비밀번호 수정 버튼 클릭 핸들러 */
  const handleEditButtonClick = () => {
    setIsEditMode(true);
  };

  /** 수정 취소 버튼 클릭 핸들러 */
  const handleEditCancelButtonClick = () => {
    setIsEditMode(false);
    reset();
  };

  /** 비밀번호 수정 완료 버튼 클릭 핸들러  */
  const handleEditCompleteButtonClick = async (data: passwordValues) => {
    const isConfirmed = confirm('비밀번호를 수정하시겠습니까?');
    if (!isConfirmed) return;

    // 비밀번호 번호 수정
    try {
      const result = await fetchUpdatePassword(data.password, data.newPassword);
      alert(result.message);
    } catch (error: unknown) {
      let errorMessage = ERROR_MESSAGES.PASSWORD_UPDATE_FAILED;
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
      className={`m-1 grid grid-cols-[auto_auto_1fr_auto] gap-3 ${SECURITY_INFO_STYLE.container}`}
    >
      <h3 className={SECURITY_INFO_STYLE.title}>보안</h3>
      {isEditMode ? (
        <form
          className="contents"
          onSubmit={handleSubmit(handleEditCompleteButtonClick)}
        >
          <div className={SECURITY_INFO_STYLE.invisibleBox} />
          <Label
            htmlFor="currentPassword"
            className={SECURITY_INFO_STYLE.rowLabel}
          >
            현재 비밀번호
          </Label>
          <div className="flex flex-col">
            <PasswordInput
              id="currentPassword"
              placeholder="********"
              register={register('password')}
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="regular-14 m-2 text-red">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="invisible" />
          <div className="invisible" />
          <Label htmlFor="newPassword" className={SECURITY_INFO_STYLE.rowLabel}>
            새 비밀번호
          </Label>
          <div className="flex flex-col">
            <PasswordInput
              id="newPassword"
              placeholder="숫자, 문자, 특수문자를 포함하여 8자 이상"
              register={register('newPassword')}
              autoComplete="new-password"
            />
            {errors.newPassword && (
              <p className="regular-14 m-2 text-red">
                {errors.newPassword.message}
              </p>
            )}
          </div>
          <div className="invisible" />
          <div className="invisible" />
          <Label
            htmlFor="newPasswordCheck"
            className={SECURITY_INFO_STYLE.rowLabel}
          >
            새 비밀번호 확인
          </Label>
          <div className="flex flex-col">
            <PasswordInput
              id="newPasswordCheck"
              placeholder="숫자, 문자, 특수문자를 포함하여 8자 이상"
              register={register('confirmNewPassword')}
              autoComplete="new-password"
            />
            {errors.confirmNewPassword && (
              <p className="regular-14 m-2 text-red">
                {errors.confirmNewPassword.message}
              </p>
            )}
          </div>
          <div>
            <Button
              type="submit"
              className={SECURITY_INFO_STYLE.button}
              disabled={!isValid}
            >
              완료
            </Button>
            <Button
              className={SECURITY_INFO_STYLE.button}
              onClick={handleEditCancelButtonClick}
            >
              취소
            </Button>
          </div>
        </form>
      ) : (
        <>
          <div className={SECURITY_INFO_STYLE.invisibleBox} />
          <div className={SECURITY_INFO_STYLE.rowLabel}>현재 비밀번호</div>
          <div className={SECURITY_INFO_STYLE.rowValue}>********</div>
          {provider !== 'email' ? (
            <div className="invisible" />
          ) : (
            <Button
              className={SECURITY_INFO_STYLE.button}
              onClick={handleEditButtonClick}
            >
              수정
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default SecurityInfo;
