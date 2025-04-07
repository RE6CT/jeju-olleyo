# 플랜 관련 알람 모달창 컴포넌트 사용 가이드

```tsx
'use client';

import PlanCardModal from '@/components/features/plan/plan-card-modal';
import { useState } from 'react';

const PageExample = () => {
  const [modalOpen, setModalOpen] = useState(false);
  // 한 페이지에서 다양한 모드를 버튼 따라 전환시 모드도 아래와 같은 상태 관리 필요합니다.
  // const [mode, setMode] = useState<'success' | 'isBack' | 'select' | 'isDelete'>('success');

  // const handleOpenModal = (selectedMode: typeof mode) => {
  //   setMode(selectedMode);
  //   setModalOpen(true);
  // };

  const handleOpenModal = () => setModalOpen(true);

  return (
    <>
      <div className="flex gap-4 pt-20">
        {/* 한 페이지에서 다양한 모드를 버튼 따라 전환시 온클릭 함수 기재 필요 */}
        {/*
        <button onClick={() => handleOpenModal('success')}>저장하기</button>
        <button onClick={() => handleOpenModal('isBack')}>돌아가기</button>
        <button onClick={() => handleOpenModal('select')}>날짜선택 모달</button>
        */}
        <button onClick={handleOpenModal}>삭제</button>
      </div>
      <div>
        <PlanCardModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          {/* 한페이지에서 하나만 사용시 mode 명시 / 여러 모드 사용시 mode={mode} 로 기재 */}
          mode="isDelete"
          onConfirm={() => setModalOpen(false)}
          onCancel={() => setModalOpen(false)}
        />
      </div>
    </>
  );
};

export default PageExample;
```
