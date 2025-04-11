import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/modal';
import { ProfileModalProps } from '@/types/mypage.type';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';

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

  // 모달이 닫히면 프리뷰 이미지 및 파일 삭제
  useEffect(() => {
    if (!isModalOpen) {
      setPreview(null);
      setSelectImage(null);
    }
  }, [isModalOpen]);

  /** 이미지 파일 피커 트리거 */
  const handleSelectFile = () => {
    fileInputRef.current?.click();
  };

  /** 파일 선택 핸들러 */
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (file) {
      setSelectImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  /** 이미지 변경 완료 버튼 클릭 */
  const handleProfileImageEditCompelete = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    if (!selectImage) {
      alert('이미지가 선택되지 않았습니다.');
      return;
    }

    const isConfirmed = confirm('프로필 이미지를 변경하시겠습니까?');
    if (!isConfirmed) return;

    // TODO - 이미지 저장 로직

    setModalOpen(false);
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
          className="rounded-12 border-gray-10 mb-4 mt-3 flex aspect-square w-[296px] items-center justify-center border bg-gray-50"
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
            className="text-primary-500 border-primary-500 semibold-16 w-full rounded-[12px] border bg-white font-semibold hover:bg-white"
          >
            완료
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
