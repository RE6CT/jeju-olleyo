'use client';

import CharacterModal from '@/components/commons/character-modal';

const DaySelectRequiredModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <CharacterModal
      isOpen={isOpen}
      onClose={onClose}
      characterSrc="/character/surprise_color.svg"
      title="장소 추가할 DAY를 선택하세요"
      description="전체보기일 경우 장소가 추가되지 않아요"
      primaryButton={{
        text: '확인',
        onClick: onClose,
      }}
    />
  );
};

export default DaySelectRequiredModal;
