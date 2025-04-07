'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

/** 회원정보 수정 페이지의 보안 섹션 컴포넌트 */
const SecurityInfo = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  /** 비밀번호 수정 버튼 클릭 핸들러 */
  const handleEditButtonClick = () => {
    setIsEditMode(true);
  };

  /** 비밀번호 수정 완료 버튼 클릭 핸들러  */
  const handleEditCompleteButtonClick = () => {
    // 비밀번호 번호 수정 로직
    setIsEditMode(false);
  };

  return (
    <>
      <li className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">보안</h3>
        <div className="ml-[176px] flex flex-col">
          <div className="flex w-full items-end">
            {isEditMode ? (
              <ul className="flex w-full flex-col">
                <li className="flex w-full items-center">
                  <span className="w-[150px]">현재 비밀번호</span>
                  <Input placeholder="********" className="flex-grow" />
                </li>
                <li className="flex w-full items-center">
                  <span className="w-[150px]">새 비밀번호</span>
                  <Input
                    placeholder="숫자, 특수문자를 포함하여 8자 이상"
                    className="flex-grow"
                  />
                </li>
                <li className="flex w-full items-center">
                  <span className="w-[150px]">새 비밀번호 확인</span>
                  <Input
                    placeholder="숫자, 특수문자를 포함하여 8자 이상"
                    className="flex-grow"
                  />
                </li>
              </ul>
            ) : (
              <>
                <span className="w-[120px]">현재 비밀번호</span>
                <span className="flex-grow">********</span>
              </>
            )}
            {isEditMode ? (
              <Button onClick={handleEditCompleteButtonClick} className="w-fit">
                완료
              </Button>
            ) : (
              <Button onClick={handleEditButtonClick} className="w-fit">
                수정
              </Button>
            )}
          </div>
        </div>
      </li>
    </>
  );
};

export default SecurityInfo;
