'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import { PasswordInputProps } from '@/types/auth.type';

/**
 * 비밀번호 입력 필드 컴포넌트
 *
 * @param id 필드 ID
 * @param label 레이블 텍스트
 * @param placeholder 플레이스홀더 텍스트
 * @param required 필수 여부
 * @param value 입력 값
 * @param onChange 변경 이벤트 핸들러
 */

const PasswordInput = ({
  id,
  label,
  placeholder,
  required = false,
  value,
  onChange,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState(value || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className="space-y-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      <div className="relative">
        <Input
          id={id}
          name={id}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          required={required}
          value={value !== undefined ? value : inputValue}
          onChange={onChange || handleChange}
          className="pr-10"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 top-0 h-full px-3"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1} // 탭 순서에서 제외
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </Button>
      </div>
    </div>
  );
};

export default PasswordInput;
