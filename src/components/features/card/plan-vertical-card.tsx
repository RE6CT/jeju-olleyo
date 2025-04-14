import Duration from '@/components/commons/duration';
import PlanImage from '@/components/commons/plan-image';
import { Separator } from '@/components/ui/separator';
import { PlanVerticalCardProps } from '@/types/plan.type';
import Link from 'next/link';

/**
 * vertical한 플랜 카드 컴포넌트
 * @param plan - 플랜 카드를 위한 PlanCardType의 객체
 */
const PlanVerticalCard = ({ plan, userId }: PlanVerticalCardProps) => {
  return (
    <Link href={`/plan-detail/${plan.planId}`}>
      <div className="relative">
        <div className="relative aspect-[310/216]">
          <PlanImage
            image={plan.planImg}
            title={plan.title}
            className="rounded-12"
          />
        </div>
        {/* 추후 기능 추가된 좋아요 버튼이 생긴다면 이 부분을 대체하면 됩니다. */}
        <button className="absolute right-4 top-4">
          <svg
            width="40"
            height="40"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.0855 7C9.06817 7 4.18994 11.8782 4.18994 17.8955C4.18994 28.7911 17.0665 38.6961 24 41C30.9335 38.6961 43.81 28.7911 43.81 17.8955C43.81 11.8782 38.9318 7 32.9145 7C29.2298 7 25.9711 8.82946 24 11.6296C22.9951 10.1987 21.6604 9.03094 20.1087 8.22508C18.557 7.41923 16.834 6.99901 15.0855 7Z"
              className={`${plan.isLiked ? 'fill-primary-500' : 'fill-gray-200'}`}
            />
          </svg>
        </button>
      </div>

      <div className="flex flex-col gap-1 p-2">
        <div className="flex flex-col gap-2">
          <p className="medium-16 line-clamp-1">{plan.title}</p>
          <p className="regular-14 text-description line-clamp-2">
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
