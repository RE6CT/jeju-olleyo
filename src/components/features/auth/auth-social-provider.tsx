'use client';

import { Button } from '@/components/ui/button';
import { SocialProviderProps } from '@/types/auth.type';
import Image from 'next/image';
import { useState } from 'react';
import { googleLogin, kakaoLogin } from '@/lib/apis/auth-browser.api';

/**
 * 소셜 로그인 버튼 컴포넌트
 *
 * @param provider 소셜 로그인 제공자 (구글, 카카오 등)
 * @param onClick 클릭 이벤트 핸들러 (선택적)
 */
const SocialProvider = ({ provider, onClick }: SocialProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // 소셜 로그인 제공자에 따라 버튼 텍스트, 이미지, 클래스 이름 설정
  const config = {
    google: {
      text: '구글 로그인',
      imageSrc: '/images/google.svg',
      className: 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50',
      action: googleLogin,
    },
    kakao: {
      text: '카카오 로그인',
      imageSrc: '/images/kakaotalk.svg',
      className:
        'border-yellow-500 bg-yellow-400 text-black hover:bg-yellow-500',
      action: kakaoLogin,
    },
  }[provider];

  /**
   * 소셜 로그인 처리 핸들러
   */
  const handleSocialLogin = async () => {
    try {
      setIsLoading(true);

      // 외부에서 제공된 onClick 핸들러가 있으면 실행
      if (onClick) {
        onClick();
        return;
      }
    } catch (error) {
      console.error(`${provider} 로그인 중 오류 발생:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 소셜 로그인 버튼
    <Button
      variant="outline"
      className={`flex w-full items-center justify-center gap-2 ${config.className}`}
      onClick={handleSocialLogin}
      disabled={isLoading}
    >
      {/* 소셜 로그인 아이콘 */}
      <Image
        src={config.imageSrc}
        alt={`${provider} Logo`}
        width={24}
        height={24}
      />
      {/* 소셜 로그인 텍스트 */}
      {isLoading
        ? `${provider === 'google' ? '구글' : '카카오'} 로그인 중...`
        : config.text}
    </Button>
  );
};

export default SocialProvider;
