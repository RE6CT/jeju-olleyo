'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  ACCOUNT_LABEL,
  ACCOUNT_MARGIN,
  ACCOUNT_PROFILE_SIZE,
} from '@/constants/mypage.constants';
import { useState } from 'react';

/** 회원정보 수정 페이지의 보안 섹션 컴포넌트 */
const SecurityInfo = () => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const imageSize = ACCOUNT_PROFILE_SIZE;

  /** 비밀번호 수정 버튼 클릭 핸들러 */
  const handleEditButtonClick = () => {
    setIsEditMode(true);
  };

  /** 비밀번호 수정 완료 버튼 클릭 핸들러  */
  const handleEditCompleteButtonClick = () => {
    const isConfirmed = confirm('비밀번호를 수정하시겠습니까?');
    if (!isConfirmed) return;
    // 비밀번호 번호 수정 로직
    setIsEditMode(false);
  };

  return (
    <>
      <li className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">보안</h3>
        <div className={`${ACCOUNT_MARGIN.left} flex flex-col`}>
          <div className="flex w-full items-end">
            {isEditMode ? (
              <ul className="flex w-full flex-col">
                <li className="flex w-full items-center">
                  <Label
                    htmlFor="currentPassword"
                    className={`${ACCOUNT_LABEL.width} flex-shrink-0`}
                  >
                    현재 비밀번호
                  </Label>
                  <Input id="currentPassword" placeholder="********" />
                </li>
                <li className="flex w-full items-center">
                  <Label
                    htmlFor="newPassword"
                    className={`${ACCOUNT_LABEL.width} flex-shrink-0`}
                  >
                    새 비밀번호
                  </Label>
                  <Input
                    id="newPassword"
                    placeholder="숫자, 문자, 특수문자를 포함하여 8자 이상"
                  />
                </li>
                <li className="flex w-full items-center">
                  <Label
                    htmlFor="newPasswordCheck"
                    className={`${ACCOUNT_LABEL.width} flex-shrink-0`}
                  >
                    새 비밀번호 확인
                  </Label>
                  <Input
                    id="newPasswordCheck"
                    placeholder="숫자, 문자, 특수문자를 포함하여 8자 이상"
                  />
                </li>
              </ul>
            ) : (
              <>
                <span className={`${ACCOUNT_LABEL.width} `}>현재 비밀번호</span>
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
