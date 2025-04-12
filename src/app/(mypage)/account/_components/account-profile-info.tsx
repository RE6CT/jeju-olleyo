'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { fetchUpdateNickname } from '@/lib/apis/profile/update-profile.api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { nicknameSchema } from '@/lib/schemas/auth-schema';
import { z } from 'zod';
import useProviderFromCookie from '@/lib/hooks/use-get-provider';
import { ERROR_MESSAGES } from '@/constants/mypage.constants';
import AccountProfileImage from './account-profile-image';

const PROFILE_INFO_STYLE = {
  container:
    'px-8 py-6 rounded-24 bg-white border-gray-100 border border-gray-100',
  title: 'semibold-18 col-span-4 w-full',
  input:
    'rounded-[12px] border border-gray-200 px-4 py-[10px] !placeholder-gray-200',
  rowLabel: 'medium-16 text-[16px] whitespace-nowrap w-[107px] p-[10px]',
  rowValue: 'whitespace-nowrap medium-16 p-[10px]',
  button: 'medium-16 bg-transparent text-secondary-300 hover:bg-gray-100',
};

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

  /**
   * 닉네임 수정 폼 제출 핸들러
   * @param data - 유효성 검사를 통과한 닉네임 데이터
   * data.nickname: 사용자가 입력한 새 닉네임 값
   */
  const handleEditComplete = async (data: NicknameValues) => {
    const isConfirmed = confirm('닉네임을 수정하시겠습니까?');
    if (!isConfirmed) return;

    try {
      const result = await fetchUpdateNickname(userId, data.nickname);
      alert(result.message);
    } catch (error: unknown) {
      let errorMessage = ERROR_MESSAGES.NICKNAME_UPDATE_FAILED;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
    } finally {
      setIsEditMode(false);
      reset();
    }
  };

  return (
    <div
      className={`m-1 grid grid-cols-[auto_auto_1fr_auto] gap-3 ${PROFILE_INFO_STYLE.container}`}
    >
      <h3 className={PROFILE_INFO_STYLE.title}>프로필</h3>
      <div className="w-[120px] py-[14px]">
        <AccountProfileImage
          userId={userId}
          profileImage={profileImage}
          provider={provider}
        />
      </div>
      <form className="contents" onSubmit={handleSubmit(handleEditComplete)}>
        <Label htmlFor="nickname" className={PROFILE_INFO_STYLE.rowLabel}>
          닉네임
        </Label>
        {isEditMode ? (
          <div className="relative">
            <Input
              id="nickname"
              placeholder={`${nickname}`}
              {...register('nickname')}
              className={PROFILE_INFO_STYLE.input}
            />
            {errors.nickname && (
              <p className="regular-14 absolute m-2 text-destructive">
                {errors.nickname.message}
              </p>
            )}
          </div>
        ) : (
          <span className={PROFILE_INFO_STYLE.rowValue}>{nickname}</span>
        )}
        {isEditMode ? (
          <div>
            <Button
              type="submit"
              disabled={!isValid || currentNickname === nickname}
              className={PROFILE_INFO_STYLE.button}
            >
              완료
            </Button>
            <Button
              onClick={handleEditCancelButtonClick}
              className={PROFILE_INFO_STYLE.button}
            >
              취소
            </Button>
          </div>
        ) : (
          <>
            {provider !== 'email' ? (
              <div className="invisible" />
            ) : (
              <Button
                className={PROFILE_INFO_STYLE.button}
                onClick={handleEditButtonClick}
              >
                수정
              </Button>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default ProfileInfo;
