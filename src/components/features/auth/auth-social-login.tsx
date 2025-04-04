'use client';

import { Separator } from '@/components/ui/separator';
import SocialProvider from './auth-social-provider';
import { CardContent } from '@/components/ui/card';

/**
 * 소셜 로그인 섹션 컴포넌트
 */
const SocialLogin = () => {
  return (
    <CardContent className="pt-0">
      {/* 소셜 로그인 섹션 */}
      <div className="space-y-4">
        <div className="relative">
          {/* 소셜 로그인 구분선 */}
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          {/* 소셜 로그인 텍스트 */}
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">소셜 로그인</span>
          </div>
        </div>
        {/* 소셜 로그인 버튼 */}
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
    </CardContent>
  );
};

export default SocialLogin;
