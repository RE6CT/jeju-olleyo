'use client';

import CharacterModal from '@/components/commons/character-modal';

const ScheduleSaveModal = ({
  isOpen,
  onClose,
  onSave,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => Promise<void>;
}) => {
  return (
    <CharacterModal
      isOpen={isOpen}
      onClose={onClose}
      characterSrc="/character/question_color.svg"
      title="돌아가서 일정을 저장할까요?"
      description="이대로 나가면 만든 일정이 저장이 되지않아요"
      primaryButton={{
        text: '저장하기',
        onClick: () => onSave(),
      }}
      secondaryButton={{
        text: '나가기',
        onClick: onClose,
      }}
    />
  );
};

export default ScheduleSaveModal;
