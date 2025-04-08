'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MyPlanCardProps } from '@/types/plan.type';
import dayjs from 'dayjs';
import { CARD, TEXT } from '@/constants/plan.constants';
import PlanDropdown from '../../commons/edit-and-delete-dropdown';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
const MyPlanCard = ({ plan, onEdit, onDelete }: MyPlanCardProps) => {
  return (
    <Card className={`flex ${CARD.height} p-2`}>
      {/* 이미지 영역 */}
      <div className={`relative h-full ${CARD.imageWidth}`}>
        {plan.planImg ? (
          <Image
            src={plan.planImg}
            alt={plan.title ?? '여행 계획 이미지'}
            fill // 부모 요소의 높이와 너비를 차지하도록 설정
            className="object-cover"
          />
        ) : (
          // 대체 이미지/텍스트
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-muted-foreground">{TEXT.noImage}</span>
          </div>
        )}
      </div>

      {/* 컨텐츠 영역 */}
      <div className="flex flex-1 flex-col">
        <CardHeader className="relative px-4 py-2">
          {/* 드롭다운 메뉴 */}
          {onEdit && onDelete && (
            <div className="absolute right-4 top-2">
              <PlanDropdown plan={plan} onEdit={onEdit} onDelete={onDelete}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" // 포커스 효과 제거
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </PlanDropdown>
            </div>
          )}
          {/* 한줄로 제한, 넘치면 말줄임표 */}
          <CardTitle className="line-clamp-1 text-xl">{plan.title}</CardTitle>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              {plan.travelStartDate
                ? dayjs(plan.travelStartDate).format('YYYY.MM.DD')
                : TEXT.noDate}
            </span>
            <span>{TEXT.dateSeparator}</span>
            <span>
              {plan.travelEndDate
                ? dayjs(plan.travelEndDate).format('YYYY.MM.DD')
                : TEXT.noDate}
            </span>
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col justify-between px-4 py-2">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {plan.description || TEXT.noDescription}
          </p>
        </CardContent>
      </div>
    </Card>
  );
};

export default MyPlanCard;
