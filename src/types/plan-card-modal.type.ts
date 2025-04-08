// 플랜 카드 모달창 props 타입
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
