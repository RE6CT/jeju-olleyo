import { ChangeEvent, useCallback, useState, useEffect } from 'react';
import { MAX_FILE_SIZE, VALID_FILE_TYPES } from '@/constants/global.constant';
import useCustomToast from '@/lib/hooks/use-custom-toast';

export const useChangeImageFile = (
  initialPreviewImage: string | null = null,
) => {
  const [previewImage, setPreviewImage] = useState<string | null>(
    initialPreviewImage,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { successToast } = useCustomToast();

  // 컴포넌트가 언마운트될 때 미리보기 URL 해제
  useEffect(() => {
    return () => {
      if (previewImage && previewImage.startsWith('blob:')) {
        URL.revokeObjectURL(previewImage);
      }
    };
  }, [previewImage]);

  const handleFileChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setSelectedFile(file);
      setIsUploading(true);

      if (file.size > MAX_FILE_SIZE) {
        const maxMb = (MAX_FILE_SIZE / 1024 / 1024).toFixed(1);
        successToast(`이미지 크기는 ${maxMb}MB를 초과할 수 없습니다.`);
        setIsUploading(false);
        return;
      }

      if (
        !VALID_FILE_TYPES.includes(
          file.type as 'image/jpeg' | 'image/png' | 'image/gif',
        )
      ) {
        successToast(
          `${VALID_FILE_TYPES.join(', ')} 형식의 이미지만 업로드 가능합니다.`,
        );
        setIsUploading(false);
        return;
      }

      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result as string);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('이미지 파일 처리 중 오류 발생:', error);
        setIsUploading(false);
      }
    },
    [],
  );

  const resetFile = useCallback(() => {
    setPreviewImage(null);
    setSelectedFile(null);
    setIsUploading(false);
  }, []);

  return {
    previewImage,
    selectedFile,
    isUploading,
    handleFileChange,
    resetFile,
  };
};
