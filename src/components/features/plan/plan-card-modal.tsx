import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import PlanCard from './plan-card';
import { PlanCardModalProps } from '@/types/plan-card-modal.type';

/**
 *
 * @param open - 모달
 * @param onOpenChange - 열림 상태 바꾸는 함수
 * @param mode - 모달 타입 ("success" | "isBack" | "select" | "isDelete")
 * @param onConfirm - 확인 버튼 시 실행될 함수
 * @param onCancel - 취소 버튼 시 실행될 함수
 */

/**
 * 모달의 타입입니다.
 * - "success": 일정 생성 완료
 * - "isBack": 되돌아가기 경고
 * - "select": 날짜 선택 안내
 * - "isDelete": 전체 삭제 확인
 */

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
