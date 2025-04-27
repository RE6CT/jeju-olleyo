'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ERROR_MESSAGES } from '@/constants/mypage.constants';
import { fetchUpdatePassword } from '@/lib/apis/profile/update-profile.api';
import useCustomToast from '@/lib/hooks/use-custom-toast';
import useProviderFromCookie from '@/lib/hooks/use-get-provider';
import { changePasswordSchema } from '@/lib/schemas/change-password-schema';
import PasswordInput from '@/components/features/input/password-input';

/** 회원정보 수정 페이지의 보안 섹션 컴포넌트 */
const SecurityInfo = ({ userId }: { userId: string }) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const provider = useProviderFromCookie(userId);
  const { successToast } = useCustomToast();

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
      successToast(result.message);
    } catch (error: unknown) {
      let errorMessage = ERROR_MESSAGES.PASSWORD_UPDATE_FAILED;
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
      className="m-1 flex flex-col gap-6 rounded-24 border border-gray-100 bg-white px-8 py-6 lg:gap-0"
      aria-labelledby="security-heading"
    >
      <h3 id="security-heading" className="semibold-18 w-full">
        보안
      </h3>
      {isEditMode ? (
        // 비밀번호 input
        <form onSubmit={handleSubmit(handleEditCompleteButtonClick)}>
          <fieldset>
            <legend className="sr-only">비밀번호 변경</legend>
            <div className="flex items-center">
              <div
                className="invisible hidden w-[120px] flex-shrink-0 lg:block"
                aria-hidden="true"
              />
              <Label
                htmlFor="currentPassword"
                className="w-[125px] flex-shrink-0 whitespace-nowrap p-[10px] text-[16px] font-medium text-gray-900"
              >
                현재 비밀번호
              </Label>
              <div className="flex w-full flex-col lg:w-[235px]">
                <PasswordInput
                  id="currentPassword"
                  placeholder="현재 비밀번호를 입력하세요"
                  register={register('password')}
                  autoComplete="current-password"
                  aria-required="true"
                />
                {errors.password && (
                  <p
                    className="regular-14 m-2 text-red"
                    role="alert"
                    aria-live="polite"
                  >
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center">
              <div
                className="invisible hidden w-[120px] flex-shrink-0 lg:block"
                aria-hidden="true"
              />
              <Label
                htmlFor="newPassword"
                className="w-[125px] flex-shrink-0 whitespace-nowrap p-[10px] text-[16px] font-medium text-gray-900"
              >
                새 비밀번호
              </Label>
              <div className="flex w-full flex-col lg:w-[235px]">
                <PasswordInput
                  id="newPassword"
                  placeholder="새 비밀번호를 입력하세요"
                  register={register('newPassword')}
                  autoComplete="new-password"
                  aria-required="true"
                />
                {errors.newPassword && (
                  <p
                    className="regular-14 m-2 text-red"
                    role="alert"
                    aria-live="polite"
                  >
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
              <div className="flex items-center">
                <div
                  className="invisible hidden w-[120px] flex-shrink-0 lg:block"
                  aria-hidden="true"
                />
                <Label
                  htmlFor="newPasswordCheck"
                  className="w-[125px] flex-shrink-0 whitespace-nowrap p-[10px] text-[16px] font-medium text-gray-900"
                >
                  새 비밀번호 확인
                </Label>
                <div className="flex w-full flex-col lg:w-[235px]">
                  <PasswordInput
                    id="newPasswordCheck"
                    placeholder="새 비밀번호를 입력하세요"
                    register={register('confirmNewPassword')}
                    autoComplete="new-password"
                    aria-required="true"
                  />
                  {errors.confirmNewPassword && (
                    <p
                      className="regular-14 m-2 text-red"
                      role="alert"
                      aria-live="polite"
                    >
                      {errors.confirmNewPassword.message}
                    </p>
                  )}
                </div>
              </div>
              <div
                className="ml-auto flex"
                role="group"
                aria-label="비밀번호 변경 컨트롤"
              >
                <Button
                  type="submit"
                  className="medium-16 bg-transparent text-secondary-300 hover:bg-gray-100"
                  disabled={!isValid}
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
            </div>
          </fieldset>
        </form>
      ) : (
        // 현재 비밀번호 라벨
        <div className="flex">
          <div
            className="invisible hidden w-[120px] flex-shrink-0 lg:block"
            aria-hidden="true"
          />
          <div className="w-[125px] flex-shrink-0 whitespace-nowrap p-[10px] text-[16px] font-medium text-gray-900">
            현재 비밀번호
          </div>
          <output
            className="medium-16 block w-full whitespace-nowrap p-[10px]"
            aria-label="비밀번호(마스킹됨)"
          >
            ********
          </output>
          {provider !== 'email' ? (
            <div
              className="invisible hidden w-[120px] flex-shrink-0 lg:block"
              aria-hidden="true"
            />
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
      )}
    </section>
  );
};

export default SecurityInfo;
