// TODO : 메인 레이아웃 적용되면 감싸고 있는 디브 태그 없애야 될 것임.

import Image from 'next/image';

const EmptyResult = () => {
  return (
    <>
      <div className="flex items-center justify-center px-4">
        <div
          className="w-full max-w-[625px]"
          role="img"
          aria-label="검색 결과가 없습니다"
        >
          <div className="flex w-full min-w-[300px] max-w-[625px] flex-col items-center">
            <div className="w-full">
              <Image
                src="/empty-result/empty_result.png"
                alt="검색 결과 없음"
                width={0}
                height={0}
                sizes="100vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyResult;
