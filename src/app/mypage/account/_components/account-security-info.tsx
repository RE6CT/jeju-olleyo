import { Button } from '@/components/ui/button';

const SecurityInfo = () => {
  return (
    <>
      <li className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">보안</h3>
        <div className="ml-[176px] flex flex-col">
          <div className="flex w-full items-center">
            <span className="w-[120px]">현재 비밀번호</span>
            <span className="flex-grow">********</span>
            <Button className="w-fit">수정</Button>
          </div>
        </div>
      </li>
    </>
  );
};

export default SecurityInfo;
