'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MyPlanCardProps } from '@/types/plan.type';
import { Button } from '@/components/ui/button';
import { MoreVertical, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatDate } from '@/lib/utils/date';

const CARD = {
  imageheight: 'h-[200px]',
  imageWidth: 'w-[200px]',
} as const;

const TEXT = {
  noImage: '이미지 없음',
  noDescription: '설명이 없습니다.',
  nameDateSeparator: '|',
  dateSeparator: '~',
  edit: '수정',
  delete: '삭제',
} as const;

/**
 * 일정 카드 컴포넌트
 *
 * @param plan - 일정 데이터
 * @param nickname - 사용자 닉네임
 * @param onEdit - 수정 버튼 클릭 시 실행될 함수
 * @param onDelete - 삭제 버튼 클릭 시 실행될 함수
 *
 * @example
 * ```tsx
 * <MyPlanCard
 *   plan={planData}
 *   nickname={userData.nickname}
 *   onEdit={(id) => handleEdit(id)}
 *   onDelete={(id) => handleDelete(id)}
 * />
 * ```
 */
const MyPlanCard = ({ plan, nickname, onEdit, onDelete }: MyPlanCardProps) => {
  return (
    <Card className={`flex p-2`}>
      {/* 이미지 영역 */}
      <div className={`relative ${CARD.imageheight} ${CARD.imageWidth}`}>
        {plan.planImg ? (
          <Image
            src={plan.planImg}
            alt={plan.title ?? '여행 계획 이미지'}
            fill // 부모 요소의 높이와 너비를 차지하도록 설정
            className="object-cover"
          />
        ) : (
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
                {/* 자체 button 태그를 쓰는 대신 자식 button 컴포넌트 사용 */}
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
          <div className="flex items-center gap-1 text-sm">
            <span>{nickname}</span>
            <span>{TEXT.nameDateSeparator}</span>
            <span>{formatDate(plan.travelStartDate)}</span>
            <span>{TEXT.dateSeparator}</span>
            <span>{formatDate(plan.travelEndDate)}</span>
          </div>
          {/* 두줄로 제한, 넘치면 말줄임표 */}
          <CardTitle className="line-clamp-2 text-xl">{plan.title}</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col justify-between px-4 py-2">
          <p className="line-clamp-4 text-sm text-muted-foreground">
            {plan.description || TEXT.noDescription}
          </p>
        </CardContent>
      </div>
    </Card>
  );
};

export default MyPlanCard;
