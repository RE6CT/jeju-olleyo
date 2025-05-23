import Link from 'next/link';

import Duration from '@/components/commons/duration';
import PlanDropdown from '@/components/commons/edit-and-delete-dropdown';
import PlanImage from '@/components/commons/plan-image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TEXT } from '@/constants/plan.constants';
import { PlanHorizontalCardProps } from '@/types/plan.type';
import LikeButton from '@/components/commons/like-button';

/**
 * 일정 카드 컴포넌트
 *
 * @param plan - 일정 데이터
 * @param onEdit - 수정 버튼 클릭 시 실행될 함수
 * @param onDelete - 삭제 버튼 클릭 시 실행될 함수
 * @param onUpdate - 일정 업데이트 시 실행될 함수
 *
 * @example
 * ```tsx
 * <MyPlanCard
 *   plan={planData}
 *   onEdit={(id) => handleEdit(id)}
 *   onDelete={(id) => handleDelete(id)}
 *   onUpdate={(plan) => handleUpdate(plan)}
 * />
 * ```
 */
const PlanHorizontalCard = ({
  plan,
  nickname,
  onDelete,
  onUpdate,
}: PlanHorizontalCardProps) => {
  return (
    <Link
      href={`/plan-detail/${plan.planId}?isReadOnly=true`}
      className="group relative inset-0 flex gap-4"
    >
      {/* 이미지 영역 */}
      <div className="relative">
        <div className="relative h-[116px] w-[166px] md:h-[140px] md:w-[200px] lg:h-[216px] lg:w-[310px]">
          <PlanImage
            image={plan.planImg}
            title={plan.title}
            className="rounded-12"
          />
        </div>
        <LikeButton
          planId={plan.planId}
          className="absolute right-2 top-2 lg:right-4 lg:top-4"
        />
      </div>

      {/* 컨텐츠 영역 */}
      <div className="flex flex-1 flex-col gap-2">
        <div className="relative">
          {/* 드롭다운 메뉴 */}
          {onDelete && (
            <div
              className="absolute right-0"
              onClick={(e) => e.stopPropagation()}
            >
              <PlanDropdown plan={plan} onDelete={onDelete}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
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

        {/* 닉네임 및 날짜 영역 */}
        <div className="medium-12 flex items-center gap-2 text-gray-500">
          <span className="whitespace-nowrap">{nickname}</span>
          <Separator orientation="vertical" className="h-[11px] bg-gray-300" />
          <Duration
            start={plan.travelStartDate}
            end={plan.travelEndDate}
            separator="-"
          />
        </div>
        {/* 제목 및 description 영역 */}
        <div className="medium-16 line-clamp-1">{plan.title}</div>
        <div className="regular-14 line-clamp-2 text-description">
          {plan.description || TEXT.noDescription}
        </div>
      </div>
    </Link>
  );
};

export default PlanHorizontalCard;
