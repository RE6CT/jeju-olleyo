import { useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchUpdateNickname } from '@/lib/apis/profile/update-profile.api';
import { USER_QUERY_KEY } from '@/lib/queries/auth-queries';

/**
 * 닉네임 업데이트 뮤테이션 훅
 */
const useUpdateNicknameMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      userId,
      nickname,
    }: {
      userId: string;
      nickname: string;
    }) => {
      const result = await fetchUpdateNickname(userId, nickname);
      if (!result.success) {
        throw new Error(result.message);
      }
      return result;
    },
    onSuccess: () => {
      // 성공 시 사용자 정보 쿼리 캐시 무효화
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });
};

export default useUpdateNicknameMutation;
