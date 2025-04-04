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
  tag: string; // 추후에 컴포넌트로 분리할 가능성 있음 카페 명소 등등...
};
/**
 * @param image 이미지값 
 * @param title 장소 이름
 * @param description 장소 설명
 * @param className 스타일 값
 * @param location 실제 주소 값
 * @param tag 카페 명소 등등...의 label
 * 
 * @example
 * ```
 *  <CategoryCard
        image={image}
        title={title}
        description={description}
        className={className}
        location={location}
        tag={tag}
      />
 * ```
 */
const CategoryCard = ({
  image,
  title,
  description,
  className,
  location,
  tag,
}: CategoryCardProp) => {
  //현재 카테고리 카드는 이벤트 없음
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
          <p>{tag}</p>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{location}</CardDescription>
        </CardHeader>
        <CardContent>{description}</CardContent>
      </div>
    </Card>
  );
};

export default CategoryCard;
