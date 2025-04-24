'use client';

import Image from 'next/image';

import { CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import useSocialLogin from '@/lib/hooks/use-social-login';

/**
 * 소셜 로그인 섹션 컴포넌트
 */
const SocialLogin = () => {
  const { handleGoogle, handleKakao } = useSocialLogin();

  return (
    <CardContent className="pt-0">
      <div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-gray-500">SNS 간편 로그인</span>
          </div>
        </div>

        <nav
          className="mt-[22px] flex flex-row items-center justify-center space-x-4"
          aria-label="소셜 로그인"
        >
          {/* 구글 로그인 버튼 */}
          <button
            onClick={handleGoogle}
            aria-label="구글 계정으로 로그인"
            className="rounded-full"
          >
            <Image
              src="/images/google-logo.svg"
              alt="구글 로고"
              width={48}
              height={48}
            />
          </button>
          {/* 카카오 로그인 버튼 */}
          <button
            onClick={handleKakao}
            aria-label="카카오 계정으로 로그인"
            className="rounded-full"
          >
            <Image
              src="/images/kakao-logo.svg"
              alt="카카오 로고"
              width={48}
              height={48}
            />
          </button>
        </nav>
      </div>
    </CardContent>
  );
};

export default SocialLogin;
