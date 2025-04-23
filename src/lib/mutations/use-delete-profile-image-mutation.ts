import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchDeleteProfileImage } from '@/lib/apis/profile/update-profile.api';
import { USER_QUERY_KEY } from '@/lib/queries/auth-queries';

/**
 * 프로필 이미지 삭제를 위한 뮤테이션 훅
 * @returns 프로필 이미지 삭제 뮤테이션 객체
 */
const useDeleteProfileImageMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      profileImage,
    }: {
      userId: string;
      profileImage: string;
    }) => {
      const result = await fetchDeleteProfileImage(userId, profileImage);
      if (!result.success) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: () => {
      // 성공 시 유저 정보 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });
};

export default useDeleteProfileImageMutation;
