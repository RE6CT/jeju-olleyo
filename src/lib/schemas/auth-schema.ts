import { z } from 'zod';
import { ERROR_MESSAGES } from '@/constants/auth.constants';

/**
 * 이메일 유효성 검사를 위한 스키마
 */
const emailSchema = z
  .string()
  .min(1, { message: ERROR_MESSAGES.REQUIRED_EMAIL })
  .email({ message: ERROR_MESSAGES.INVALID_EMAIL });

/**
 * 기본 비밀번호 유효성 검사를 위한 스키마
 */
const basePasswordSchema = z
  .string()
  .min(1, { message: ERROR_MESSAGES.REQUIRED_PASSWORD })
  .min(8, { message: ERROR_MESSAGES.MIN_PASSWORD_LENGTH });

/**
 * 강화된 비밀번호 유효성 검사를 위한 스키마 (문자, 숫자, 특수문자 포함)
 */
const strongPasswordSchema = basePasswordSchema
  .regex(/[A-Za-z]/, { message: ERROR_MESSAGES.PASSWORD_LETTER })
  .regex(/[0-9]/, { message: ERROR_MESSAGES.PASSWORD_NUMBER })
  .regex(/[^A-Za-z0-9]/, { message: ERROR_MESSAGES.PASSWORD_SPECIAL_CHAR });

/**
 * 전화번호 유효성 검사를 위한 스키마
 * 다양한 형식을 지원하고 정규화합니다
 */
const phoneSchema = z
  .string()
  .min(1, { message: ERROR_MESSAGES.REQUIRED_PHONE })
  .transform((val) => {
    // 숫자만 추출
    const digits = val.replace(/\D/g, '');

    // 한국 휴대폰 번호 형식 확인 (앞자리가 010으로 시작하는 11자리)
    if (/^010\d{8}$/.test(digits)) {
      // 형식화된 전화번호 반환
      return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
    }

    // 유효하지 않은 경우 원래 값 반환
    return val;
  })
  .refine(
    (val) => {
      const digits = val.replace(/\D/g, '');
      return /^010\d{8}$/.test(digits);
    },
    { message: ERROR_MESSAGES.INVALID_PHONE },
  );

/**
 * 로그인 폼 검증 스키마
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: basePasswordSchema,
  remember: z.boolean().optional().default(false),
});

/**
 * 회원가입 폼 검증 스키마
 */
export const registerSchema = z
  .object({
    email: emailSchema,
    password: strongPasswordSchema,
    confirmPassword: z.string(),
    nickname: z
      .string()
      .min(1, { message: ERROR_MESSAGES.REQUIRED_NICKNAME })
      .min(2, { message: ERROR_MESSAGES.MIN_NICKNAME_LENGTH })
      .max(10, { message: ERROR_MESSAGES.MAX_NICKNAME_LENGTH }),
    phone: phoneSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ERROR_MESSAGES.PASSWORD_MISMATCH,
    path: ['confirmPassword'],
  });

/**
 * 비밀번호 찾기 폼 검증 스키마
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

/**
 * 비밀번호 재설정 폼 검증 스키마
 */
export const resetPasswordSchema = z
  .object({
    password: strongPasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: ERROR_MESSAGES.PASSWORD_MISMATCH,
    path: ['confirmPassword'],
  });

export type LoginSchemaType = z.infer<typeof loginSchema>;
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
