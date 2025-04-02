'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import Image from 'next/image';
import AuthHeader from '@/components/features/auth/auth-header';
import AuthLayout from '@/components/features/auth/auth-layout';
import AuthFooter from '@/components/features/auth/auth-footer';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 여기에 로그인 로직이 들어갈 예정
    // 아이디 저장 기능 구현
  };

  return (
    // 최상위 컨테이너
    <AuthLayout>
      {/* 카드 헤더 영역 */}
      <AuthHeader
        title="로그인"
        description="계정 정보를 입력하여 로그인하세요"
      />
      {/* 카드 콘텐츠 영역 */}
      <CardContent className="space-y-4">
        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 이메일 입력 필드 */}
          <div className="space-y-2">
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            {/* 비밀번호 입력 필드 */}
            <div className="flex items-center justify-between">
              <Label htmlFor="password">비밀번호</Label>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호를 입력하세요"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            {/* 아이디 저장 체크박스 */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberEmail}
                onCheckedChange={(checked) =>
                  setRememberEmail(checked as boolean)
                }
              />
              <Label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                아이디 저장
              </Label>
            </div>
            {/* 비밀번호 찾기 링크 */}
            <div>
              <Link
                href="/forgot-password"
                className="text-xs text-blue-600 hover:text-blue-800"
              >
                비밀번호 찾기
              </Link>
            </div>
          </div>

          {/* 로그인 버튼 */}
          <Button type="submit" className="w-full">
            로그인
          </Button>
        </form>

        {/* 소셜 로그인 섹션 */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">소셜 로그인</span>
          </div>
        </div>
        {/* 소셜 로그인 버튼 */}
        <div className="flex flex-col space-y-2">
          {/* 카카오 로그인 버튼 */}
          <Button
            variant="outline"
            className="flex w-full items-center justify-center gap-2 border-yellow-500 bg-yellow-400 text-black hover:bg-yellow-500"
            onClick={() => console.log('카카오 로그인')}
          >
            <Image
              src="/images/kakaotalk.svg"
              alt="Kakao Logo"
              width={24}
              height={24}
            />
            카카오 로그인
          </Button>

          {/* 구글 로그인 버튼 */}
          <Button
            variant="outline"
            className="flex w-full items-center justify-center gap-2 border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
            onClick={() => console.log('구글 로그인')}
          >
            <Image
              src="/images/google.svg"
              alt="Google Logo"
              width={24}
              height={24}
            />
            구글 로그인
          </Button>
        </div>
      </CardContent>
      {/* 카드 푸터 영역 */}
      <AuthFooter
        question="계정이 없으신가요?"
        linkText="회원가입"
        linkHref="/sign-up"
      />
    </AuthLayout>
  );
};

export default LoginPage;
