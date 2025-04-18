'use client';

import { useRouter } from 'next/navigation';

import { PATH } from '@/constants/path.constants';
import useAlert from '@/lib/hooks/use-alert';
import { JejuBannerProps } from '@/types/common.type';
import useAuthStore from '@/zustand/auth.store';

/**
 * 제주 여행 계획 배너 컴포넌트
 * 귤 캐릭터가 있는 배경 이미지 위에 타이틀과 버튼을 오버레이하는 배너
 * @param imageUrl - 배너 배경 이미지 URL
 * @param title - 배너 제목 텍스트
 * @param buttonText - 버튼에 표시할 텍스트
 * @param buttonUrl - 버튼 클릭 시 이동할 URL
 */
const JejuBanner = ({
  imageUrl = '/banner-images/plan-banner.jpg',
  title = '나만의 제주 여행 계획하기',
  buttonText = '내 일정 만들러 가기 >',
  buttonUrl = '/planner',
}: JejuBannerProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  const { showQuestion } = useAlert();

  /** 일정 만들기 버튼 클릭 시의 이벤트 핸들러 */
  const handleGotoNewPlan = () => {
    if (!isAuthenticated) {
      showQuestion(
        '로그인 필요',
        '일정을 만들기 위해서는 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?',
        {
          onConfirm: () =>
            router.push(`${PATH.SIGNIN}?redirectTo=${PATH.PLAN_NEW}`),
          onCancel: () => {},
        },
      );
      return;
    }
    router.push(buttonUrl);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* 배경 이미지  */}
      <img src={imageUrl} alt="제주 여행 배너" className="aspect-auto w-full" />
      {/* 텍스트와 버튼 오버레이 - 왼쪽 상단에 배치 */}
      <div className="absolute left-1/2 top-[10%] flex -translate-x-1/2 transform flex-row items-center gap-4 sm:left-[5%] sm:transform-none sm:flex-col sm:items-start">
        <h2 className="bold-28 whitespace-nowrap leading-[130%] tracking-[-0.56px] text-gray-900">
          {title}
        </h2>
        <button
          onClick={handleGotoNewPlan}
          className="flex h-10 items-center justify-center gap-1 rounded-[28px] bg-primary-500 px-4 py-2"
        >
          <span className="semibold-16 text-white">{buttonText}</span>
          <svg
            width="12"
            height="12"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M34.6191 22.3726C35.1831 22.9368 35.5 23.702 35.5 24.4998C35.5 25.2976 35.1831 26.0627 34.6191 26.6269L17.5989 43.6471C17.0314 44.1952 16.2714 44.4984 15.4826 44.4916C14.6937 44.4847 13.9391 44.1683 13.3812 43.6105C12.8234 43.0526 12.507 42.298 12.5001 41.5091C12.4933 40.7203 12.7965 39.9603 13.3446 39.3928L28.2376 24.4998L13.3446 9.60669C12.7965 9.03924 12.4933 8.27924 12.5001 7.49037C12.507 6.70149 12.8234 5.94688 13.3812 5.38904C13.9391 4.8312 14.6937 4.51478 15.4826 4.50793C16.2714 4.50107 17.0314 4.80433 17.5989 5.35239L34.6191 22.3726Z"
              fill="white"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default JejuBanner;
