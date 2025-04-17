'use client';

import { Separator } from '@/components/ui/separator';
import { CardContent } from '@/components/ui/card';
import Image from 'next/image';
import useSocialLogin from '@/lib/hooks/use-social-login';

/**
 * 소셜 로그인 섹션 컴포넌트
 */
const SocialLogin = () => {
  const { handleGoogle, handleKakao } = useSocialLogin();

  return (
    <CardContent className="pt-0">
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-4 text-gray-500">SNS 간편 로그인</span>
          </div>
        </div>

        <div className="flex flex-row items-center justify-center space-x-4">
          {/* 구글 로그인 버튼 */}
          <Image
            src="/images/google-logo.svg"
            alt="구글 로고"
            width={48}
            height={48}
            onClick={handleGoogle}
          />
          {/* 카카오 로그인 버튼 */}
          <Image
            src="/images/kakao-logo.svg"
            alt="카카오 로고"
            width={48}
            height={48}
            onClick={handleKakao}
          />
        </div>
      </div>
    </CardContent>
  );
};

export default SocialLogin;
