'use client';

import ProfileImage from '@/components/commons/profile-image';
import { Button } from '@/components/ui/button';
import ProfileImageButton from './account-profile-image-button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { fetchUpdateNickname } from '@/lib/apis/profile/update-profile.api';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { nicknameSchema } from '@/lib/schemas/auth-schema';
import { z } from 'zod';
import useProviderFromCookie from '@/lib/hooks/use-get-provider';

// TODO - rowLabel에 하드코딩된 width 바꾸기
const RROFILE_INFO_STYLE = {
  imageSize: 88,
  title: 'my-3 text-lg font-semibold col-span-4 w-full',
  rowLabel: 'text-md whitespace-nowrap font-normal w-[110px]',
  rowValue: 'whitespace-nowrap',
};

/** 회원정보 수정 페이지의 프로필 섹션 컴포넌트 */
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

  /** 닉네임 수정 완료 버튼 클릭 핸들러 */
  const handleEditComplete = async (data: NicknameValues) => {
    const isConfirmed = confirm('닉네임을 수정하시겠습니까?');
    if (!isConfirmed) return;

    try {
      const result = await fetchUpdateNickname(userId, data.nickname);
      alert(result.message);
    } catch (error: unknown) {
      alert('닉네임 변경 중 오류가 발생했습니다.');
    } finally {
      setIsEditMode(false);
      reset();
    }
  };

  return (
    <div className="m-1 grid grid-cols-[auto_auto_1fr_auto] items-center gap-3">
      <h3 className={RROFILE_INFO_STYLE.title}>프로필</h3>
      <div className="relative w-fit">
        <ProfileImage
          image={profileImage}
          width={RROFILE_INFO_STYLE.imageSize}
          height={RROFILE_INFO_STYLE.imageSize}
          className="rounded-full"
        />
        {provider === 'email' && <ProfileImageButton />}
      </div>
      <form className="contents" onSubmit={handleSubmit(handleEditComplete)}>
        <Label htmlFor="nickname" className={RROFILE_INFO_STYLE.rowLabel}>
          닉네임
        </Label>
        {isEditMode ? (
          <div className="relative">
            <Input
              id="nickname"
              placeholder={`${nickname}`}
              {...register('nickname')}
            />
            {errors.nickname && (
              <p className="absolute m-2 text-sm text-red-500">
                {errors.nickname.message}
              </p>
            )}
          </div>
        ) : (
          <span className={RROFILE_INFO_STYLE.rowValue}>{nickname}</span>
        )}
        {isEditMode ? (
          <Button
            type="submit"
            disabled={!isValid || currentNickname === nickname}
          >
            완료
          </Button>
        ) : (
          <>
            {provider !== 'email' ? (
              <div className="invisible" />
            ) : (
              <Button onClick={handleEditButtonClick}>수정</Button>
            )}
          </>
        )}
      </form>
    </div>
  );
};

export default ProfileInfo;
