import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

type PlanCardProp = {
  image: string;
  title: string;
  description: string;
  className: string;
};
const PlanCard = ({ image, title, description, className }: PlanCardProp) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image src={image} alt={title} width={256} height={256} />
      </CardContent>
      {/* 좋아요 버튼 들어갈 자리 */}
    </Card>
  );
};

export default PlanCard;
