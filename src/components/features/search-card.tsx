import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type CategoryCardType = {
  image: string;
  title: string;
  className: string;
  link: string;
};

const SearchCard = ({ image, title, className, link }: CategoryCardType) => {
  return (
    <Card className={className}>
      <Image src={image} alt={title} width={256} height={256} />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {/* 북마크 버튼 들어갈 자리 */}
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default SearchCard;
