import { FormEvent, useEffect, useRef } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/modal';
import { ERROR_MESSAGES } from '@/constants/mypage.constants';
import useCustomToast from '@/lib/hooks/use-custom-toast';
import { ProfileModalProps } from '@/types/mypage.type';
import { useChangeImageFile } from '@/lib/hooks/use-change-image-file';
import useUpdateProfileImageMutation from '@/lib/mutations/use-update-profile-image-mutation';

/**
 * 프로필 이미지 수정 버튼을 눌렀을 때 뜨는 모달 컴포넌트
 * @param isModalOpen - 모달 오픈 여부
 * @param setModalOpen - 모달 오픈 set 함수
 * @returns
 */
const ProfileModal = ({ isModalOpen, setModalOpen }: ProfileModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { successToast } = useCustomToast();
  const { previewImage, selectedFile, handleFileChange, resetFile } =
    useChangeImageFile();
  const { mutate: updateProfileImage, isPending } =
    useUpdateProfileImageMutation();

  // 모달이 닫히면 파일 상태 초기화
  useEffect(() => {
    if (!isModalOpen) {
      resetFile();
    }
  }, [isModalOpen, resetFile]);

  /** 이미지 파일 피커 트리거 */
  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  // 이미지 변경 완료 버튼 클릭 핸들러 수정
  const handleProfileImageEditCompelete = (e: FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      successToast(ERROR_MESSAGES.IMAGE_DATA_MISSING);
      return;
    }

    const isConfirmed = confirm('프로필 이미지를 변경하시겠습니까?');
    if (!isConfirmed) return;

    // formData 생성 및 파일 추가
    const formData = new FormData();
    formData.append('profileImage', selectedFile);

    // 프로필 이미지 업데이트
    updateProfileImage(formData, {
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
    });
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
        <DialogTitle className="sr-only">계정 프로필</DialogTitle>
        <button
          onClick={() => setModalOpen(false)}
          className="ml-auto h-[24px] w-[24px] bg-gray-300 [mask-image:url(/icons/close.svg)] [mask-repeat:no-repeat] [mask-size:contain]"
          aria-label="닫기"
        />
        <button
          onClick={handleSelectFile}
          className="border-gray-10 mb-4 mt-3 flex aspect-square w-[296px] items-center justify-center rounded-12 border bg-gray-50"
          style={
            previewImage
              ? {
                  backgroundImage: `url(${previewImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : {}
          }
          aria-label={previewImage ? '이미지 변경하기' : '이미지 선택하기'}
          aria-describedby="image-selection-hint"
        >
          {!previewImage && (
            <div
              className="h-[80px] w-[80px] bg-gray-300 [mask-image:url(/icons/add.svg)] [mask-repeat:no-repeat] [mask-size:contain]"
              role="img"
              aria-label="이미지 추가 아이콘"
            />
          )}
        </button>
        <p id="image-selection-hint" className="sr-only">
          클릭하여 프로필 이미지를 선택하세요
        </p>

        <form
          onSubmit={handleProfileImageEditCompelete}
          aria-label="프로필 이미지 업로드 폼"
        >
          <label htmlFor="profile-image-input" className="sr-only">
            프로필 이미지 선택
          </label>
          <input
            id="profile-image-input"
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".png, .jpg, .jpeg"
            onChange={handleFileChange}
            aria-required="true"
          />
          <Button
            type="submit"
            className="semibold-16 w-full rounded-[12px] border border-primary-500 bg-white font-semibold text-primary-500 hover:bg-white"
            disabled={isPending}
          >
            완료
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
