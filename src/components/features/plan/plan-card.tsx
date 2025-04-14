'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlanCardProps } from '@/types/plan.type';
import { TEXT } from '@/constants/plan.constants';
import PlanDropdown from '../../commons/edit-and-delete-dropdown';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import PlanImage from '@/components/commons/plan-image';
import Duration from '../../commons/duration';
import Image from 'next/image';

export const CARD = {
  imageSize: 'w-[238px] h-[144px]',
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
const PlanCard = ({ plan, onEdit, onDelete }: PlanCardProps) => {
  return (
    <Card className="flex gap-4 border-0">
      {/* 이미지 영역 */}
      <div className={`relative ${CARD.imageSize}`}>
        <PlanImage image={plan.planImg} title={plan.title} />
      </div>

      {/* 컨텐츠 영역 */}
      <div className="flex flex-1 flex-col">
        <CardHeader className="relative px-2 py-2">
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
          {/* 닉네임 및 날짜 영역 */}
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span>{plan.nickname}</span>
            <Separator orientation="vertical" />
            <Duration
              start={plan.travelStartDate}
              end={plan.travelEndDate}
              separator={TEXT.dateSeparator}
            />
          </div>
          {/* 한줄로 제한, 넘치면 말줄임표 */}
          <CardTitle className="line-clamp-2 text-xl">{plan.title}</CardTitle>
        </CardHeader>

        {/* description 영역 */}
        <CardContent className="flex flex-1 flex-col justify-between px-2 py-2">
          <p className="line-clamp-4 text-sm text-muted-foreground">
            {plan.description || TEXT.noDescription}
          </p>
        </CardContent>
      </div>
    </Card>
  );
};

export default PlanCard;
