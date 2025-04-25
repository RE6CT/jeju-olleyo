'use client';

import CharacterModal from '@/components/commons/character-modal';
import { useToast } from '@/lib/hooks/use-toast';

const ScheduleCreatedModal = ({
  isOpen,
  onClose,
  onPublicClick,
  onPrivateClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  onPublicClick: () => Promise<{ error?: string }>;
  onPrivateClick: () => Promise<{ error?: string }>;
}) => {
  const { toast } = useToast();

  const handlePublicClick = async () => {
    const result = await onPublicClick();
    if (result?.error) {
      toast({
        title: '일정 저장 실패',
        description: result.error,
        variant: 'destructive',
      });
    }
  };

  const handlePrivateClick = async () => {
    const result = await onPrivateClick();
    if (result?.error) {
      toast({
        title: '일정 저장 실패',
        description: result.error,
        variant: 'destructive',
      });
    }
  };

  return (
    <CharacterModal
      isOpen={isOpen}
      onClose={onClose}
      characterSrc="/character/happy_color.svg"
      title="일정 생성이 완료 되었어요!"
      description="멋진 일정을 공개할까요?"
      primaryButton={{
        text: '공개하기',
        onClick: handlePublicClick,
      }}
      secondaryButton={{
        text: '나만 보기',
        onClick: handlePrivateClick,
      }}
    />
  );
};

export default ScheduleCreatedModal;
