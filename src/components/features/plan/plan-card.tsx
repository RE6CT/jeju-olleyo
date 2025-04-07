import React from 'react';
import { Button } from '@/components/ui/button';

// TODO: 버튼에 요소로 넣어줄 것
// key={idx}
// variant={btn.variant (outline) || 'default'}
// onClick={btn.onClick}

const PlanCard = () => {
  return (
    <div className="w-[280px] rounded-md border bg-white p-4">
      <div className="flex h-60 w-60 items-center justify-center rounded-md bg-gray-200">
        <span className="text-sm text-gray-600">이미지 영역</span>
      </div>
      <h2 className="mt-2 text-sm font-semibold">
        장소를 추가 할 날을 선택하세요
      </h2>
      <p className="text-sm text-muted-foreground">
        전체보기 일 경우 장소가 추가되지 않아요
      </p>
      <div className="mt-4 flex justify-end gap-2">
        {/* {buttons.map((btn, idx) => ( */}
        <Button className="w-full">확인</Button>
        {/* ))} */}
      </div>
    </div>
  );
};

export default PlanCard;
