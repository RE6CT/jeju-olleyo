import { PlanWithDays } from '@/types/plan.type';
import { User } from '@/types/user.type';
/**
 * 일정 접근 권한 체크 함수
 * @param plan - 일정 데이터
 * @param user - 사용자 데이터
 * @returns 접근 권한 여부
 */
export const checkPlanAccess = (plan: PlanWithDays, user: User | null) => {
  if (!plan.public && plan.userId !== user?.id) {
    return false;
  }
  return true;
};
