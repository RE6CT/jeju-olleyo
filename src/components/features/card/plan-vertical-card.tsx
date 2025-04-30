import Link from 'next/link';
import Duration from '@/components/commons/duration';
import PlanImage from '@/components/commons/plan-image';
import { Separator } from '@/components/ui/separator';
import { Plan, PlanVerticalCardProps } from '@/types/plan.type';
import LikeButton from '@/components/commons/like-button';
import PlanDropdown from '@/components/commons/edit-and-delete-dropdown';
import { Button } from '@/components/ui/button';

/**
 * vertical한 플랜 카드 컴포넌트
 * @param plan - 플랜 카드를 위한 PlanCardType의 객체
 * @param isDropdownVisible - 드롭다운 표시 여부
 * @param onEdit - 수정 핸들러
 * @param onDelete - 삭제 핸들러
 */
const PlanVerticalCard = ({
  plan,
  isDropdownVisible,
  onEdit,
  onDelete,
}: PlanVerticalCardProps) => {
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
        {onEdit && onDelete && isDropdownVisible && (
          <div className="absolute right-2 top-10 block md:hidden">
            <PlanDropdown
              plan={plan as Plan}
              onEdit={onEdit}
              onDelete={onDelete}
            >
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" // 포커스 효과 제거
              >
                <img
                  src="/icons/option.svg"
                  alt="option"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
              </Button>
            </PlanDropdown>
          </div>
        )}
      </div>

      <div className="mt-2 flex flex-col gap-1">
        {/* 제목과 내용 영역 */}
        <div className="flex flex-col gap-1 md:gap-2">
          <p className="medium-12 md:medium-18 lg:medium-16 overflow-hidden text-ellipsis whitespace-nowrap text-gray-900">
            {plan.title}
          </p>
          <p className="regular-10 md:regular-16 lg:regular-14 overflow-hidden text-ellipsis whitespace-nowrap text-description">
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
