'use client';

import CharacterModal from '@/components/commons/character-modal';

const ScheduleDeleteModal = ({
  isOpen,
  onClose,
  onDeleteClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  onDeleteClick: () => void;
}) => {
  return (
    <CharacterModal
      isOpen={isOpen}
      onClose={onClose}
      characterSrc="/character/sad_color.svg"
      title="하루 일정을 모두 삭제할까요?"
      description="삭제된 내용은 복구할 수 없어요"
      primaryButton={{
        text: '삭제',
        onClick: onDeleteClick,
      }}
      secondaryButton={{
        text: '취소',
        onClick: onClose,
      }}
    />
  );
};

export default ScheduleDeleteModal;
