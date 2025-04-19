import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/modal';
import { ERROR_MESSAGES } from '@/constants/mypage.constants';
import { fetchUpdateProfileImage } from '@/lib/apis/profile/update-profile.api';
import useCustomToast from '@/lib/hooks/use-custom-toast';
import { ProfileModalProps } from '@/types/mypage.type';
import { MAX_FILE_SIZE } from '@/constants/global.constant';
import { useChangeImageFile } from '@/lib/hooks/use-change-image-file';

/**
 * 프로필 이미지 수정 버튼을 눌렀을 때 뜨는 모달 컴포넌트
 * @param userId - 유저의 uuid
 * @param isModalOpen - 모달 오픈 여부
 * @param setModalOpen - 모달 오픈 set 함수
 * @returns
 */
const ProfileModal = ({
  userId,
  isModalOpen,
  setModalOpen,
}: ProfileModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectImage, setSelectImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { successToast } = useCustomToast();
  const { handleFileChange } = useChangeImageFile(preview);

  // 모달이 닫히면 프리뷰 이미지 및 파일 삭제
  useEffect(() => {
    if (!isModalOpen) {
      setPreview(null);
      setSelectImage(null);
    }
  }, [isModalOpen]);

  // URL 객체 해제
  useEffect(() => {
    if (preview) {
      return () => {
        URL.revokeObjectURL(preview);
      };
    }
  }, [preview]);

  /** 이미지 파일 피커 트리거 */
  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  /** 이미지 변경 완료 버튼 클릭 */
  const handleProfileImageEditCompelete = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!selectImage) {
      successToast(ERROR_MESSAGES.IMAGE_DATA_MISSING);
      return;
    }

    const isConfirmed = confirm('프로필 이미지를 변경하시겠습니까?');
    if (!isConfirmed) return;

    // 데이터 추가
    try {
      // formData 생성 및 파일 추가
      const formData = new FormData();
      formData.append('profileImage', selectImage);
      formData.append('userId', userId);

      const result = await fetchUpdateProfileImage(formData);

      successToast(result.message);
    } catch (error: unknown) {
      let errorMessage = ERROR_MESSAGES.PROFILE_UPDATE_FAILED;
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      successToast(errorMessage);
    } finally {
      setModalOpen(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogHeader>
        <DialogTitle className="sr-only">이미지 선택</DialogTitle>
        <DialogDescription className="sr-only">
          프로필 이미지 선택을 위한 이미지 피커입니다.
        </DialogDescription>
      </DialogHeader>
      <DialogContent className="flex w-fit flex-col gap-0 rounded-[20px] p-5 pt-4">
        <button
          onClick={() => setModalOpen(false)}
          className="ml-auto h-[24px] w-[24px] bg-gray-300 [mask-image:url(/icons/close.svg)] [mask-repeat:no-repeat] [mask-size:contain]"
        />
        <button
          onClick={handleSelectFile}
          className="border-gray-10 mb-4 mt-3 flex aspect-square w-[296px] items-center justify-center rounded-12 border bg-gray-50"
          style={
            preview
              ? {
                  backgroundImage: `url(${preview})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {}
          }
        >
          {!preview && (
            <div className="h-[80px] w-[80px] bg-gray-300 [mask-image:url(/icons/add.svg)] [mask-repeat:no-repeat] [mask-size:contain]" />
          )}
        </button>

        <form onSubmit={handleProfileImageEditCompelete}>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".png, .jpg, .jpeg"
            onChange={handleFileChange}
          />
          <Button
            type="submit"
            className="semibold-16 w-full rounded-[12px] border border-primary-500 bg-white font-semibold text-primary-500 hover:bg-white"
          >
            완료
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
