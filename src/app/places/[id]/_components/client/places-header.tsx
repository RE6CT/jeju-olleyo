'use client';

import { ArrowLeft } from '@/components/icons/arrow-icon';
import { useRouter } from 'next/navigation';

/**
 * 모바일용 : 장소 상세 페이지 헤더 및 뒤로가기 버튼 컴포넌트
 */
const PlacesHeader = ({
  title,
  className,
}: {
  title?: string;
  className?: string;
}) => {
  const router = useRouter();

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <button onClick={() => router.back()}>
        <ArrowLeft size={20} fill="gray-900" />
      </button>
      <h2 className="medium-18 m-auto w-fit truncate pb-[12.5px] pt-[8.5px]">
        {title}
      </h2>
      <div className="w-[20px]" />
    </div>
  );
};

export default PlacesHeader;
