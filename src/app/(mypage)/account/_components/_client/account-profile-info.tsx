'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ERROR_MESSAGES } from '@/constants/mypage.constants';
import useCustomToast from '@/lib/hooks/use-custom-toast';
import useProviderFromCookie from '@/lib/hooks/use-get-provider';
import { nicknameSchema } from '@/lib/schemas/auth-schema';

import AccountProfileImage from './account-profile-image';
import useUpdateNicknameMutation from '@/lib/mutations/use-update-nickname-mutation';

/**
 * 회원정보 수정 페이지의 프로필 섹션 컴포넌트
 * @param userId - 유저의 uuid
 * @param nickname - 유저의 현재 닉네임
 * @param profileImage - 유저의 현재 프로필 이미지
 */
const ProfileInfo = ({
  userId,
  nickname,
  profileImage,
}: {
  userId: string;
  nickname: string;
  profileImage: string;
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const provider = useProviderFromCookie(userId);
  const { successToast } = useCustomToast();

  const formSchema = z.object({
    nickname: nicknameSchema,
  });

  type NicknameValues = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<NicknameValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: '',
    },
    mode: 'onChange',
  });

  // nickname 필드의 현재 값 감시
  const currentNickname = watch('nickname');

  /** 닉네임 수정 버튼 클릭 핸들러 */
  const handleEditButtonClick = () => {
    setIsEditMode(true);
  };

  /** 수정 취소 버튼 클릭 핸들러 */
  const handleEditCancelButtonClick = () => {
    setIsEditMode(false);
    reset();
  };

  // 닉네임 업데이트 뮤테이션 사용
  const updateNicknameMutation = useUpdateNicknameMutation();

  /**
   * 닉네임 수정 폼 제출 핸들러
   * @param data - 유효성 검사를 통과한 닉네임 데이터
   * data.nickname: 사용자가 입력한 새 닉네임 값
   */
  // 닉네임 수정 폼 제출 핸들러
  const handleEditComplete = async (data: NicknameValues) => {
    const isConfirmed = confirm('닉네임을 수정하시겠습니까?');
    if (!isConfirmed) return;

    try {
      // 뮤테이션 사용
      await updateNicknameMutation.mutateAsync({
        userId,
        nickname: data.nickname,
      });
      successToast('닉네임이 성공적으로 변경되었습니다.');
    } catch (error: unknown) {
      let errorMessage = ERROR_MESSAGES.NICKNAME_UPDATE_FAILED;
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
        프로필
      </h3>
      <form onSubmit={handleSubmit(handleEditComplete)}>
        <div className="flex">
          <figure className="w-[120px] flex-shrink-0 py-[14px]">
            <AccountProfileImage
              userId={userId}
              profileImage={profileImage}
              provider={provider}
            />
          </figure>
          <div className="flex flex-grow">
            <Label
              htmlFor="nickname"
              className="w-[125px] flex-shrink-0 whitespace-nowrap p-[10px] text-[16px] font-medium text-gray-900"
            >
              닉네임
            </Label>
            <div>
              {isEditMode ? (
                <div className="relative">
                  <Input
                    id="nickname"
                    placeholder="새 닉네임을 입력하세요"
                    {...register('nickname')}
                    className="w-full rounded-[12px] border border-gray-200 px-4 py-[10px] !placeholder-gray-200"
                    aria-invalid={errors.nickname ? 'true' : 'false'}
                  />
                  {errors.nickname && (
                    <p
                      className="regular-14 absolute m-2 text-red"
                      aria-live="polite"
                      role="alert"
                    >
                      {errors.nickname.message}
                    </p>
                  )}
                </div>
              ) : (
                <span className="medium-16 block w-full whitespace-nowrap p-[10px]">
                  {nickname}
                </span>
              )}
            </div>
            <div
              role="group"
              aria-label="프로필 편집 컨트롤"
              className="ml-auto"
            >
              {isEditMode ? (
                <div className="flex">
                  <Button
                    type="submit"
                    disabled={!isValid || currentNickname === nickname}
                    className="medium-16 bg-transparent text-secondary-300 hover:bg-gray-100"
                  >
                    완료
                  </Button>
                  <Button
                    type="button"
                    onClick={handleEditCancelButtonClick}
                    className="medium-16 bg-transparent text-secondary-300 hover:bg-gray-100"
                  >
                    취소
                  </Button>
                </div>
              ) : (
                <>
                  {provider === 'email' && (
                    <Button
                      type="button"
                      className="medium-16 bg-transparent text-secondary-300 hover:bg-gray-100"
                      onClick={handleEditButtonClick}
                    >
                      수정
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ProfileInfo;
