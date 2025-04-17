'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { PasswordInputProps } from '@/types/auth.type';

/**
 * 비밀번호 입력 필드 컴포넌트
 * @param id 필드 ID
 * @param placeholder 플레이스홀더 텍스트
 * @param required 필수 여부
 * @param register react-hook-form의 register 반환값
 */
const PasswordInput = ({
  id,
  placeholder,
  required = false,
  register,
  className,
  autoComplete,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className="relative">
      <Input
        id={id}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        className={`pr-10 ${className}`}
        required={required}
        autoComplete={autoComplete}
        {...register}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-0 top-0 h-full px-3"
        onClick={togglePasswordVisibility}
        tabIndex={-1}
        aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 표시'}
      >
        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
      </Button>
    </div>
  );
};

export default PasswordInput;
