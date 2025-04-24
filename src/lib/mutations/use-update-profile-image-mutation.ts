import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUpdateProfileImage } from '@/lib/apis/profile/update-profile.api';
import { USER_QUERY_KEY } from '@/lib/queries/auth-queries';
import useCustomToast from '../hooks/use-custom-toast';

/**
 * 프로필 이미지 업데이트를 위한 뮤테이션 훅
 * @returns 프로필 이미지 업데이트 뮤테이션 객체
 */
const useUpdateProfileImageMutation = () => {
  const queryClient = useQueryClient();
  const { successToast } = useCustomToast();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await fetchUpdateProfileImage(formData);
      if (!result.success) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: () => {
      successToast('프로필 이미지가 변경되었습니다.');
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });
};

export default useUpdateProfileImageMutation;
