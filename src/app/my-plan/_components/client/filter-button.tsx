'use client';

import { Button } from '@/components/ui/button';
import { FilterType } from '@/types/plan.type';

/**
 * 필터 메뉴에서 사용되는 버튼 컴포넌트
 * @param type - 필터 타입 (제목, 날짜, 공개상태)
 * @param selectedFilter - 현재 선택된 필터
 * @param onClick - 클릭 이벤트 핸들러
 * @param label - 버튼에 표시될 텍스트
 */
const FilterButton = ({
  type,
  selectedFilter,
  onClick,
  label,
}: {
  type: FilterType;
  selectedFilter: FilterType;
  onClick: () => void;
  label: string;
}) => {
  return (
    <Button
      variant={selectedFilter === type ? 'default' : 'ghost'}
      className={`medium-16 items-center justify-start bg-transparent py-2 hover:bg-transparent hover:text-primary-500 ${
        selectedFilter === type ? 'text-primary-500' : 'text-gray-500'
      }`}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};

export default FilterButton;
