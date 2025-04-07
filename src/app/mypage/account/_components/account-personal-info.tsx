import { Button } from '@/components/ui/button';

const PersonalInfo = () => {
  return (
    <>
      <li className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">개인 정보</h3>
        <div className="ml-[176px] flex flex-col">
          <div className="flex w-full items-center">
            <span className="w-[120px]">이메일</span>
            <span className="flex-grow">test@test.com</span>
          </div>
          <div className="flex w-full items-center">
            <span className="w-[120px]">휴대폰</span>
            <span className="flex-grow">010-1111-2222</span>
            <Button className="w-fit">수정</Button>
          </div>
        </div>
      </li>
    </>
  );
};

export default PersonalInfo;
