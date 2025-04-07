// 플랜 카드 모달창 props 타입
export type PlanCardModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: 'success' | 'isBack' | 'select' | 'isDelete';
  onConfirm?: () => void;
  onCancel?: () => void;
};

// 플랜 카드 props 타입
export type PlanCardProps = {
  title: string;
  description: string;
  buttons: ReadonlyArray<{
    label: string;
    onClick: () => void;
    variant?: 'default' | 'outline';
  }>;
};
