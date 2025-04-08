'use client';

import PlaceModal from '@/components/features/place-modal';
import PlanCardModal from '@/components/features/plan/plan-card-modal';
import { useState } from 'react';

const TestPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [mode, setMode] = useState<
    'success' | 'isBack' | 'select' | 'isDelete'
  >('success');

  const handleOpenModal = (selectedMode: typeof mode) => {
    setMode(selectedMode);
    setModalOpen(true);
  };
  return (
    <>
      <div>
        플레이스모달테스트
        <div>
          <PlaceModal />
        </div>
      </div>
      <div>
        알람모달테스트
        <div>
          <div className="flex gap-4 pt-20">
            <button onClick={() => handleOpenModal('success')}>저장하기</button>
            <button onClick={() => handleOpenModal('isBack')}>돌아가기</button>
            <button onClick={() => handleOpenModal('select')}>
              날짜선택 모달
            </button>
            <button onClick={() => handleOpenModal('isDelete')}>삭제</button>
          </div>

          <div>
            <PlanCardModal
              open={modalOpen}
              onOpenChange={setModalOpen}
              mode={mode}
              onConfirm={() => setModalOpen(false)}
              onCancel={() => setModalOpen(false)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TestPage;
