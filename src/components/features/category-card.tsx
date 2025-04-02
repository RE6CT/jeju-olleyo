import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';

type CategoryCardProp = {
  image: string;
  title: string;
  description: string;
  className: string;
  location: string;
  tag: string;
};
const CategoryCard = ({
  image,
  title,
  description,
  className,
  location,
  tag,
}: CategoryCardProp) => {
  return (
    <Card className={`flex items-center ${className}`}>
      <Image
        src={image}
        alt={title}
        width={256}
        height={256}
        className="rounded-lg"
      />
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <p>{tag}</p>
          <CardDescription>{location}</CardDescription>
        </CardHeader>
        <CardContent>{description}</CardContent>
        {/* 좋아요 버튼 들어갈 자리 */}
      </div>
    </Card>
  );
};

export default CategoryCard;
