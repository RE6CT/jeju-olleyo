import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from '../icons/arrow-icon';

/**
 * 결과가 없을 때 나타내는 컴포넌트
 * @param buttonText - 버튼에 들어갈 텍스트
 * @param href - 이동할 링크
 * @param imagePath - 이미지 경로
 */
const EmptyResult = ({
  buttonText,
  href,
  imagePath,
}: {
  buttonText: string;
  href: string;
  imagePath: string;
}) => {
  return (
    <div className="flex w-full flex-col items-center md:h-[387px] md:w-[624.49px]">
      <div className="relative aspect-[16/9] w-full">
        <Image
          src={imagePath}
          alt="결과 없음"
          fill
          sizes="(max-width: 768px) 100vw, 624px"
          priority
          className="object-contain"
        />
      </div>
      <EmptyResultLink href={href} text={buttonText} />
    </div>
  );
};

/**
 * 버튼(링크) 컴포넌트
 * @param text - 버튼에 들어갈 텍스트
 * @param href - 이동할 주소
 * @returns
 */
export const EmptyResultLink = ({
  text,
  href,
}: {
  text: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className="semibold-16 flex w-fit items-center gap-1 rounded-full bg-secondary-300 px-4 py-2 text-white"
    >
      {text}
      <ArrowRight fill="white" size={12} />
    </Link>
  );
};

export default EmptyResult;
