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
          className="absolute right-4 top-4"
        />
      </div>

      <div className="flex flex-col gap-1 p-2">
        <div className="flex flex-col gap-2">
          <p className="medium-16 line-clamp-1 overflow-hidden text-ellipsis text-gray-900">
            {plan.title}
          </p>
          <p className="regular-14 line-clamp-2 text-description">
            {plan.description}
          </p>
        </div>
        <div className="medium-12 flex items-center gap-2 text-gray-500">
          <span className="whitespace-nowrap">{plan.nickname}</span>
          <Separator orientation="vertical" className="h-[11px] bg-gray-300" />
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
