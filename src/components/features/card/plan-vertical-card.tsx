import Link from 'next/link';

import Duration from '@/components/commons/duration';
import PlanImage from '@/components/commons/plan-image';
import { Separator } from '@/components/ui/separator';
import { PlanVerticalCardProps } from '@/types/plan.type';

import LikeButton from '../like/like-button';

/**
 * vertical한 플랜 카드 컴포넌트
 * @param plan - 플랜 카드를 위한 PlanCardType의 객체
 */
const PlanVerticalCard = ({ plan }: PlanVerticalCardProps) => {
  return (
    <Link href={`/plan-detail/${plan.planId}?isReadOnly=true`}>
      <div className="relative">
        <div className="relative aspect-[83/58] h-[116px] w-[166px] md:aspect-[310/216] md:h-auto md:w-full">
          <PlanImage
            image={plan.planImg}
            title={plan.title}
            className="rounded-12"
          />
        </div>
        <LikeButton
          planId={plan.planId}
          isLiked={plan.isLiked}
          className="absolute right-2 top-2 md:right-4 md:top-4"
        />
      </div>

      <div className="flex flex-col gap-1 p-2">
        {/* 제목과 내용 영역 */}
        <div className="flex flex-col md:gap-2">
          <p className="md:medium-16 medium-12 line-clamp-2 min-h-[38px] flex-1 overflow-hidden text-ellipsis whitespace-normal text-gray-900 md:line-clamp-1 md:h-auto md:text-[16px]">
            {plan.title}
          </p>
          <p className="line-clamp-2 min-h-[32px] flex-1 overflow-hidden text-ellipsis whitespace-normal text-[10px] text-description md:h-[32px] md:whitespace-nowrap md:text-[14px] md:text-description">
            {plan.description}
          </p>
        </div>
        {/* 닉네임과 날짜 영역  */}
        <div className="medium-12 flex flex-col items-start text-gray-500 md:flex-row md:items-center md:gap-2">
          <span className="whitespace-nowrap">{plan.nickname}</span>
          <Separator
            orientation="vertical"
            className="hidden h-[11px] bg-gray-300 md:block"
          />
          <Duration
            start={plan.travelStartDate}
            end={plan.travelEndDate}
            separator="~"
            showShortYear
          />
        </div>
      </div>
    </Link>
  );
};

export default PlanVerticalCard;
