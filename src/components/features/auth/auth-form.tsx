'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { AuthFormProps } from '@/types/auth.type';
import PasswordInput from './auth-password-input';

/**
 * 인증 관련 페이지의 폼 컴포넌트
 *
 * @param type 로그인 또는 회원가입 타입
 * @param onSubmit 폼 제출 핸들러
 * @param isLoading 로딩 상태
 */

const AuthForm = ({ type, onSubmit, isLoading }: AuthFormProps) => {
  // 폼 상태 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [rememberEmail, setRememberEmail] = useState(false);

  const isLogin = type === 'login';
  const buttonText = isLogin ? '로그인' : '회원가입';
  const loadingText = isLogin ? '로그인 중...' : '처리 중...';

  return (
    <CardContent>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {isLogin ? (
          <>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">비밀번호</Label>
              </div>
              <PasswordInput
                id="password"
                placeholder="비밀번호를 입력하세요"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
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
              <div>
                <Link
                  href="/forgot-password"
                  className="text-xs text-blue-600 hover:text-blue-800"
                >
                  비밀번호 찾기
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <PasswordInput
              id="password"
              label="비밀번호"
              placeholder="비밀번호를 입력하세요"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <PasswordInput
              id="confirmPassword"
              label="비밀번호 확인"
              placeholder="비밀번호를 다시 입력하세요"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="space-y-2">
              <Label htmlFor="nickname">닉네임</Label>
              <Input
                id="nickname"
                name="nickname"
                type="text"
                placeholder="사용할 닉네임을 입력하세요"
                required
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">전화번호</Label>
              <Input 
                id="phone" 
                name="phone"
                type="tel" 
                placeholder="01012345678" 
                required 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? loadingText : buttonText}
        </Button>
      </form>
    </CardContent>
  );
};

export default AuthForm;