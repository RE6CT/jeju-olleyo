import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Tables } from '@/types/supabase.type';
import Link from 'next/link';
import LikeButton from './like-button';
import { CamelCaseObject } from '@/types/common.type';

type Plan = Tables<'plans'>;
type PlanCardProp = {
  plan: CamelCaseObject<
    Pick<Plan, 'plan_img' | 'title' | 'description' | 'plan_id'>
  >;
  className?: string;
  userId: string;
  initialLikes: number;
};
/**
 * @param plan plan_img title description plan_id 의 정보가 담긴 단일 데이터 객체
 * @param className 스타일값
 * @param userId 유저의 uuid
 * @param initialLikes 좋아요 수
 *
 * @example
 * ```
 * <PlanCard plan={plan} className={className} userId={userId} initialLikes={initialLikes}/>
 * ```
 */
const PlanCard = ({ plan, className, userId, initialLikes }: PlanCardProp) => {
  return (
    <Card className={className}>
      <Link href={`/plan-detail/${plan.planId}`}>
        {plan.planImg && (
          <Image
            src={plan.planImg}
            alt={plan.title ?? 'Plan Image'}
            width={256}
            height={256}
          />
        )}
      </Link>
      <CardHeader>
        <CardTitle>{plan.title}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <LikeButton
        userId={userId}
        planId={plan.planId}
        initialLikes={initialLikes}
      />
    </Card>
  );
};

export default PlanCard;
