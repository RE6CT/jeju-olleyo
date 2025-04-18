import Image from 'next/image';
import Link from 'next/link';

import Duration from '@/components/commons/duration';
import PlanDropdown from '@/components/commons/edit-and-delete-dropdown';
import PlanImage from '@/components/commons/plan-image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { TEXT } from '@/constants/plan.constants';
import { PlanHorizontalCardProps } from '@/types/plan.type';

import LikeButton from '../like-button';

export const CARD = {
  imageSize: 'w-[310px] h-[216px]',
} as const;

/**
 * 일정 카드 컴포넌트
 *
 * @param plan - 일정 데이터
 * @param onEdit - 수정 버튼 클릭 시 실행될 함수
 * @param onDelete - 삭제 버튼 클릭 시 실행될 함수
 *
 * @example
 * ```tsx
 * <MyPlanCard
 *   plan={planData}
 *   onEdit={(id) => handleEdit(id)}
 *   onDelete={(id) => handleDelete(id)}
 * />
 * ```
 */
const PlanHorizontalCard = ({
  plan,
  onEdit,
  onDelete,
}: PlanHorizontalCardProps) => {
  return (
    <div className="flex gap-4">
      {/* 이미지 영역 */}
      <Link href={`/plan-detail/${plan.planId}`} className="relative">
        <div className={`relative ${CARD.imageSize}`}>
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
      </Link>

      {/* 컨텐츠 영역 */}
      <div className="flex flex-1 flex-col gap-2">
        <div className="relative">
          {/* 드롭다운 메뉴 */}
          {onEdit && onDelete && (
            <div className="absolute right-4 top-2">
              <PlanDropdown plan={plan} onEdit={onEdit} onDelete={onDelete}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" // 포커스 효과 제거
                >
                  <Image
                    src="/icons/option.svg"
                    alt="option"
                    width={24}
                    height={24}
                  />
                </Button>
              </PlanDropdown>
            </div>
          )}
        </div>

        {/* 닉네임 및 날짜 영역 */}
        <Link
          href={`/plan-detail/${plan.planId}`}
          className="medium-12 flex items-center gap-2 text-gray-500"
        >
          <span className="whitespace-nowrap">{plan.nickname}</span>
          <Separator orientation="vertical" className="h-[11px] bg-gray-300" />
          <Duration
            start={plan.travelStartDate}
            end={plan.travelEndDate}
            separator="-"
          />
        </Link>
        {/* 제목 및 description 영역 */}
        <Link
          href={`/plan-detail/${plan.planId}`}
          className="medium-16 line-clamp-1"
        >
          {plan.title}
        </Link>
        <Link
          href={`/plan-detail/${plan.planId}`}
          className="regular-14 line-clamp-2 text-description"
        >
          {plan.description || TEXT.noDescription}
        </Link>
      </div>
    </div>
  );
};

export default PlanHorizontalCard;
