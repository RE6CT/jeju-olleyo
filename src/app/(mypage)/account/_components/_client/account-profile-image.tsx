import { useState } from 'react';
import ProfileImage from '@/components/commons/profile-image';
import { ERROR_MESSAGES } from '@/constants/mypage.constants';
import useCustomToast from '@/lib/hooks/use-custom-toast';
import ProfileImageButton from './account-profile-image-button';
import ProfileModal from './account-profile-modal';
import useDeleteProfileImageMutation from '@/lib/mutations/use-delete-profile-image-mutation';
const IMAGE_SIZE = 88;

/**
 * 프로필 이미지와 수정 버튼을 띄우는 컴포넌트
 * @param userId - 유저의 uuid
 * @param profileImage - 유저의 프로필 이미지
 * @param provider - 현재 로그인한 유저의 provider
 */
const AccountProfileImage = ({
  userId,
  profileImage,
  provider,
}: {
  userId: string;
  profileImage: string;
  provider: string | undefined;
}) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { successToast } = useCustomToast();
  const { mutate: deleteProfileImage, isPending } =
    useDeleteProfileImageMutation();

  /** 드롭다운 [사진 변경] 메뉴 클릭 핸들러 */
  const handleProfileImageEdit = () => {
    setModalOpen(true);
  };

  /** 프로필 사진 초기화 핸들러 */
  const handleProfileImageDelete = async () => {
    const isConfirmed = confirm(
      '프로필 사진을 기본 이미지로 변경하시겠습니까?',
    );
    if (!isConfirmed) return;

    deleteProfileImage(
      { userId, profileImage },
      {
        onSuccess: () => {
          successToast('프로필 이미지가 변경되었습니다.');
          setModalOpen(false);
        },
        onError: (error) => {
          let errorMessage = ERROR_MESSAGES.PROFILE_UPDATE_FAILED;
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          successToast(errorMessage);
          setModalOpen(false);
        },
      },
    );
  };

  return (
    <div
      className="relative w-fit"
      role="group"
      aria-label="프로필 이미지 컨트롤"
    >
      <ProfileImage
        image={profileImage}
        width={IMAGE_SIZE}
        height={IMAGE_SIZE}
        className="aspect-square"
      />
      {provider === 'email' && (
        <ProfileImageButton
          onEdit={handleProfileImageEdit}
          onDelete={handleProfileImageDelete}
          aria-label="프로필 이미지 편집 옵션"
        />
      )}
      <ProfileModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default AccountProfileImage;
