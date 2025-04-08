'use client';

import { Separator } from '@/components/ui/separator';
import { CardContent } from '@/components/ui/card';
import useAuth from '@/lib/hooks/use-auth';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useState } from 'react';

/**
 * 소셜 로그인 섹션 컴포넌트
 */
const SocialLogin = () => {
  const { handleGoogleLogin, handleKakaoLogin } = useAuth();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isKakaoLoading, setIsKakaoLoading] = useState(false);

  const handleGoogle = async () => {
    try {
      setIsGoogleLoading(true);
      await handleGoogleLogin();
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleKakao = async () => {
    try {
      setIsKakaoLoading(true);
      await handleKakaoLogin();
    } finally {
      setIsKakaoLoading(false);
    }
  };

  return (
    <CardContent className="pt-0">
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">소셜 로그인</span>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          {/* 카카오 로그인 버튼 */}
          <Button
            variant="outline"
            className="flex w-full items-center justify-center gap-2 border-yellow-500 bg-yellow-400 text-black hover:bg-yellow-500"
            onClick={handleKakao}
            disabled={isKakaoLoading}
          >
            <Image
              src="/images/kakaotalk.svg"
              alt="카카오 로고"
              width={24}
              height={24}
            />
            {isKakaoLoading ? '카카오 로그인 중...' : '카카오 로그인'}
          </Button>

          {/* 구글 로그인 버튼 */}
          <Button
            variant="outline"
            className="flex w-full items-center justify-center gap-2 border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
            onClick={handleGoogle}
            disabled={isGoogleLoading}
          >
            <Image
              src="/images/google.svg"
              alt="구글 로고"
              width={24}
              height={24}
            />
            {isGoogleLoading ? '구글 로그인 중...' : '구글 로그인'}
          </Button>
        </div>
      </div>
    </CardContent>
  );
};

export default SocialLogin;
