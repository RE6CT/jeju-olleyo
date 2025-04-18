import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PlanCardModalProps } from '@/types/plan-card-modal.type';

import PlanCard from './plan-card-in-modal';

const PlanCardModal = ({
  open,
  onOpenChange,
  mode,
  onConfirm,
  onCancel,
}: PlanCardModalProps) => {
  const contentMap = {
    success: {
      title: '일정 생성이 완료되었어요!',
      description: '내 일정을 공개할까요?',
      buttons: [
        {
          label: '나만 볼래요',
          onClick: onCancel ?? (() => {}),
          variant: 'outline',
        },
        {
          label: '공개할래요',
          onClick: onConfirm ?? (() => {}),
          variant: 'default',
        },
      ] as const,
    },
    isBack: {
      title: '돌아가서 일정을 저장할까요?',
      description: '앗 이대로 나가면 만든 일정이 저장되지 않아요',
      buttons: [
        {
          label: '그냥 나가기',
          onClick: onCancel ?? (() => {}),
          variant: 'outline',
        },
        {
          label: '저장 하기',
          onClick: onConfirm ?? (() => {}),
          variant: 'default',
        },
      ] as const,
    },
    select: {
      title: '장소를 추가 할 날을 선택하세요',
      description: '전체보기 일 경우 장소가 추가되지 않아요',
      buttons: [{ label: '확인', onClick: onConfirm ?? (() => {}) }] as const,
    },
    isDelete: {
      title: '전체 일정을 삭제할까요?',
      description: '삭제된 내용은 복구할 수 없어요',
      buttons: [
        { label: '취소', onClick: onCancel ?? (() => {}), variant: 'outline' },
        { label: '삭제', onClick: onConfirm ?? (() => {}), variant: 'default' },
      ] as const,
    },
  };

  const { title, description, buttons } = contentMap[mode];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[290px]">
        <PlanCard title={title} description={description} buttons={buttons} />
      </DialogContent>
    </Dialog>
  );
};

export default PlanCardModal;
