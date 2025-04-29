import Link from 'next/link';
import Duration from '@/components/commons/duration';
import PlanImage from '@/components/commons/plan-image';
import { Separator } from '@/components/ui/separator';
import { PlanVerticalCardProps } from '@/types/plan.type';
import LikeButton from '@/components/commons/like-button';

/**
 * vertical한 플랜 카드 컴포넌트
 * @param plan - 플랜 카드를 위한 PlanCardType의 객체
 */
const PlanVerticalCard = ({ plan }: PlanVerticalCardProps) => {
  return (
    <Link href={`/plan-detail/${plan.planId}?isReadOnly=true`}>
      <div className="relative">
        <div className="relative aspect-[310/216]">
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

      <div className="mt-2 flex flex-col gap-1">
        {/* 제목과 내용 영역 */}
        <div className="flex flex-col gap-1 md:gap-2">
          <p className="medium-12 overflow-hidden text-ellipsis whitespace-nowrap text-gray-900">
            {plan.title}
          </p>
          <p className="regular-10 overflow-hidden text-ellipsis whitespace-nowrap text-description">
            {plan.description}
          </p>
        </div>
        {/* 닉네임과 날짜 영역  */}
        <div className="medium-12 text-gray-500">
          <span className="whitespace-nowrap">{plan.nickname}</span>
          <Separator
            orientation="vertical"
            className="hidden h-[11px] bg-gray-300 md:block"
          />
          <Duration
            start={plan.travelStartDate}
            end={plan.travelEndDate}
            separator="-"
          />
        </div>
      </div>
    </Link>
  );
};

export default PlanVerticalCard;
