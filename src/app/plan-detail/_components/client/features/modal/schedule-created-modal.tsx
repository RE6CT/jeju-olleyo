'use client';

import CharacterModal from '@/components/commons/character-modal';

const ScheduleCreatedModal = ({
  isOpen,
  onClose,
  onPublicClick,
  onPrivateClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  onPublicClick: () => void;
  onPrivateClick: () => void;
}) => {
  return (
    <CharacterModal
      isOpen={isOpen}
      onClose={onClose}
      characterSrc="/character/happy_color.svg"
      title="일정 생성이 완료 되었어요!"
      description="멋진 일정을 공개할까요?"
      primaryButton={{
        text: '공개하기',
        onClick: onPublicClick,
      }}
      secondaryButton={{
        text: '나만 보기',
        onClick: onPrivateClick,
      }}
    />
  );
};

export default ScheduleCreatedModal;
