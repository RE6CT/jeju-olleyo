'use client';

import { ArrowLeft } from '@/components/icons/arrow-icon';
import { useRouter } from 'next/navigation';

/**
 * 마이페이지 헤더 및 뒤로가기 버튼 컴포넌트
 */
const MypageHeader = ({ className }: { className?: string }) => {
  const router = useRouter();

  return (
    <button className={`${className}`} onClick={() => router.back()}>
      <ArrowLeft size={20} fill="gray-900" />
    </button>
  );
};

export default MypageHeader;
