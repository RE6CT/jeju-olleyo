'use client';

import Image from 'next/image';
import { useEffect } from 'react';

import { Dialog, DialogContent } from '@/components/ui/no-close-button-dialog';
import { ResetPasswordSuccessModalProps } from '@/types/auth.type';

const ResetPasswordSuccessModal = ({
  open,
  countdown,
  redirectToHome,
}: ResetPasswordSuccessModalProps) => {
  useEffect(() => {
    if (!open) return;

    if (countdown === 0) {
      redirectToHome();
    }
  }, [countdown, open, redirectToHome]);

  return (
    <>
      {/* CSS 선택자를 통해 이 모달의 닫기 버튼만 숨김 */}
      <style jsx global>{`
        .reset-password-success-modal [aria-label='Close'] {
          display: none !important;
        }
      `}</style>

      <Dialog open={open} onOpenChange={() => {}}>
        <DialogContent className="reset-password-success-modal flex flex-col items-center justify-center p-6 sm:max-w-xs">
          <Image
            src="/character/happy_color.svg"
            alt="성공 캐릭터"
            width={100}
            height={100}
            className="mb-4"
            priority
          />

          <p className="semibold-20 text-center text-secondary-300">
            비밀번호가 성공적으로
            <br />
            재설정되었습니다.
          </p>

          <p className="medium-16 mt-3 text-center text-black">
            {countdown}초 후<br />
            메인 페이지로 이동됩니다.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResetPasswordSuccessModal;
