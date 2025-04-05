'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlanCardProps } from '@/types/plan.type';
import { Button } from '@/components/ui/button';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const CARD = {
  height: 300,
  imageWidth: 200,
} as const;

const TEXT = {
  noImage: '이미지 없음',
  noDescription: '설명이 없습니다.',
  noDate: '날짜 미정',
  dateSeparator: '~',
  edit: '수정',
  delete: '삭제',
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
 * <PlanCard
 *   plan={planData}
 *   onEdit={(id) => handleEdit(id)}
 *   onDelete={(id) => handleDelete(id)}
 * />
 * ```
 */
const PlanCard = ({ plan, onEdit, onDelete }: PlanCardProps) => {
  return (
    <Card className={`flex h-[${CARD.height}px] p-2`}>
      {/* 이미지 영역 */}
      <div className={`relative h-full w-[${CARD.imageWidth}px]`}>
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
          {(onEdit || onDelete) && (
            <div className="absolute right-4 top-2">
              <DropdownMenu>
                // 자체 button 태그를 쓰는 대신 자식 button 컴포넌트 사용
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0" // 포커스 효과 제거
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {onEdit && (
                    <DropdownMenuItem onClick={() => onEdit(plan.planId)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      {TEXT.edit}
                    </DropdownMenuItem>
                  )}
                  {onDelete && (
                    <DropdownMenuItem
                      onClick={() => onDelete(plan.planId)}
                      className="text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      {TEXT.delete}
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          {/* 한줄로 제한, 넘치면 말줄임표 */}
          <CardTitle className="line-clamp-1 text-xl">{plan.title}</CardTitle>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              {plan.travelStartDate
                ? new Date(plan.travelStartDate).toLocaleDateString()
                : TEXT.noDate}
            </span>
            <span>{TEXT.dateSeparator}</span>
            <span>
              {plan.travelEndDate
                ? new Date(plan.travelEndDate).toLocaleDateString()
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

export default PlanCard;
