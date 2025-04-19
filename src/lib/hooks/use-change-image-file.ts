import { useState, useEffect } from 'react';
import { MAX_FILE_SIZE, VALID_FILE_TYPES } from '@/constants/global.constant';
import { fetchUploadPlanImage } from '@/lib/apis/plan/plan.api';
import useCustomToast from '@/lib/hooks/use-custom-toast';

export const useChangeImageFile = (
  initialPreviewImage: string | null = null,
) => {
  const [previewImage, setPreviewImage] = useState<string | null>(
    initialPreviewImage,
  );
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      successToast(`이미지 크기는 ${MAX_FILE_SIZE}MB를 초과할 수 없습니다.`);
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      successToast(`${VALID_FILE_TYPES} 형식의 이미지만 업로드 가능합니다.`);
      return;
    }

    try {
      setIsUploading(true);
      // 임시 미리보기를 위해 blob URL 생성
      const tempUrl = URL.createObjectURL(file);
      setPreviewImage(tempUrl);

      // FormData 생성 및 파일 추가
      const formData = new FormData();
      formData.append('file', file);

      // Supabase Storage에 이미지 업로드
      const uploadedImageUrl = await fetchUploadPlanImage(formData);
      setPreviewImage(uploadedImageUrl);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      successToast('이미지 업로드에 실패했습니다.');
      setPreviewImage(null);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    previewImage,
    setPreviewImage,
    isUploading,
    handleFileChange,
  };
};
