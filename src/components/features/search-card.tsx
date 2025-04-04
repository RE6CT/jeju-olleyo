import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { CamelCaseObject } from '@/types/common.type';
import { Tables } from '@/types/supabase.type';
import Bookmark from './bookmark';

type bookmarks = Tables<'bookmarks'>;
type SearchCardProp = {
  bookmarks: CamelCaseObject<
    Pick<bookmarks, 'user_id' | 'place' | 'place_lat' | 'place_lng'>
  >;
  className: string;
  initialBookmarks: boolean;
  image: string;
  title: string;
};

/**
 * @param bookmarks user_id place place_lat place_lng 가 담긴 단일 데이터 객체
 * @param className 스타일값
 * @param initialBookmarks 북마크가 되어있는지에 대한 boolean
 * @param title 카드의 제목
 *
 * @example
 * ```
 * <SearchCard bookmarks = {bookmarks} className = {className}
 * initialBookmarks = {initialBookmarks} image = {image} title ={title}/>
 * ```
 */
const SearchCard = ({
  bookmarks,
  className,
  initialBookmarks,
  image,
  title,
}: SearchCardProp) => {
  return (
    <Card className={className}>
      <Image src={image} alt={title} width={256} height={256} />
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <Bookmark
          userId={bookmarks.userId}
          place={bookmarks.place ? bookmarks.place : 0}
          initialBookmarks={initialBookmarks}
          place_lat={bookmarks.placeLat}
          place_lng={bookmarks.placeLng}
        />
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default SearchCard;
