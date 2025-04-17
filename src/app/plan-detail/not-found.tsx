import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-80px)] flex-col items-center justify-center gap-6">
      <Image
        src="/character/sad.svg"
        alt="sad character"
        width={120}
        height={120}
      />
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-24 font-bold">존재하지 않는 일정이에요</h2>
        <p className="text-16 text-gray-500">
          비공개 일정이거나 삭제된 일정일 수 있어요
        </p>
      </div>
      <Link href="/">
        <Button className="flex items-center gap-2 rounded-[20px] border border-primary-500 bg-white px-3 py-2 hover:bg-primary-100">
          <span className="text-center text-16 font-medium leading-[150%] text-primary-500">
            홈으로 돌아가기
          </span>
        </Button>
      </Link>
    </div>
  );
}
