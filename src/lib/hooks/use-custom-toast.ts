'use client';

import { useToast } from '@/hooks/use-toast';

/** 커스텀 토스트를 반화하는 훅 */
const useCustomToast = () => {
  const { toast } = useToast();

  // 성공 토스트
  const successToast = (message: string) => {
    toast({
      description: message,
      duration: 2000,
      variant: 'success',
    });
  };

  return {
    successToast,
  };
};

export default useCustomToast;
