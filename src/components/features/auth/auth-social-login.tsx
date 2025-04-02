'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { SocialProviderProps } from '@/types/auth.type';
import Image from 'next/image';


/**
 * 소셜 로그인 버튼 컴포넌트
 */
const SocialProvider = ({ provider, onClick }: SocialProviderProps) => {
  const config = {
    google: {
      text: '구글 로그인',
      imageSrc: '/images/google.svg',
      className: 'border-gray-300 bg-white text-gray-800 hover:bg-gray-50',
    },
    kakao: {
      text: '카카오 로그인',
      imageSrc: '/images/kakaotalk.svg',
      className:
        'border-yellow-500 bg-yellow-400 text-black hover:bg-yellow-500',
    },
  }[provider];

  return (
    <Button
      variant="outline"
      className={`flex w-full items-center justify-center gap-2 ${config.className}`}
      onClick={onClick}
    >
      <Image
        src={config.imageSrc}
        alt={`${provider} Logo`}
        width={24}
        height={24}
      />
      {config.text}
    </Button>
  );
};

/**
 * 소셜 로그인 섹션 컴포넌트
 */
const SocialLogin = () => {
  return (
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
        <SocialProvider
          provider="kakao"
          onClick={() => console.log('카카오 로그인')}
        />
        <SocialProvider
          provider="google"
          onClick={() => console.log('구글 로그인')}
        />
      </div>
    </div>
  );
};

export default SocialLogin;
