'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ACCOUNT_LABEL, ACCOUNT_MARGIN } from '@/constants/mypage.constants';
import { useState } from 'react';

/** 회원정보 수정 페이지의 개인 정보 섹션 컴포넌트 */
const PersonalInfo = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  /** 휴대폰 수정 버튼 클릭 핸들러 */
  const handleEditButtonClick = () => {
    setIsEditMode(true);
  };

  /** 휴대폰 수정 완료 버튼 클릭 핸들러  */
  const handleEditCompleteButtonClick = () => {
    const isConfirmed = confirm('휴대폰 번호를 수정하시겠습니까?');
    if (!isConfirmed) return;
    // 휴대폰 번호 수정 로직
    setIsEditMode(false);
  };

  return (
    <>
      <section className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">개인 정보</h3>
        <div className={`${ACCOUNT_MARGIN.left} flex flex-col`}>
          <div className="flex w-full items-center">
            <span className={`${ACCOUNT_LABEL.width} `}>이메일</span>
            <span className="flex-grow">test@test.com</span>
          </div>
          <div className="flex w-full items-center">
            <Label
              htmlFor="phone"
              className={`${ACCOUNT_LABEL.width} flex-shrink-0`}
            >
              휴대폰
            </Label>
            {isEditMode ? (
              <Input id="phone" placeholder="010 1111 2222" />
            ) : (
              <span className="flex-grow">010-1111-2222</span>
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
      </section>
    </>
  );
};

export default PersonalInfo;
