'use client';

import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/path.constants';
import useAlert from '@/lib/hooks/use-alert';
import { JejuBannerProps } from '@/types/common.type';
import useAuthCheck from '@/lib/hooks/use-auth-check';
import { ArrowRight } from '@/components/icons/arrow-icon';

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
  // 현재 경로가 홈이면 리다이렉션 방지
  const { isAuthenticated } = useAuthCheck({
    skipCheck: true,
  });
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
    <div className="relative w-full">
      {/* 배경 이미지  */}
      <img
        src={imageUrl}
        alt="제주 여행 배너"
        className="hidden aspect-auto w-full md:block"
      />
      <figure className={`overflow-hidden md:hidden`}>
        <img
          src="/banner-images/plan_banner_mini.png"
          alt="제주 여행 배너"
          className="aspect-auto w-full"
        />
      </figure>
      {/* 텍스트와 버튼 오버레이 - 왼쪽 상단에 배치 */}
      <div className="absolute left-[5%] top-[15%] flex flex-col items-start gap-2 md:left-[5%] md:top-[10%] md:gap-3 lg:gap-4">
        <h2 className="semibold-18 md:bold-24 lg:bold-28 whitespace-nowrap leading-[130%] tracking-[-0.56px] text-gray-900">
          {title}
        </h2>
        <button
          onClick={handleGotoNewPlan}
          className="flex items-center justify-center gap-1 rounded-full bg-primary-500 px-3 py-2 md:px-4 md:py-2"
        >
          <span className="medium-12 lg:semibold-16 md:medium-14 text-white">
            {buttonText}
          </span>
          <ArrowRight fill="white" size={12} />
        </button>
      </div>
    </div>
  );
};

export default JejuBanner;
