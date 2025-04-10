'use client';

import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { TextareaHTMLAttributes, forwardRef } from 'react';

/**
 * 글자 수 카운트 기능이 있는 Textarea 컴포넌트입니다.
 * 우측 하단에 현재 글자 수와 최대 글자 수를 표시하며,
 * 최대 글자 수 도달 시 카운터가 빨간색으로 변경됩니다.
 *
 * @component
 * @example
 * ```tsx
 * <TextareaWithCount
 *   value={text}
 *   onChange={(e) => setText(e.target.value)}
 *   maxLength={100}
 *   placeholder="내용을 입력하세요"
 * />
 * ```
 */
// forwardRef를 사용하여 부모 컴포넌트에서 ref를 전달할 수 있도록 함
// forwardRef<RefType, PropsType> 형식에서
// RefType은 ref가 가리킬 요소의 타입을 지정하고, (ref가 연결될 대상이 textarea)
// PropsType은 컴포넌트가 받을 추가 props 타입을 지정함 (여기서는 실제 text값과 maxLength 값을 받음)
const TextareaWithCount = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    value: string;
    maxLength: number;
  }
>(({ value, maxLength, className, ...props }, ref) => {
  const currentLength = value.length;
  const isExceeded = currentLength >= maxLength;

  return (
    <div className="relative">
      <Textarea
        ref={ref}
        value={value}
        maxLength={maxLength}
        className={cn('pr-16', className)} // 글자 수 표시 공간 확보, 외부에서 padding right 방향 속성 주면 이상해짐
        {...props}
      />

      {/* #A7BDC8 색상이 --Gray-300이 될 예정 */}
      {/* #FF0A0A 색상이 --red가 될 예정 */}
      {/* #182126 색상이 --Gray-900이 될 예정 */}
      <div
        className={cn(
          'absolute bottom-2 right-4 text-xs',
          currentLength === 0
            ? 'text-[#A7BDC8]'
            : isExceeded
              ? 'text-[#FF0A0A]'
              : 'text-[#182126]',
        )}
      >
        {currentLength}/{maxLength}
      </div>
    </div>
  );
});

TextareaWithCount.displayName = 'TextareaWithCount'; // forwardRef 사용시 기본적으로 이름이 추론되지 않아 명시

export default TextareaWithCount;
