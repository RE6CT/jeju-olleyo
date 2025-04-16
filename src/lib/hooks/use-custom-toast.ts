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
      className:
        'border-none text-secondary-100 bg-secondary-800 flex justify-center text-center px-4 py-4 min-w-[378px] w-full !rounded-12',
    });
  };

  return {
    successToast,
  };
};

export default useCustomToast;
