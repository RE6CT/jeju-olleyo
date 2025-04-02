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

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 여기에 회원가입 로직이 들어갈 예정
  };

  return (
    // 최상위 컨테이너
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      {/* 카드 컴포넌트 영역 */}
      <Card className="w-full max-w-md">
        {/* 카드 헤더 영역 */}
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">
            회원가입
          </CardTitle>
          <CardDescription className="text-center">
            아래 정보를 입력하여 계정을 생성하세요
          </CardDescription>
        </CardHeader>
        {/* 카드 콘텐츠 영역 */}
        <CardContent>
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

            {/* 비밀번호 입력 필드 */}
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
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

            {/* 비밀번호 확인 입력 필드 */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">비밀번호 확인</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="비밀번호를 다시 입력하세요"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </Button>
              </div>
            </div>

            {/* 닉네임 입력 필드 */}
            <div className="space-y-2">
              <Label htmlFor="nickname">닉네임</Label>
              <Input
                id="nickname"
                type="text"
                placeholder="사용할 닉네임을 입력하세요"
                required
              />
            </div>

            {/* 전화번호 입력 필드 */}
            <div className="space-y-2">
              <Label htmlFor="phone">전화번호</Label>
              <Input id="phone" type="tel" placeholder="01012345678" required />
            </div>

            {/* 회원가입 버튼 */}
            <Button type="submit" className="w-full">
              회원가입
            </Button>
          </form>
        </CardContent>

        {/* 카드 푸터 영역 */}
        <CardFooter className="flex justify-center">
          <div className="text-sm text-gray-600">
            이미 계정이 있으신가요?{' '}
            <Link href="/sign-in" className="text-blue-600 hover:text-blue-800">
              로그인
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpPage;
